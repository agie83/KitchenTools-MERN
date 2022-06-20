import React, { useEffect, useState } from 'react';
import { STORES_URL } from '../../constants/url';
import getItems from '../../utils/queries';
import './Contact.scss';

function Contact() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getItems(STORES_URL).then((data) => {
      setStores(data.stores);
    });
  }, []);

  return (
    <div className="bg-light p-5">
      <h1 className="h4">Elérhetőségeink</h1>
      <div className="py-3 row">
        {
   (stores?.length > 0) && stores.map((store) => (
     <div key={store._id} className="col-12 col-sm-6 p-4">
       <div className="text-warning fs-5">{store.name}</div>
       <div>{store.address}</div>
       <div>{store.opening}</div>
       <div className="map my-3">
         <a href={store.mapLink}><img src={`./images/${store.mapImage}`} alt={store.address} /></a>
       </div>
     </div>

   ))
  }
      </div>
    </div>
  );
}

export default Contact;
