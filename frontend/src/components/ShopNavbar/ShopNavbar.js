import React, { useContext, useEffect, useState } from 'react';
import './ShopNavbar.scss';
import { v4 as uuid } from 'uuid';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext/CartContext';

function ShopNavbar({ menuList }) {
  const [cartItems] = useContext(CartContext) || [];
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    if (cartItems) {
      setTotalQty(cartItems.reduce((prev, curr) => prev + Number(curr.qty), 0));
    }
  }, [cartItems]);

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
                      <li key={uuid()} className="secondary-menu-item cart">
                        <NavLink to={menu.navLink}>
                          <menu.icon />
                          <span className="qty-info">{totalQty}</span>
                        </NavLink>
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
