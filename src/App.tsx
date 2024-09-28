
import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/login';
import DashboardLayoutBasic from './components/layout';


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
          <Route path='/' element={<DashboardLayoutBasic />} > 
              <Route path='home' element={<Home/>} />
           </Route>
        </Route>
      </Routes>
  );
};

export default App;