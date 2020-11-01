import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { editEmployee } from '../../actions/employees';
import { connect } from 'react-redux';
import $ from 'jquery';

const EditEmployee = ({ employee, editEmployee, edited }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    lastName: '',
    birthday: '',
    email: '',
    phone: '',
    mobilePhone: '',
    address: '',
    workPosition: ''
  });

  const [key, setKey] = useState('');

  useEffect(() => {
    setKey(uuidv4());
    setFormData({
      employeeId: employee.user,
      name: employee.name,
      lastName: employee.lastName,
      birthday: employee.birthday.toString().slice(0, 10),
      email: employee.email,
      phone: employee.phone,
      mobilePhone: employee.mobilePhone,
      address: employee.address,
      workPosition: employee.workPosition
    });
  }, [
    employee.address,
    employee.birthday,
    employee.email,
    employee.lastName,
    employee.mobilePhone,
    employee.name,
    employee.phone,
    employee.user,
    employee.workPosition
  ]);

  const {
    employeeId,
    name,
    lastName,
    birthday,
    email,
    phone,
    mobilePhone,
    address,
    workPosition
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editEmployee(
      employeeId,
      name,
      lastName,
      birthday,
      email,
      phone,
      mobilePhone,
      address,
      workPosition
    );
    //store.dispatch({ type: EDITED });
  };

  if (edited) {
    $('.modal-backdrop').remove();
    $('body').css({ overflow: 'inherit' });
  }
  return (
    <div>
      <div
        type='button'
        className=''
        data-toggle='modal'
        data-target={`#staticBackdrop-${key}`}
      >
        <i className='fas fa-pen fa-lg'></i>
      </div>

      <div
        className='modal '
        id={`staticBackdrop-${key}`}
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
                Edit User
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
            <div className='modal-body p-0 m-0 modal-small modal-w-lg'>
              <form
                onSubmit={(e) => onSubmit(e)}
                className='d-flex flex-column'
              >
                <div className=' d-flex modal-column align-items-center '>
                  <div className='mt-3 ml-3'>
                    {employee.avatar === '' ? (
                      <img
                        className='rounded'
                        src={require('../../img/perfil.jpg')}
                        alt='imagen prueba'
                        height='180'
                        width='150'
                      />
                    ) : (
                      <img
                        className='rounded'
                        src={employee.avatar}
                        alt='imagen prueba'
                        height='180'
                        width='150'
                      />
                    )}
                  </div>
                  <div className='row ml-3 mr-3 modal-column modal-input-small'>
                    <div className='col-4s mt-2 modal-column '>
                      <label htmlFor='name'>Name</label>
                      <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        className='border rounded shadow-sm input-lg-w'
                      />
                    </div>
                    <div className='col-4s mt-2 modal-column'>
                      <label htmlFor='lastName'>Last Name</label>
                      <input
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange={(e) => onChange(e)}
                        className='border rounded shadow-sm input-lg-w'
                        required
                      />
                    </div>
                    <div className='col-4s mt-2 modal-column'>
                      <label htmlFor='birthday'>Birthday</label>
                      <input
                        type='date'
                        name='birthday'
                        value={birthday}
                        onChange={(e) => onChange(e)}
                        className='border rounded shadow-sm input-lg-w'
                        required
                      />
                    </div>
                    <div className='col-4s mt-2 modal-column'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        className='border  rounded shadow-sm input-lg-w'
                        required
                      />
                    </div>
                    <div className='col-4s mt-2 modal-column'>
                      <label htmlFor='phone'>Phone</label>
                      <input
                        type='text'
                        name='phone'
                        value={phone}
                        onChange={(e) => onChange(e)}
                        className='border  rounded shadow-sm input-lg-w'
                        required
                      />
                    </div>
                    <div className='col-4s mt-2 modal-column'>
                      <label htmlFor='mobilePhone'>Mobile Phone</label>
                      <input
                        type='text'
                        name='mobilePhone'
                        value={mobilePhone}
                        onChange={(e) => onChange(e)}
                        className='border  rounded shadow-sm input-lg-w'
                        required
                      />
                    </div>

                    <div className='col-4s mt-2 modal-column'>
                      <label htmlFor='workPosition'>Work Position</label>
                      <input
                        type='text'
                        name='workPosition'
                        value={workPosition}
                        onChange={(e) => onChange(e)}
                        className='border  rounded shadow-sm'
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-3 modal-i-address2'>
                  <label htmlFor='address' className='d-block'>
                    Address
                  </label>
                  <textarea
                    name='address'
                    cols='104'
                    rows='3.5'
                    value={address}
                    onChange={(e) => onChange(e)}
                    className='border  rounded shadow-sm modal-i-address '
                    required
                  ></textarea>
                </div>

                <div className='ml-auto mr-4 mt-3 mb-3'>
                  <input
                    type='submit'
                    value='Submit'
                    className='btn btn-primary'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EditEmployee.propTypes = {
  editEmployee: PropTypes.func.isRequired,
  edited: PropTypes.bool
};

const mapStateToProps = (state) => ({
  edited: state.employees.edited
});

export default connect(mapStateToProps, { editEmployee })(EditEmployee);
