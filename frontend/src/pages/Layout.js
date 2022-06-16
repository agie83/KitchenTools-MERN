import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ShopNavbar from '../components/ShopNavbar/ShopNavbar';
import './layout.scss';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext/CartContext';
import getItems from '../utils/queries';
import { CART_URL } from '../constants/url';

const Layout = ({ children, navData }) => {
  const { token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useContext(CartContext);
  const [cartList, setCartList] = useState([]);

  // useEffect(() => {
  //   getItems(CART_URL, {
  //     method: 'GET',
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   }).then((data) => {
  //     setCartList(data.cartItems);
  //     setCartItems(data.cartItems);
  //   });
  // }, []);

  const path = `/${window.location.pathname.split('/')[1]}` || '/';
  const routeList = [];

  navData.map((menu) => {
    routeList.push(menu);
    if (menu.submenu.length > 0) {
      menu.submenu.map((submenu) => {
        routeList.push(submenu);
        return routeList;
      });
    }
    return routeList;
  });

  const page404 = routeList.filter((item) => item.routePath === '*')[0];
  const currentPage = routeList.filter((navItem) => path === navItem.navLink)[0] || page404;

  const mainContent = (currentPage?.contentComponents)
    ? currentPage.contentComponents.mainContent : [];
  const asideContent = (currentPage?.contentComponents)
    ? currentPage.contentComponents.asideContent : [];
  const mainContentColSize = (asideContent.length > 0) ? 'col-12 col-md-10' : 'col-12';
  const asideContentColSize = 'col-md-2 d-none d-md-block';

  return (
    <>
      <Navbar menuList={navData} />
      {
     (path !== '/') ? <ShopNavbar menuList={navData} /> : ''
      }

      {children}

      <div className="page-content d-flex container-fluid">
        { (asideContent.length > 0)
          ? (
            <aside className={`asideContent ${asideContentColSize}`}>
              { asideContent.map((AsideItem) => (
                <AsideItem
                  key={currentPage._id}
                />
              ))}
            </aside>
          )
          : ''}
        { mainContent.length > 0
           && (
           <main className={`${mainContentColSize} px-md-3`}>
             { mainContent.map((MainItem) => (
               <MainItem
                 key={uuid()}
               />
             ))}
           </main>
           )}
      </div>

      <Footer />
    </>
  );
};

export default Layout;
