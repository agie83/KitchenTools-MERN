import React, { useContext, useEffect, useState } from 'react';
import { BsTrash, BsX } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { AuthContext } from '../../../contexts/AuthContext';
import { CartContext } from '../../../contexts/CartContext/CartContext';
import getItems from '../../../utils/queries';
import { CART_URL, CLOUDINARY_CART_THUMBNAIL_URL, ORDERS_URL } from '../../../constants/url';
import './CartList.scss';
import OrderConfirmation from '../OrderConfirmation/OrderConfirmation';
import Alert from '../../formElements/Alert';

function CartList() {
  const [cartItems, setCartItems] = useContext(CartContext);
  const { token, user } = useContext(AuthContext);
  const [ordered, setOrdered] = useState(false);
  const [orderError, setOrderError] = useState({
    status: false,
    message: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ordered) {
        setCartItems([]);
        setOrdered(false);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [ordered]);

  useEffect(() => {
    const timerErr = setTimeout(() => {
      if (orderError) {
        setOrderError({
          status: false,
          message: '',
        });
      }
    }, 3000);
    return () => {
      clearTimeout(timerErr);
    };
  }, [orderError]);

  const totalSum = (cartItems.length === 0) ? 0 : cartItems.reduce((prev, curr) => {
    return prev + (curr?.price * curr?.qty);
  }, 0);

  const updateOrderQty = (orderId, qty) => {
    const body = {
      orderId,
      qty,
    };
    getItems(CART_URL + user.id, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const handleCounterClick = (item, amount) => {
    const newQty = (item.qty + amount >= 0) ? item.qty + amount : 0;
    if (newQty === 0) {
      setCartItems((prev) => {
        const newList = prev.filter((prevItem) => (prevItem._id !== item._id));
        return newList;
      });
    }

    setCartItems((prev) => {
      const newList = prev.map((prevItem) => {
        const newItem = prevItem;
        if (prevItem._id === item._id) newItem.qty = newQty;
        return newItem;
      });
      return newList;
    });
    updateOrderQty(item._id, newQty);
  };

  const handleDeleteOne = (item) => {
    const newQty = 0;

    setCartItems((prev) => {
      const newList = prev.filter((prevItem) => (prevItem._id !== item._id));
      return newList;
    });

    updateOrderQty(item._id, newQty);
  };

  const handleDeleteAll = () => {
    getItems(CART_URL, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        user,
        'Content-Type': 'application/json',
      },
    });
    setCartItems([]);
  };

  const sendOrder = () => {
    getItems(ORDERS_URL, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        user,
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      if ('orders' in data) setOrdered(true);
      if ('message' in data) {
        setOrderError({
          status: true,
          message: 'Hiba történt, kérjük, próbáld újra később!',
        });
      }
    });
  };
  return (
    <div>

      {
  (cartItems.length > 0)
  && (
  <>

    <table className="table order-list">
      <thead>
        <tr>
          <th className="text-start" colSpan="2">Termék</th>
          <th className="text-center">Mennyiség</th>
          <th className="text-center">Egységár (Ft)</th>
          <th className="text-end">Összeg (Ft)</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {
        cartItems.map((item) => (
          <tr key={item._id}>
            <td className="img-td"><img src={`${CLOUDINARY_CART_THUMBNAIL_URL}/${item?.image}`} alt={item?.name} /></td>
            <td className="text-start">{item?.name}</td>
            <td className="text-center">
              <IoMdArrowDropdown onClick={() => handleCounterClick(item, -1)} className="cart-icon qty-setter fs-5 me-2" />
              {item?.qty}
              <IoMdArrowDropup onClick={() => handleCounterClick(item, 1)} className="cart-icon qty-setter fs-5 ms-2" />
            </td>
            <td className="unit-price text-center">{item?.price}</td>
            <td className="text-end">{item?.price * item?.qty}</td>
            <td><BsX onClick={() => handleDeleteOne(item)} className="cart-icon fs-5" /></td>
          </tr>
        ))
      }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5" className="fw-bold text-end fs-5">{totalSum}</td>
          <td>&nbsp;</td>
        </tr>
      </tfoot>
    </table>
    { (ordered) && <OrderConfirmation />}
    { (orderError.status) && <Alert type="danger" message={orderError.message} />}
    <div className="my-4 text-center">
      <button type="button" className="cart-button btn btn-outline-dark mx-1 my-2" onClick={handleDeleteAll}>
        <BsTrash className="fs-5" />
        <span className="cart-btn-text"> Kosár törlése</span>
      </button>
      <button type="button" className="cart-button btn btn-warning mx-1 my-2" onClick={sendOrder}>
        <FiShoppingBag className="fs-5" />
        <span className="cart-btn-text"> Megrendelés</span>
      </button>
    </div>

  </>
  )
}

    </div>
  );
}

export default CartList;
