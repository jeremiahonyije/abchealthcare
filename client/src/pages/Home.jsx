import { Link } from 'react-router-dom';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';

export default function Home() {
  SwiperCore.use([Navigation]);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 mt-52 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-7xl'>
          Manage medical
          <span className='text-slate-500'> images</span> <br /> and reports
          with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-lg'>
          ABC Healthcare empowers radiologists and doctors with secure tools to
          manage and <br />
          organise patients medical images, enhancing diagnostic accuracy and
          patient care.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-base text-blue-800 font-bold hover:underline'
        >
          Get started...
        </Link>
      </div>
    </div>
  );
}
