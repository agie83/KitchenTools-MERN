import React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import ProductDataSheet from '../ProductDataSheet/ProductDataSheet';
import ProductListItem from '../ProductListItem/ProductListItem';

function ShopItem({
  resultKey, itemList, path, pathArray,
}) {
  return (
    <>

      {
        (resultKey === 'product')
          ? (
            <ProductDataSheet product={itemList} />
          )
          : (
            (itemList) && itemList.map((item) => (
              (resultKey === 'categories' && window.location.search === '')
                ? (
                  <CategoryItem
                    key={item?._id}
                    cardTitle={item.name}
                    cardText="asdfasdf"
                    cardImage={item.image}
                    aside
                    categoryPath={`${path}/${item.slug}`}
                  />
                )
                : (
                  <ProductListItem
                    key={item._id}
                    title={item.name}
                    content={item.description}
                    price={item.price}
                    images={item.images}
                    productPath={`/${pathArray[0]}/${pathArray[1]}/${item.slug}`}
                    productId={item._id}
                  />
                )
            )))
  }
    </>
  );
}

export default ShopItem;
