import { StartAuditTilesWidget, ConfigurationTilesWidget, AuditHistoryTilesWidget } from '../partials';

const Homepage = () => {
    return (
        
        <div className='homepage row justify-content-center mb-12'>
            <h2 className='fw-bold fs-1 text-gray-800 mb-3'>Microfinance Audit System</h2>

            <div className='text-muted fw-semibold fs-4 mb-12'>
                Sistem Informasi Keuangan yang bergerak pada proses pelaporan keuangan perusahaan atau audit.
            </div>
            
            <div className='row row-cols-3 justify-content-center'>
                <div className='col-4'>
                    <StartAuditTilesWidget className='audit-card-xl-stretch' />
                </div>
                <div className='col-4'>
                    <ConfigurationTilesWidget className='config-card-xl-stretch' />
                </div>
                <div className='col-4'>
                    <AuditHistoryTilesWidget className='history-card-xl-stretch' />
                </div>
            </div>

        </div>
    );
};

export {Homepage};
