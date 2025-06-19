import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/dashboard" />;
};

export default RequireAuth;
