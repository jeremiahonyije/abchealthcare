import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare } from 'react-icons/fa';
import Contact from '../components/Contact';

// https://sabe.io/blog/javascript-format-numbers-commas#:~:text=The%20best%20way%20to%20format,format%20the%20number%20with%20commas.

export default function Report() {
  SwiperCore.use([Navigation]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/report/get/${params.reportId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setReport(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchReport();
  }, [params.reportId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {report && !loading && !error && (
        <div>
          <Swiper navigation>
            {report.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'contain',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-xl font-semibold'>
              <span className=' text-black'>Patient - </span>
              {report.patientName}
            </p>
            <p className='flex items-center gap-2 text-slate-600  text-sm'>
              {' '}
              <span className='font-semibold text-black'>
                Doctor Assigned - {report.doctorAssigned}
              </span>
            </p>
            <div className='flex gap-4'>
              {
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center font-semibold p-1 rounded-md'>
                  {report.type.toUpperCase()}
                </p>
              }
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>
                Diagnostic Imaging Report -{' '}
              </span>
              {report.diagnosticReport}
            </p>
            {currentUser && report.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-3'
              >
                Contact Radiologist
              </button>
            )}
            {contact && <Contact report={report} />}
          </div>
        </div>
      )}
    </main>
  );
}
