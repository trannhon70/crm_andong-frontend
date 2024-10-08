
import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout';
import { AuthContext } from './context/AuthContext';
import Home from './pages/home';
import Login from './pages/login';
import Error from './pages/error';
import ProfileUser from './pages/profile';
import RightsManagement from './pages/systemManagement/rightsManagement';
import CreateRight from './pages/systemManagement/createRight';
import HospitalList from './pages/hospitalList';
import PeopleManagement from './pages/peopleManagement';
import CreatePeople from './pages/peopleManagement/createPeople';
import AppointmentRegistrationList from './pages/patientAppointmentManagement/appointmentRegistrationList';
import PersonalInformation from './pages/personalInformation';
import ChangePassword from './pages/profile/changePassword';
import CreateAppointmentRegistrationList from './pages/patientAppointmentManagement/appointmentRegistrationList/create';
import DiseaseManagement from './pages/settings/diseaseManagement';
import CreateDiseaseManagement from './pages/settings/diseaseManagement/create';


const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

const App: React.FC = () => {
  
  const { setAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthenticated(true);
    }
}, [setAuthenticated]);

  
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<LayoutComponent />} > 
              <Route path='/' element={<Home/>} />
              <Route path='/profile' element={<ProfileUser/>} />
              <Route path='/quan-ly-quyen' element={<RightsManagement/>} />
              <Route path='/quan-ly-quyen/them-moi' element={<CreateRight/>} />
              <Route path='/quan-ly-quyen/cap-nhat/:id' element={<CreateRight/>} />

              <Route path='/danh-sach-benh-vien' element={<HospitalList/>} />

              <Route path='/quan-ly-con-nguoi' element={<PeopleManagement/>} />
              <Route path='/quan-ly-con-nguoi/them-moi' element={<CreatePeople/>} />
              <Route path='/quan-ly-con-nguoi/cap-nhat/:id' element={<CreatePeople/>} />

              <Route path='/danh-sach-dang-ky-hen' element={<AppointmentRegistrationList/>} />
              <Route path='/danh-sach-dang-ky-hen/them-moi' element={<CreateAppointmentRegistrationList/>} />

              <Route path='/thay-doi-mat-khau' element={<ChangePassword/>} />

              <Route path='/thiet-lap-benh-tat' element={<DiseaseManagement/>} />
              <Route path='/thiet-lap-benh-tat/them-moi' element={<CreateDiseaseManagement/>} />

           </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
  );
};

export default App;