import React from 'react';
import { Link } from 'react-router-dom';
import { CLOUDINARY_CATEGORY_URL } from '../../../constants/url';
import './CategoryItem.scss';

function CategoryItem({
  cardTitle, cardImage, aside, categoryPath,
}) {
  return (
    (!aside)
      ? (
        <div className="col-12">
          <Link to={categoryPath}>
            {' '}
            {cardTitle}
          </Link>

        </div>
      )
      : (

        <div className="category-item-box col-12 col-sm-6 col-md-3 mb-3 mb-md-5">
          <Link to={categoryPath}>
            <div className="card category-item">
              <div className="category-item image">
                <img src={`${CLOUDINARY_CATEGORY_URL}/${cardImage}`} className="card-img-top" alt={cardTitle} />
              </div>

              <div className="card-body p-3">
                <h6 className="card-title">{cardTitle}</h6>
              </div>
            </div>
          </Link>
        </div>

      )
  );
}

export default CategoryItem;
