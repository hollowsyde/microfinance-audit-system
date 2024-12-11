import {UploadDataPage} from "./UploadDataPage";
import {useEffect, useState} from "react";
import {KTSVG} from "../../_metronic/helpers";
import AuditDetailService from "../services/AuditDetailService";
import {useParams} from "react-router-dom";

const AuditDetailPage = () => {
    const { id } = useParams();
    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        const getApi = async () => {
            console.log(id)
            try {
                setDataCategory(await AuditDetailService.getCategory(id))
            } catch (e) {
                console.log(e)
            }
        }

        getApi()
    }, [])

    return (
        <div className="container">
            <div className="row mb-5">
                <div className="col-4"></div>
                <div className="col-4 text-center">
                    <h1 style={{color: "white"}}>Audit Detail</h1>
                </div>
                <div className="col-4"></div>
            </div>
            <div className="row mb-5">
                {dataCategory.length === 0 ? (
                    <h4 style={{color: "white"}} className='text-center'>Tidak ada data Category</h4>
                ) : (
                    dataCategory.map((data:any) => {
                            return <div key={data.title} className="col-3">
                                <a href='#' className='card card-xxl-stretch bg-primary mt-3 mb-5'>
                                    <div className='card-body d-flex flex-column justify-content-between'>
                                        <KTSVG path={'/media/icons/duotune/general/gen025.svg'} className='svg-icon-white svg-icon-2hx ms-n1 flex-grow-1' />
                                        <div className='d-flex flex-column'>
                                            <div className='text-white fw-bold fs-1 mb-0 mt-5'>{data.title}</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        })
                )}
            </div>
            <br/>
            <UploadDataPage/>
        </div>
    );
};

export {AuditDetailPage};
