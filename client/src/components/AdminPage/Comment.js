import React from 'react';

const Comment = ({ comment }) => {
  return (
    <li className='list-group-item d-flex flex-column justify-content-between w-100 '>
      <div className='d-flex align-items-center'>
        <div>
          {comment.avatar === '' ? (
            <img
              className='img-fluid rounded-circle'
              src={require('../../img/perfil.jpg')}
              alt='imagen prueba'
              height='50'
              width='50'
            />
          ) : (
            <img
              className='img-fluid rounded-circle'
              src={comment.avatar}
              alt='imagen usuario'
              height='50'
              width='50'
            />
          )}
        </div>
        <div className='d-flex flex-column ml-3' style={{ width: 155 }}>
          <h6 className='mb-0'>{comment.fullName}</h6>
          <small>{comment.workPosition}</small>
        </div>
      </div>

      <div className='mt-3 ml-3'>{comment.comment}</div>
    </li>
  );
};

Comment.propTypes = {};

export default Comment;
