import React, { useEffect, useState } from 'react';
import { CATEGORIES_URL } from '../../../constants/url';
import getItems from '../../../utils/queries';
import CategoryItem from '../CategoryItem/CategoryItem';

function Categories({ aside = true }) {
  const [categories, setCategories] = useState([]);

  // async function getCategories() {
  //   let response;
  //   try {
  //     response = await fetch(CATEGORIES_URL);
  //     setFetchWorking(true);
  //   } catch (error) {
  //     setFetchWorking(false);
  //   }
  //   return response.json();
  // }

  useEffect(() => {
    getItems(CATEGORIES_URL).then((data) => {
      setCategories(data.categories);
    });
  }, []);

  return (
    <main className="bg-light px-2 py-3">
      <div className="row col-12 col-xl-11 mx-auto">
        {
          categories.map((category) => (
            <CategoryItem
              key={category._id}
              cardTitle={category.name}
              cardText="asdfasdf"
              cardImage={category.image}
              aside={aside}
              categoryPath={`/shop/${category.slug}`}
            />
          ))
        }
      </div>
    </main>
  );
}

export default Categories;
