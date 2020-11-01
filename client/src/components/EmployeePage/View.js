import React from 'react';
import Stars from '../layout/Stars';
const View = ({ employee }) => {
  function ratings(rating) {
    try {
      let totalRating = rating.toString();
      let decimal = parseInt(totalRating.substring(0, 1));
      let afterpoint = parseInt(totalRating.substring(2, 3));

      if (isNaN(afterpoint)) {
        return rating;
      } else if (afterpoint < 5) {
        return decimal;
      } else {
        let totalDecimal = decimal + 0.5;
        return totalDecimal;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button
        type='button'
        className='btn btn-secondary'
        data-toggle='modal'
        data-target={`#staticBackdrop-${employee._id}`}
      >
        View
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
        <div className='modal-dialog modal-dialog-centered modal-lg modal-position'>
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

                  <div className='ml-auto d-flex flex-column'>
                    <i className='fas fa-star fa-lg'></i>
                    <h4 className='text-center'>
                      {ratings(employee.skills.result)}
                    </h4>
                  </div>
                </li>
                <li className='list-group-item'>
                  <h5 className='mb-3 font-weight-bold'>Overall Report</h5>
                  <div className='row row-cols-2s ml-1'>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Attitude</div>
                      <Stars rate={employee.skills.attitude} />
                    </div>
                    <div className='d-flex mb-3 mr-lg-data'>
                      <div style={{ width: 150 }}>Productivity</div>
                      <Stars rate={employee.skills.productivity} />
                    </div>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Communication</div>
                      <Stars rate={employee.skills.communication} />
                    </div>
                    <div className='d-flex mb-3 mr-lg-data'>
                      <div style={{ width: 150 }}>Initiative</div>
                      <Stars rate={employee.skills.initiative} />
                    </div>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Growth</div>
                      <Stars rate={employee.skills.growth} />
                    </div>
                    <div className='d-flex mb-3 mr-lg-data'>
                      <div style={{ width: 150 }}>Innovation</div>
                      <Stars rate={employee.skills.innovation} />
                    </div>
                    <div className='d-flex'>
                      <div style={{ width: 150 }}>Dependability</div>

                      <Stars rate={employee.skills.dependability} />
                    </div>
                  </div>
                </li>
                <li className='list-group-item'>
                  <h5 className='mb-3 font-weight-bold'>Comment</h5>

                  <p className='text-secondary'>{employee.comment}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

View.propTypes = {};

export default View;
