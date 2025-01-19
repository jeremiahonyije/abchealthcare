import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateReport from './pages/CreateReport';
import UpdateReport from './pages/UpdateReport';
import Report from './pages/Report';
import Search from './pages/Search';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/report/:reportId' element={<Report />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-report' element={<CreateReport />} />
          <Route path='/update-report/:reportId' element={<UpdateReport />} />
          <Route path='/search' element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
