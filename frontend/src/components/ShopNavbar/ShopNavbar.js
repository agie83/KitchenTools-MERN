import React from 'react';
import './ShopNavbar.scss';
import { v4 as uuid } from 'uuid';
import { NavLink } from 'react-router-dom';

function ShopNavbar({ menuList }) {
  return (
    <div className="shopNavbar container-fluid">
      <ul className="shop-other-info">
        {
            menuList.map((menu) => {
              const icon = menu.icon.name || '';
              return (
                menu.type === 'secondary' && (

                  (icon.toLowerCase().includes('cart'))
                    ? (
                      <li key={uuid()} className="secondary-menu-item">
                        {' '}
                        <NavLink to={menu.navLink}><menu.icon /></NavLink>
                      </li>
                    )
                    : (
                      <li key={uuid()} className="secondary-menu-item">
                        <NavLink to={menu.navLink}>
                          <span className="item-icon"><menu.icon /></span>
                          <span className="item-title">{menu.title}</span>
                        </NavLink>
                      </li>
                    )
                )
              );
            })
        }
      </ul>
    </div>
  );
}

export default ShopNavbar;
