import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, isAdmin, isEmployee }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated && isAdmin) {
    return <Redirect to='/admin' />;
  }

  if (isAuthenticated && isEmployee) {
    return <Redirect to='/assignment' />;
  }

  return (
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center vh-100 bg-for-login'>
      <div className='transparentCover w-100 h-100'></div>
      <div>
        <h1 className='text-primary  text-center shadow-text'>
          Welcome to HR-client
        </h1>
        <h4 className='text-center '>
          <i className='fas fa-user'></i> Sign Into Your Account
        </h4>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              className='form-control'
              placeholder='Email'
              required
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              className='form-control'
              placeholder='Password'
            />
          </div>

          <input
            type='submit'
            value='Sign In'
            className='btn btn-primary form-control'
          />
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isEmployee: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
  isEmployee: state.auth.isEmployee
});

export default connect(mapStateToProps, { login })(Login);
