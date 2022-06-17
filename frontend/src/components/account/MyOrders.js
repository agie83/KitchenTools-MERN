import React, { useContext, useEffect, useState } from 'react';
import { ORDERS_URL } from '../../constants/url';
import { AuthContext } from '../../contexts/AuthContext';
import getItems from '../../utils/queries';
import EmptyOrderList from './EmptyOrderList';
import OrderList from './OrderList';

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    getItems(ORDERS_URL, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((orderData) => {
      const resOrders = orderData.orders;
      const orderList = Object.keys(resOrders).map((key) => {
        const modifiedList = {};
        if (resOrders[key].length > 0) {
          const date = new Date(key);
          //  modifiedList[`${date.toISOString().slice(0, 10)} ${date.toISOString().slice(11, 16)}`] = resOrders[key];
          modifiedList.products = (modifiedList.products) || resOrders[key];
          modifiedList.date = `${date.toISOString().slice(0, 10)} ${date.toISOString().slice(11, 16)}`;
          modifiedList.totalSum = (modifiedList.totalSum || 0)
          + resOrders[key].reduce((acc, curr) => {
            return acc + Number(curr.price);
          }, 0);
        }

        return modifiedList;
      });
      setMyOrders(orderList);
    });
  }, []);
  return (
    <section className="container-fluid bg-light p-5">
      {myOrders.length === 0 && <EmptyOrderList /> }
      <OrderList orders={myOrders} />
    </section>
  );
}

export default MyOrders;
