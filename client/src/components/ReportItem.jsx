/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function ReportItem({ report }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/report/${report._id}`}>
        <img
          src={report.imageUrls[0]}
          alt='report cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-base font-semibold text-slate-700'>
            Patient - {report.patientName}
          </p>
          <div className='flex items-center gap-1'>
            <p className='text-sm text-slate-700 font-semibold truncate w-full'>
              Doctor Assigned - {report.doctorAssigned}
            </p>
          </div>
          <p className='text-sm text-slate-700 line-clamp-2'>
            <span className='font-semibold'>Diagnostic Imaging Report</span> -{' '}
            {report.diagnosticReport}
          </p>
        </div>
      </Link>
    </div>
  );
}
