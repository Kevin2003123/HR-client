import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEmployee } from '../../actions/employees';
import $ from 'jquery';
const AddUser = ({ createEmployee, created }) => {
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

  const {
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
    createEmployee(
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

  if (created) {
    $('.hidden').hide();
    $('.modal-backdrop').remove();
    $('body').css({ overflow: 'inherit' });
  }

  return (
    <div>
      <button
        type='button'
        className='btn btn-danger'
        data-toggle='modal'
        data-target={`#staticBackdrop`}
      >
        <i className='fas fa-user-plus'></i> Add User
      </button>

      <div
        className='modal hidden '
        id={`staticBackdrop`}
        data-backdrop='static'
        data-keyboard='false'
        tabIndex='-1'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg '>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4
                className='modal-title font-weight-bold'
                id='staticBackdropLabel'
              >
                Create User
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
              <form
                onSubmit={(e) => onSubmit(e)}
                className='d-flex flex-column'
              >
                <div className=' d-flex align-items-center '>
                  <div className='mt-3 ml-3'>
                    <img
                      className='rounded'
                      src={require('../../img/perfil.jpg')}
                      alt='imagen prueba'
                      height='180'
                      width='150'
                    />
                  </div>
                  <div className='row ml-3 mr-3'>
                    <div className='col-4'>
                      <label htmlFor='name'>Name</label>
                      <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        className='border rounded shadow-sm'
                      />
                    </div>
                    <div className='col-4'>
                      <label htmlFor='lastName'>Last Name</label>
                      <input
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange={(e) => onChange(e)}
                        className='border rounded shadow-sm'
                        required
                      />
                    </div>
                    <div className='col-4'>
                      <label htmlFor='birthday'>Birthday</label>
                      <input
                        type='date'
                        name='birthday'
                        value={birthday}
                        onChange={(e) => onChange(e)}
                        className='border rounded shadow-sm'
                        required
                      />
                    </div>
                    <div className='col-4 mt-2'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        className='border  rounded shadow-sm'
                        required
                      />
                    </div>
                    <div className='col-4 mt-2'>
                      <label htmlFor='phone'>Phone</label>
                      <input
                        type='text'
                        name='phone'
                        value={phone}
                        onChange={(e) => onChange(e)}
                        className='border  rounded shadow-sm'
                        required
                      />
                    </div>
                    <div className='col-4 mt-2'>
                      <label htmlFor='mobilePhone'>Mobile Phone</label>
                      <input
                        type='text'
                        name='mobilePhone'
                        value={mobilePhone}
                        onChange={(e) => onChange(e)}
                        className='border  rounded shadow-sm'
                        required
                      />
                    </div>

                    <div className='col-4 mt-2'>
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

                <div className='ml-3 mt-3'>
                  <label htmlFor='address' className='d-block'>
                    Address
                  </label>
                  <textarea
                    name='address'
                    cols='104'
                    rows='3.5'
                    value={address}
                    onChange={(e) => onChange(e)}
                    className='border  rounded shadow-sm'
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

AddUser.propTypes = {
  createEmployee: PropTypes.func.isRequired,
  created: PropTypes.bool
};

const mapStateToProps = (state) => ({
  created: state.employees.created
});
export default connect(mapStateToProps, { createEmployee })(AddUser);
