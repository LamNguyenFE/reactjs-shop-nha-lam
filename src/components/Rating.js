import React from 'react';

export default function Rating(props) {

  const { rating = 0, numReviews = 0, caption = '' } = props;
  return (
    // <div className="rating">
    <div className="rate">
      <div className="star">
        <span>
          <i
            className={
              rating >= 1
                ? 'fa fa-star'
                : rating >= 0.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 2
                ? 'fa fa-star'
                : rating >= 1.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 3
                ? 'fa fa-star'
                : rating >= 2.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 4
                ? 'fa fa-star'
                : rating >= 3.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-o'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              rating >= 5
                ? 'fa fa-star'
                : rating >= 4.5
                  ? 'fa fa-star-half-o'
                  : 'fa fa-star-o'
            }
          ></i>
        </span>
      </div>

      {caption && <div className="rate-count">{caption}</div>}

      { (numReviews > 0) && <div className="rate-count">{numReviews + ' đánh giá'}</div>}
    </div>
  );
}