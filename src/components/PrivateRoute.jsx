import { Navigate } from 'react-router-dom';

import LocalStorageH from '../helpers/localstorage_h';

function PrivateRoute({ children }) {
  return LocalStorageH.isAuthenticated()
    ? children
    : <Navigate to="/login" />;
}

export default PrivateRoute;
