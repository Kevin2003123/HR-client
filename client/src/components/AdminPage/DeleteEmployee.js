import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEmployee, setPage } from '../../actions/employees';
import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery';

const DeleteEmployee = ({
  employee,
  deleteEmployee,
  deleted,
  search,
  page,
  length,
  setPage
}) => {
  const [key, setKey] = useState('');

  useEffect(() => {
    setKey(uuidv4());
  }, []);

  const DeleteEmployee = (e) => {
    e.preventDefault();

    if (page === 1 && length <= 1) {
      setPage(1);
      deleteEmployee(employee.user, search, 1, length);
    } else if (page !== 1 && length <= 1) {
      setPage(page - 1);
      deleteEmployee(employee.user, search, page - 1, length);
    } else {
      deleteEmployee(employee.user, search, page, length);
    }

    $('body').css({ overflow: 'inherit' });
    $('.modal-backdrop').remove();
  };
  return (
    <div>
      <div
        role='button'
        className='mr-3'
        data-toggle='modal'
        data-target={`#staticBackdrop-${key}`}
      >
        <i role='button' className='fas fa-trash-alt fa-lg'></i>
      </div>

      <div
        className='modal fade'
        id={`staticBackdrop-${key}`}
        data-backdrop='static'
        data-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-body m-0 p-0 d-flex flex-column'>
              <button
                type='button'
                className='close ml-auto mr-2'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>

              <div className='d-flex flex-column justify-content-center align-items-center'>
                <h5>
                  Are you sure you want to delete the employee{' '}
                  {employee.fullName}?
                </h5>
              </div>
            </div>

            <div className='modal-footer d-flex justify-content-center align-items-center'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={(e) => DeleteEmployee(e)}
              >
                Delete
              </button>

              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteEmployee.propTypes = {
  deleteEmployee: PropTypes.func.isRequired,
  deleted: PropTypes.bool,
  setPage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  deleted: state.employees.deleted
});

export default connect(mapStateToProps, { deleteEmployee, setPage })(
  DeleteEmployee
);
