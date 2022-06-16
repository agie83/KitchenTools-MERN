import React, { useState } from 'react';
import { CLOUDINARY_PRODUCT_URL } from '../../../constants/url';
import Alert from '../../formElements/Alert';
import dataSheetSchema from './ProductDataSheet-validator';
import './ProductDataSheet.scss';

function ProductDataSheet({ product }) {
  const [qty, setQty] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');

  const handleOnChange = (e) => {
    setQty(e.target.value);
  };

  const handleValidation = () => {
    const result = dataSheetSchema.validate(qty, { abortEarly: false });
    const { error } = result;
    if (error) {
      const errorArray = result.error.message.split('.');
      setAlertMessage(
        {
          type: 'danger',
          message: errorArray,
        },
      );
      return false;
    }
    return true;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log(e.target.value);
    }
  };
  return (

    <div className=" p-2 container">
      <div className="d-flex flex-column flex-sm-row">
        <div className="p-2 flex-fill text-center col-12 col-sm-3 col-md-4 col-lg-6 "><img src={`${CLOUDINARY_PRODUCT_URL}/${product.images[0]}`} alt={product.title} className="w-75" /></div>
        <div className="p-2 flex-fill col-12 col-sm-9 col-md-8 col-lg-6">
          <h1 className="h3">{product.name}</h1>
          <div className="fs-3 text-warning">
            {product.price}
            {' '}
            Ft
          </div>
          <div className="description my-3">{product.description}</div>
          {
            (product.qty > 0)
              ? (
                <form className="row g-3 my-5">
                  <div className="mb-3 row">
                    <div className="col-6 col-sm-auto mt-3 text-center">Mennyiség</div>
                    <div className="col-6 col-sm-5 col-lg-3">
                      <input type="number" className="form-control mt-3" id="qty" name="qty" min="0" value={qty} onChange={handleOnChange} />
                    </div>
                    <div className="col-12 col-sm-auto">
                      <button type="submit" className="btn btn-warning mt-3 w-100" onSubmit={() => handleOnSubmit}>Kosárba</button>
                    </div>
                  </div>
                  {(alertMessage !== '') && <Alert type={alertMessage.type} message={alertMessage.message} />}
                </form>
              )
              : (
                <div className="mb-3 row">
                  <div htmlFor="staticEmail" className="col-sm-12">Jelenleg nincs raktáron</div>
                </div>
              )
          }
          <div className="product-labels mb-3">
            {
            (product.labels?.length > 0)
              && (
                product.labels.map((label) => (
                  <button key={product._id + label} type="button" className="btn btn-outline-warning">{label}</button>
                ))
              )
          }
          </div>
        </div>
      </div>
    </div>

  );
}

export default ProductDataSheet;
