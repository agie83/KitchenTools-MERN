import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { SHOP_URL } from '../../constants/url';
import './Shop.scss';
import getItems from '../../utils/queries';
import ShopItem from './ShopItem/ShopItem';

function Shop() {
  const path = window.location.pathname;
  const pathArray = path.split('/').filter((p) => p);

  let slug = '';
  let resultKey = '';
  switch (pathArray.length) {
    case 1:
      slug = '';
      resultKey = 'categories';
      // resultKey = (window.location.search !== '') ? 'products' : 'categories';
      break;
    case 2:
      slug = pathArray[pathArray.length - 1];
      resultKey = 'products';
      break;
    case 3:
      slug = `${pathArray[pathArray.length - 2]}/${pathArray[pathArray.length - 1]}`;
      resultKey = 'product';
      break;
    default:
      slug = '';
      resultKey = 'categories';
  }

  const [itemList, setItemList] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');
  const urlEnd = (pathArray.length === 1 && window.location.search !== '') ? `filter${window.location.search}` : slug;

  useEffect(() => {
    let isSubscription = true;
    getItems(SHOP_URL + urlEnd,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((data) => {
      if (!isSubscription) return;
      setItemList(data[resultKey]);
      setCategoryTitle(data?.categoryName);
    });
    return () => { isSubscription = false; };
  }, []);

  return (
    <div className="shop bg-light p-3 row">
      {
                 (resultKey === 'products' || resultKey === 'product') && (
                   <div className="shop-header">
                     <h5 className="mb-5 d-flex align-items-center">

                       <Link to={`/${pathArray[0]}`}>Shop</Link>
                       <span className="shop-header-arrow"><BsChevronDoubleRight /></span>
                       <span className="shop-header-category">
                         {categoryTitle}
                       </span>
                     </h5>
                   </div>

                 )
      }
      {(itemList.length > 0 || Object.keys(itemList).length > 0)
        ? (
          <ShopItem
            resultKey={resultKey}
            itemList={itemList}
            path={path}
            pathArray={pathArray}
            categoryTitle={categoryTitle}
          />
        )
        : <div className="p-3"> Nincs találat. </div>}

    </div>
  );
}

export default Shop;
