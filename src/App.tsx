
import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout';
import { AuthContext } from './context/AuthContext';
import Home from './pages/home';
import Login from './pages/login';
import Error from './pages/error';
import ProfileUser from './pages/profile';
import RightsManagement from './pages/systemManagement/rightsManagement';


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
           </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
  );
};

export default App;