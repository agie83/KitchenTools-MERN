import React, { useContext, useState } from 'react';
import { CART_URL, CLOUDINARY_PRODUCT_URL } from '../../../constants/url';
import { AuthContext } from '../../../contexts/AuthContext';
import { CartContext } from '../../../contexts/CartContext/CartContext';
import getItems from '../../../utils/queries';
import Alert from '../../formElements/Alert';
import Input from '../../formElements/Input';
import dataSheetSchema from './ProductDataSheet-validator';
import './ProductDataSheet.scss';

function ProductDataSheet({ product }) {
  const [qty, setQty] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [cartItems, setCartItems] = useContext(CartContext);
  const { token, user } = useContext(AuthContext);

  const handleOnChange = (e) => {
    setQty(e.target.value);
  };

  const handleValidation = () => {
    const result = dataSheetSchema.validate({ qty }, { abortEarly: false });
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

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const existingProduct = cartItems.find((cartItem) => cartItem.productId === product._id);
      const newQty = (!existingProduct) ? Number(qty) : Number(existingProduct.qty) + Number(qty);
      if (!user) return;
      if (existingProduct) {
        getItems(CART_URL + user.id, {
          method: 'PATCH',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: existingProduct._id, qty: newQty }),
        });

        setCartItems((prev) => (
          prev.map((prevItem) => (
            (prevItem._id === existingProduct._id) ? { ...prevItem, qty: newQty } : prevItem
          ))
        ));
      } else {
        getItems(CART_URL + user.id, {
          method: 'POST',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId: product._id, qty: Number(qty) }),
        }).then((newCartItem) => {
          setCartItems((prev) => [...prev, newCartItem]);
        });
      }
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
                <form onSubmit={handleAddToCart} noValidate className="d-flex">
                  {(alertMessage !== '') && <Alert type={alertMessage.type} message={alertMessage.message} />}
                  <Input
                    type="number"
                    name="qty"
                    id="qty"
                    placeholder="Mennyiség"
                    onChange={handleOnChange}
                    value={qty}
                  />

                  <div className="ms-3 text-end">
                    <button type="submit" className="btn btn-warning">Kosárba</button>
                  </div>
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
