import React from 'react';
import { Link } from 'react-router-dom';

function EmptyOrderList() {
  return (
    <div className="text-center">
      <div><img src="./images/empty-cart.png" alt="A kosarad üres" /></div>
      <div className="fs-3 my-3">Még nincsenek reneléseid</div>
      <div className="my-3">Nézz szét a termékek között! :)</div>
      <div className="fs-3 my-3"><Link to="/shop" className="btn btn-warning">Termékek megtekintése</Link></div>
    </div>
  );
}

export default EmptyOrderList;
