import React, { useContext } from 'react';
import { CartContext } from '../../../contexts/CartContext/CartContext';
import CartList from '../CartList/CartList';
import EmptyCart from './EmptyCart';

export default function Cart() {
  const [cartItems] = useContext(CartContext);

  return (
    <section className="container-fluid bg-light p-5">
      {cartItems.length === 0 && <EmptyCart /> }
      <CartList />
    </section>
  );
}
