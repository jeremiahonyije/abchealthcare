import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ report }) {
  const [radiologist, setRadiologist] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const radiologist = async () => {
      try {
        const res = await fetch(`/api/user/${report.userRef}`);
        const data = await res.json();
        setRadiologist(data);
      } catch (error) {
        console.log(error);
      }
    };
    radiologist();
  }, [report.userRef]);
  return (
    <>
      {radiologist && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact{' '}
            <span className='font-semibold'>{radiologist.username}</span> for{' '}
            <span className='font-semibold'>
              {report.patientName.toLowerCase()}
            </span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
            to={`mailto:${radiologist.email}?subject=Regarding ${report.patientName}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
