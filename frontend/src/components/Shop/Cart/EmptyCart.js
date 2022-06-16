import React from 'react';
import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className="text-center">
      <div><img src="./images/empty-cart.png" alt="A kosarad üres" /></div>
      <div className="fs-3 my-3">A kosarad jelenleg üres.</div>
      <div className="my-3">Nézz szét a termékek között! :)</div>
      <div className="fs-3 my-3"><Link to="/shop" className="btn btn-warning">Vásárlás folytatása</Link></div>
    </div>
  );
}

export default EmptyCart;
