import React from 'react';
import { v4 as uuid } from 'uuid';
import { CLOUDINARY_PRODUCT_URL } from '../../constants/url';
import './OrderList.scss';
import orderStatus from '../../constants/values';

function OrderList({ orders }) {
  return (
    <div>
      { orders.map((order) => (
        <div key={uuid()} className="mb-2">
          <div className="order-wrapper d-flex justify-content-between py-3 fs-5">
            <div className="w-50">{order.date}</div>
            <div className="w-50 text-end">
              {order.totalSum}
              {' '}
              Ft
            </div>
          </div>
          <div className="d-flex flex-column">
            {
              order?.products.map((product, index) => (
                <div key={uuid()} className="d-flex flex-row">
                  <div className="pe-3"><img className="order-list-img" src={`${CLOUDINARY_PRODUCT_URL}/${product.image}`} alt={product.name} /></div>
                  <div className="col-4">{product.name}</div>
                  <div className="col-2">
                    {product.qty}
                    db
                  </div>
                  <div className="col-2">
                    {product.price}
                    Ft/db
                  </div>
                  <div className="col-2">
                    {product.qty * product.price}
                    Ft
                  </div>
                  <div className="flex-fill">
                    {
                      (index === 0)
                      && (
                      <p className="text-end">
                        {orderStatus[product.status]}
                      </p>
                      )
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
