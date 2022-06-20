import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function ProtectedRoute({ children, currentMenu }) {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to={`/login?to=${currentMenu}`} />;
}
export default ProtectedRoute;
