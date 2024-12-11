import {useEffect, useState, useMemo} from "react";

import {AuditorsTable} from "./table/AuditorsTable";
import {auditorsColumns} from "./table/columns/_columns";
import {LoadingIndicator} from "../loading/LoadingIndicator";
import AuditorService from "../../../../../app/services/AuditorService";

const AuditorsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataAuditors, setDataAuditors] = useState([]);
  const columns = useMemo ( 
    () => auditorsColumns, []
  )
  
  const datas = useMemo(() => dataAuditors, [dataAuditors])

  useEffect(() => {
    setIsLoading(true);
    const getAuditors = async () => {
      try {
        setDataAuditors(await AuditorService.getAllAuditors());
        setIsLoading(false);
        return true;
      } catch (e) {
        console.log(e);
      }
    }

    getAuditors()
  }, [])

  return (
    <div>
      <AuditorsTable columns={columns} data={datas}/>
      {isLoading && <LoadingIndicator />}
    </div>
  )
}

export {AuditorsList}
