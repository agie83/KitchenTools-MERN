import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { AuthContext } from '../AuthContext';
import getItems from '../../utils/queries';
import { CART_URL } from '../../constants/url';

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      getItems(CART_URL, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).then((data) => {
        setCartItems(data.cartItems);
      });
    } else {
      setCartItems([]);
    }
  }, [token]);

  return (
    <CartContext.Provider value={[cartItems, setCartItems]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
