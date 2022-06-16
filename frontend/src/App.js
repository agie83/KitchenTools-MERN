import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import { v4 as uuid } from 'uuid';
import AuthProvider from './contexts/AuthContext';
import CartProvider from './contexts/CartContext/CartContext';
import LayoutPage from './pages/LayoutPage';
import { menu } from './utils/menus';
import 'bootstrap/dist/js/bootstrap';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  const routeList = [];
  menu.map((menuItem) => {
    routeList.push(menuItem);
    if (menuItem.submenu.length > 0) {
      menuItem.submenu.map((submenu) => {
        routeList.push(submenu);

        return routeList;
      });
    }
    if (menuItem.routePathChildren?.length > 0) {
      menuItem.routePathChildren.map((pathChild) => {
        const childRoute = { ...menuItem };
        routeList.push(childRoute, childRoute.routePath = pathChild, childRoute._id = uuid());

        return routeList;
      });
    }
    return routeList;
  });
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {
           (routeList) && routeList.map((route) => (
             (!route.protected)
               ? (
                 <Route
                   key={uuid()}
                   path={route.routePath}
                   element={<LayoutPage navData={menu} />}
                 />
               )
               : (
                 <Route
                   key={route._id}
                   path={route.routePath}
                   element={(
                     <ProtectedRoute>
                       <LayoutPage navData={menu} />
                     </ProtectedRoute>
                  )}
                 />
               )
           ))
           }
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
