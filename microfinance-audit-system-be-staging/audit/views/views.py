from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

from pymongo import MongoClient
from io import BytesIO

import zipfile
import openpyxl
import re, configparser

from audit.models import AuditType, AuditSession
from authentication.models import Auditor
from authentication.serializer import AuditorSerializer

config = configparser.ConfigParser()
config.read("config.ini")


@require_GET
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_auditors(request):
    auditors = Auditor.objects.all()
    serializer = AuditorSerializer(auditors, many=True)
    return JsonResponse(serializer.data, safe=False)

@require_POST
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_new_audit_session(request, id): #create a new audit session with spesific audit type
    new_session = AuditSession.objects.create(
        type=AuditType.objects.get(id=int(id))
    )
    
    auditor_ids = [int(auditor_id) for auditor_id in request.POST.get('auditor_ids').split(',')]

    for auditor_id in auditor_ids:
        auditor = Auditor.objects.get(id=auditor_id)
        auditor.on_audit = True
        auditor.session = new_session

        auditor.save()

    return Response(data={'message': "Sesi Audit baru berhasil dibuat", 'new_session_id': new_session.id}, status=status.HTTP_200_OK)

@require_POST
@api_view(['POST'])
def post_audit_data(request):
    zip_file = request.FILES.get('file')
    audit_session_id = request.data.get('audit_session_id')

    files = extract_zip(zip_file)

    if(len(files) == 0) :
        return Response(data={'detail':'Invalid zip file'}, status=status.HTTP_400_BAD_REQUEST)
    
    data_name = 'audit-data-'+str(audit_session_id)
    child_collection = get_collection(data_name)

    list_data = extract_files(files)

    for data in list_data:
        child_collection.insert_one(data)
        
    return Response(data={'message':"File uploaded to database", 'data': data_name}, status=status.HTTP_200_OK)

def extract_zip(zip_file):
    result_data = dict()
    pattern = r'^\w+\.xlsx$'

    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        for filename in zip_ref.namelist():
            if not re.match(pattern, filename) :
                continue
            
            file_data = zip_ref.read(filename)
            result_data[filename] = file_data

    return result_data

def extract_files(files):
    data = []

    for filename, file_data in files.items():
        file_obj = BytesIO(file_data)
        workbook = openpyxl.load_workbook(file_obj)
        worksheet = workbook['Sheet1']

        column_headers = []
        for cell in worksheet[1]:
            column_headers.append(cell.value)

        for row in worksheet.iter_rows(min_row=2, values_only=True):
            row_data = {}
            for column, value in zip(column_headers, row):
                row_data[column] = value
            
            row_data['filename'] = filename
            data.append(row_data)

    return data

def get_collection(data_name):
    client = MongoClient('mongodb+srv://cugil:agill@juubi-microfinance.am8xna1.mongodb.net/?retryWrites=true')
    db = client[config.get('credentials', 'database')]
    collection = db['audit_data']

    data_count = collection.count_documents({'name': data_name})

    if data_count == 0 :
        collection.insert_one({'name': data_name})

    return collection[data_name]