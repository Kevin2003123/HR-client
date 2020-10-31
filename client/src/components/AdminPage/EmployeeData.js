import React from 'react';
import Stars from '../layout/Stars';
import Spinner from '../layout/Spinner';
import { getComments, getLastComment } from '../../actions/employees';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import Comment from './Comment';
import { v4 as uuidv4 } from 'uuid';
const EmployeeData = ({
  employee,
  rate,
  loading,
  getLastComment,
  getComments,
  comments,
  lastComment
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, []);

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

  const previews = () => {
    if (page > 1) {
      setPage(page - 1);
      getComments(employee.user, page - 1);
    }
  };

  const nexts = () => {
    if (!comments.some((employee) => employee._id === lastComment._id)) {
      setPage(page + 1);
      getComments(employee.user, page + 1);
    }
  };

  const gettingComments = () => {
    getComments(employee.user, 1);
    getLastComment(employee.user);
  };

  const isEmptyEmployees = () => {
    if (comments.length <= 0) {
      return 'disabled';
    } else {
      return '';
    }
  };

  const isFirstPage = () => {
    if (page === 1) {
      return 'disabled';
    } else {
      return '';
    }
  };

  const isLastEmployee = () => {
    if (comments.some((employee) => employee._id === lastComment._id)) {
      return 'disabled';
    } else {
      return '';
    }
  };

  return (
    <div>
      <div
        type='button'
        className=''
        data-toggle='modal'
        data-target={`#staticBackdrop-${employee._id}`}
        onClick={() => gettingComments()}
      >
        <i className='fas fa-eye fa-lg'></i>
      </div>

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
                {`${employee.name}'s Report`}
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
                      {ratings(employee.skill.result)}
                    </h4>
                  </div>
                </li>
                <li className='list-group-item'>
                  <h5 className='mb-3 font-weight-bold'>Overall Report</h5>
                  <div className='row row-cols-2 ml-1'>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Attitude</div>
                      <Stars rate={employee.skill.attitude} />
                    </div>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Productivity</div>
                      <Stars rate={employee.skill.productivity} />
                    </div>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Communication</div>
                      <Stars rate={employee.skill.communication} />
                    </div>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Initiative</div>
                      <Stars rate={employee.skill.initiative} />
                    </div>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Growth</div>
                      <Stars rate={employee.skill.growth} />
                    </div>
                    <div className='d-flex mb-3'>
                      <div style={{ width: 150 }}>Innovation</div>
                      <Stars rate={employee.skill.innovation} />
                    </div>
                    <div className='d-flex'>
                      <div style={{ width: 150 }}>Dependability</div>

                      <Stars rate={employee.skill.dependability} />
                    </div>
                  </div>
                </li>
                <li className='list-group-item'>
                  <h5 className='mb-3 font-weight-bold'>Comments</h5>
                  <ul className='list-group list-group-flush'>
                    {loading ? (
                      <Spinner />
                    ) : (
                      comments.map((comment) => (
                        <Comment key={uuidv4()} comment={comment} />
                      ))
                    )}
                  </ul>
                </li>
              </ul>
            </div>
            <div className='modal-footer d-flex align-items-center justify-content-center'>
              <nav aria-label='...' className=''>
                <ul className='pagination'>
                  <li
                    className={`page-item ${isEmptyEmployees()} ${isFirstPage()}`}
                  >
                    <div
                      onClick={() => previews()}
                      className='page-link'
                      tabIndex='-1'
                      role='button'
                      aria-disabled='true'
                    >
                      Previous
                    </div>
                  </li>

                  <li
                    className={`page-item ${isEmptyEmployees()} ${isLastEmployee()}`}
                  >
                    <div
                      className='page-link'
                      role='button'
                      onClick={() => nexts()}
                    >
                      Next
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EmployeeData.propTypes = {
  getComments: PropTypes.func.isRequired,
  getLastComment: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  comments: PropTypes.array,
  lastComment: PropTypes.object
};

const mapStateToProps = (state) => ({
  loading: state.employees.loadingComments,
  comments: state.employees.comments,
  lastComment: state.employees.lastComment
});
export default connect(mapStateToProps, { getLastComment, getComments })(
  EmployeeData
);
