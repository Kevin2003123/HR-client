import React from 'react';
import PropTypes from 'prop-types';
import ReviewSelect from './ReviewSelect';
import { setAlert } from '../../actions/alert';
import { sendPendingToCompleted } from '../../actions/assignment';
import { connect } from 'react-redux';
import $ from 'jquery';
import { useState } from 'react';

const Review = ({
  employee,
  setAlert,
  sendPendingToCompleted,
  user,
  search,
  page
}) => {
  const [alertf, setAlertf] = useState('d-none');
  const [comment, setComment] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    let attitude = parseInt(e.target[0].value);
    let productivity = parseInt(e.target[1].value);
    let communication = parseInt(e.target[2].value);
    let initiative = parseInt(e.target[3].value);
    let growth = parseInt(e.target[4].value);
    let innovation = parseInt(e.target[5].value);
    let dependability = parseInt(e.target[6].value);

    if (
      attitude === 0 ||
      productivity === 0 ||
      communication === 0 ||
      initiative === 0 ||
      growth === 0 ||
      innovation === 0 ||
      dependability === 0 ||
      comment === ''
    ) {
      setAlertf('');
      setTimeout(() => {
        setAlertf('d-none');
      }, 3000);
    } else {
      sendPendingToCompleted(
        search,
        page,
        employee._id,
        user._id,
        employee.user,
        attitude,
        productivity,
        communication,
        initiative,
        growth,
        innovation,
        dependability,
        comment
      );
    }

    $('.modal-backdrop').remove();
    $('body').css({ overflow: 'inherit' });
  };
  return (
    <div>
      <button
        type='button'
        className='btn btn-danger'
        data-toggle='modal'
        data-target={`#staticBackdrop-${employee._id}`}
      >
        Review
      </button>

      <div
        className='modal fade'
        id={`staticBackdrop-${employee._id}`}
        data-backdrop='static'
        data-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4
                className='modal-title font-weight-bold'
                id='staticBackdropLabel'
              >
                {`${employee.fullName}'s Report`}
              </h4>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body p-0 m-0'>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item d-flex align-items-center '>
                  <div>
                    {employee.avatar === '' ? (
                      <img
                        className='rounded'
                        src={require('../../img/perfil.jpg')}
                        alt='imagen prueba'
                        height='125'
                        width='125'
                      />
                    ) : (
                      <img
                        className='rounded'
                        src={employee.avatar}
                        alt='imagen prueba'
                        height='125'
                        width='125'
                      />
                    )}
                  </div>
                  <div
                    className='d-flex flex-column ml-3'
                    style={{ height: 125 }}
                  >
                    <h6 className='font-weight-bold'>{employee.fullName}</h6>
                    <h6 className='font-weight-normal'>
                      {employee.workPosition}
                    </h6>
                    <div className='d-flex flex-column mt-auto'>
                      <h6 className='font-weight-bold'>Manager</h6>
                      <h6 className='font-weight-normal'>john Smith</h6>
                    </div>
                  </div>

                  <div className={`alert alert-danger ml-3 ${alertf}`}>
                    Please fill all the fields
                  </div>
                </li>
                <form onSubmit={(e) => onSubmit(e)}>
                  <li className='list-group-item'>
                    <h5 className='mb-3 font-weight-bold'>Overall Report</h5>

                    <div className='row row-cols-2 ml-1'>
                      <div className='d-flex mb-3 align-items-center'>
                        <div style={{ width: 150 }}>Attitude</div>
                        <ReviewSelect />
                      </div>
                      <div className='d-flex mb-3 align-items-center'>
                        <div style={{ width: 150 }}>Productivity</div>
                        <ReviewSelect />
                      </div>
                      <div className='d-flex mb-3 align-items-center'>
                        <div style={{ width: 150 }}>Communication</div>
                        <ReviewSelect />
                      </div>
                      <div className='d-flex mb-3 align-items-center'>
                        <div style={{ width: 150 }}>Initiative</div>
                        <ReviewSelect />
                      </div>
                      <div className='d-flex mb-3 align-items-center'>
                        <div style={{ width: 150 }}>Growth</div>
                        <ReviewSelect />
                      </div>
                      <div className='d-flex mb-3 align-items-center'>
                        <div style={{ width: 150 }}>Innovation</div>
                        <ReviewSelect />
                      </div>
                      <div className='d-flex align-items-center'>
                        <div style={{ width: 150 }}>Dependability</div>
                        <ReviewSelect />
                      </div>
                    </div>
                  </li>

                  <li className='list-group-item d-flex flex-column'>
                    <div>
                      Comment
                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        name='comment'
                        className='form-control mt-2'
                        required
                      />
                    </div>

                    <button
                      type='submit'
                      className='btn btn-primary ml-auto mt-3'
                    >
                      Submit
                    </button>
                  </li>
                </form>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Review.propTypes = {
  setAlert: PropTypes.func.isRequired,
  sendPendingToCompleted: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { setAlert, sendPendingToCompleted })(
  Review
);
