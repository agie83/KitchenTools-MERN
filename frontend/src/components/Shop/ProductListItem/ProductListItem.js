import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CART_URL, CLOUDINARY_PRODUCT_URL } from '../../../constants/url';
import { AuthContext } from '../../../contexts/AuthContext';
import { CartContext } from '../../../contexts/CartContext/CartContext';
import getItems from '../../../utils/queries';
import './ProductListItem.scss';

function ProductListItem({
  title, price, images, productPath, productId,
}) {
  const [cartItems, setCartItems] = useContext(CartContext);
  const { token, user } = useContext(AuthContext);

  function handleAddToCart() {
    const existingProduct = cartItems.find((cartItem) => cartItem.productId === productId);

    const newQty = (!existingProduct) ? 1 : Number(existingProduct.qty) + 1;
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
        body: JSON.stringify({ productId, qty: 1 }),
      }).then((newCartItem) => {
        setCartItems((prev) => [...prev, newCartItem]);
      });
    }
  }

  return (
    <>
      <div className="col-12 col-sm-6 col-md-3 mb-3">

        <div className="card product-list-item">
          <Link to={`${productPath}`} className="product-link">
            <img className="card-img-top" src={`${CLOUDINARY_PRODUCT_URL}/${images[0]}`} alt={title} />
            <div className="card-body">
              <h6 className="card-title mb-3">{title}</h6>
              <p className="card-text">
                {price}
                {' '}
                Ft
              </p>
            </div>
          </Link>
          <div className="card-footer d-flex w-100">
            <div className="flex-fill">
              <Link to={`${productPath}`} className="product-link">
                Részletek
              </Link>
            </div>
            <div className="flex-fill">
              { (user) && <button type="button" className="product-link button-pure" onClick={() => handleAddToCart(productId)}>Kosárba</button>}
              { (!user) && <Link to={`/login?to=${productPath}`} className="product-link button-pure">Kosárba</Link>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductListItem;
