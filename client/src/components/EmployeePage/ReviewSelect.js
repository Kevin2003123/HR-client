import React, { useEffect } from 'react';
import { useState } from 'react';
import $ from 'jquery';
import { v4 as uuidv4 } from 'uuid';
const ReviewSelect = () => {
  const [key, setKey] = useState('');
  const [click, setclick] = useState(false);
  const [clickValue, setClickValue] = useState();
  var [ratingValue, setRatingValue] = useState(0);
  useEffect(() => {
    setKey(uuidv4());
  }, []);

  const onMouseHover = (index) => {
    for (let i = 0; i < 5; i++) {
      $(`.circle${i}${key}`).css({ background: 'white' });
    }
    for (let i = 0; i <= index; i++) {
      $(`.circle${i}${key}`).css({ background: 'red' });
    }

    setRatingValue(index + 1);
  };
  const onMouseOut = () => {
    for (let i = 0; i < 5; i++) {
      $(`.circle${i}${key}`).css({ background: 'white' });
    }
    if (!click) {
      for (let i = 0; i < 5; i++) {
        $(`.circle${i}${key}`).css({ background: 'white' });
      }
      setRatingValue(0);
    } else {
      for (let i = 0; i <= clickValue; i++) {
        $(`.circle${i}${key}`).css({ background: 'red' });
      }
      setRatingValue(clickValue + 1);
    }
  };

  const onClick = (index) => {
    setclick(true);
    setClickValue(index);
    setRatingValue(index + 1);
    for (let i = 0; i <= index; i++) {
      $(`.circle${i}${key}`).css({ background: 'red' });
    }
  };
  return (
    <div
      className=' d-flex align-items-center'
      onMouseOut={() => onMouseOut()}
      style={{ width: 250, height: 20 }}
    >
      {[{}, {}, {}, {}, {}].map((circle, index) => (
        <div
          key={index}
          className={`rounded-circle p-2 border ml-2 border-secondary circle${index}${key}`}
          onMouseEnter={() => onMouseHover(index)}
          onClick={() => onClick(index)}
        ></div>
      ))}

      {ratingValue === 1 && <div className='ml-2 '>Terrible</div>}
      {ratingValue === 2 && <div className='ml-2 '>Poor</div>}
      {ratingValue === 3 && <div className='ml-2 '>Average</div>}
      {ratingValue === 4 && <div className='ml-2 '>Very Good</div>}
      {ratingValue === 5 && (
        <div className='ml-2' id={`${uuidv4()}`}>
          Excelent
        </div>
      )}

      <input
        type='number'
        name={`${key}`}
        className='d-none'
        id={`${uuidv4()}`}
        readOnly
        value={ratingValue}
        required
      />
    </div>
  );
};

ReviewSelect.propTypes = {};

export default ReviewSelect;
