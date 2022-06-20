import React from 'react';
import { v4 as uuid } from 'uuid';

export default function Alert({ type, message }) {
  return (

    <div className={`alert alert-${type} mt-3 small`} role="alert">
      {
           (typeof (message) !== 'string' && message.length > 0)
             ? message.map((err) => (
               <div key={uuid()}>{err}</div>
             )) : message
      }
    </div>
  );
}
