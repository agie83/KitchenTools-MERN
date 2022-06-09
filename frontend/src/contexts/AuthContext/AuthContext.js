import { createContext, useMemo } from 'react';
import useAuthReducer from './authReducer';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { auth, dispatch } = useAuthReducer();
  const value = useMemo(() => ({ ...auth, dispatch }), [auth]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
