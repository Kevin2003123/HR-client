import React from 'react';

const Stars = ({ rate }) => {
  function stars(star) {
    switch (star) {
      case 0:
        return (
          <div className='d-flex'>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 0.5:
        return (
          <div className='d-flex fa-lg'>
            <i className='fas fa-star-half-alt fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 1.0:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 1.5:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star-half-alt fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 2.0:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 2.5:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star-half-alt fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 3.0:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 3.5:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star-half-alt fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 4.0:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );

      case 4.5:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star-half-alt fa-lg'></i>
          </div>
        );

      case 5:
        return (
          <div className='d-flex'>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
            <i className='fas fa-star fa-lg'></i>
          </div>
        );

      default:
        return (
          <div className='d-flex'>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
            <i className='far fa-star fa-lg'></i>
          </div>
        );
    }
  }

  function ratings(rating) {
    try {
      let totalRating = rating.toString();
      let decimal = parseInt(totalRating.substring(0, 1));
      let afterpoint = parseInt(totalRating.substring(2, 3));

      if (isNaN(afterpoint)) {
        return stars(rating);
      } else if (afterpoint < 5) {
        return stars(decimal);
      } else {
        let totalDecimal = decimal + 0.5;
        return stars(totalDecimal);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <div>{ratings(rate)}</div>;
};

Stars.propTypes = {};

export default Stars;
