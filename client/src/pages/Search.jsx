import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportItem from '../components/ReportItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (searchTermFromUrl || typeFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchReports = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/report/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setReports(data);
      setLoading(false);
    };

    fetchReports();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'xray' ||
      e.target.id === 'ct' ||
      e.target.id === 'mri'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfReports = reports.length;
    const startIndex = numberOfReports;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/report/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setReports([...reports, ...data]);
  };
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>ALL</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='xray'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'xray'}
              />
              <span>X-RAY</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='ct'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'ct'}
              />
              <span>CT</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='mri'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'mri'}
              />
              <span>MRI</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Reports:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && reports.length === 0 && (
            <p className='text-xl text-slate-700'>No report found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            reports &&
            reports.map((report) => (
              <ReportItem key={report._id} report={report} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 pl-0 text-left w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
