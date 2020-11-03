import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  searchAssingEmployees,
  clearAssingEmployees,
  addAssingEmployees,
  deleteAssingEmployees,
  assingToPending,
  getEmployees
} from '../../actions/employees';
import Spinner from '../layout/Spinner';
import Alert from '../layout/Alert';
import $ from 'jquery';

const AssingEmployees = ({
  employee,
  assingSearchEmployees,
  loading,
  searchAssingEmployees,
  assingned,
  clearAssingEmployees,
  addAssingEmployees,
  addedAssing,
  deleteAssingEmployees,
  assingToPending,
  page,
  searchEmployee,
  getEmployees
}) => {
  const [key, setKey] = useState('');
  var [search, setSearch] = useState('');

  useEffect(() => {
    setKey(uuidv4());
  }, []);

  const sendAssingToPending = (e) => {
    e.preventDefault();
    let id = [];
    addedAssing.map((assing) => id.push(assing.user));

    assingToPending(employee.user, id, page, searchEmployee);

    $('body').css({ overflow: 'inherit' });
    $('.modal-backdrop').remove();
  };

  const onChange = (e) => {
    setSearch((search = e.target.value));
    if (search !== '') {
      searchAssingEmployees(search);
    } else {
      // store.dispatch({ type: ASSING_SEARCH_SUCCESS });
    }
  };

  const onClickHandle = (
    _id,
    user,
    avatar,
    name,
    lastName,
    fullName,
    workPosition
  ) => {
    const add = JSON.stringify({
      _id,
      user,
      avatar,
      name,
      lastName,
      fullName,
      workPosition
    });
    addAssingEmployees(add);
    setSearch((search = ''));
  };

  const ClearAssingEmployees = () => {
    clearAssingEmployees();
    setSearch('');
  };

  return (
    <div>
      <div
        role='button'
        className=''
        data-toggle='modal'
        data-target={`#staticBackdrop-${key}`}
        onClick={() => ClearAssingEmployees()}
      >
        <i className='fas fa-clipboard fa-lg'></i>
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
        <div className='modal-dialog modal-position'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='staticBackdropLabel'>
                Assing Reviewer
                <Alert />
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>

            <div
              className='modal-body modal-small'
              style={{ position: 'relative' }}
            >
              <div className=' px-0 d-flex flex-column justify-content-center  '>
                <div className=''>
                  <input
                    type='search'
                    className='form-control'
                    value={search}
                    placeholder='Name'
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div
                  className='d-flex flex-column align-items-center mt-2'
                  style={{ height: 300, position: 'relative' }}
                >
                  <div
                    className=''
                    style={{
                      position: 'absolute',
                      height: 250,
                      width: '100%',
                      zIndex: search === '' ? -1 : 2,
                      overflow: 'auto'
                    }}
                  >
                    {loading &&
                    search !== '' &&
                    assingSearchEmployees.length !== 0 ? (
                      <ul className='list-group'>
                        <li className='list-group-item'>
                          <Spinner />
                        </li>
                      </ul>
                    ) : search !== '' &&
                      !loading &&
                      assingSearchEmployees.length !== 0 ? (
                      <ul className='list-group'>
                        {assingSearchEmployees.map((employee) => (
                          <li
                            className={
                              'list-group-item ' +
                              (addedAssing.some(
                                (addEmployee) =>
                                  addEmployee.user === employee.user
                              )
                                ? 'disabled'
                                : '')
                            }
                            role='button'
                            key={uuidv4()}
                            onClick={() =>
                              onClickHandle(
                                employee._id,
                                employee.user,
                                employee.avatar,
                                employee.name,
                                employee.lastName,
                                employee.fullName,
                                employee.workPosition
                              )
                            }
                          >
                            <div className='d-flex align-items-center'>
                              <div>
                                {employee.avatar === '' ? (
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
                                    src={employee.avatar}
                                    alt='imagen usuario'
                                    height='50'
                                    width='50'
                                  />
                                )}
                              </div>
                              <div
                                className='d-flex flex-column ml-3'
                                style={{ width: 155 }}
                              >
                                <h6 className='mb-0'>{employee.fullName}</h6>
                                <small>{employee.workPosition}</small>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : assingSearchEmployees.length === 0 &&
                      !loading &&
                      search !== '' ? (
                      <ul className='list-group'>
                        <li className='list-group-item'>Employee not found</li>
                      </ul>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {addedAssing.length <= 0 ? (
                    <div className='d-flex flex-column align-items-center justify-content-center mb-2 w-100 h-100 '>
                      {employee.avatar === '' ? (
                        <div className='' style={{ position: 'relative' }}>
                          <img
                            className='rounded-circle img-fluid'
                            src={require('../../img/perfil.jpg')}
                            alt='imagen prueba'
                            height='50'
                            width='50'
                          />
                        </div>
                      ) : (
                        <div className='' style={{ position: 'relative' }}>
                          <img
                            className='rounded-circle img-fluid'
                            src={employee.avatar}
                            alt='imagen prueba'
                            height='50'
                            width='50'
                          />
                        </div>
                      )}

                      <div
                        className='text-center'
                        style={{ position: 'relative' }}
                      >
                        Invite other employees to rate {employee.lastName}{' '}
                        <br /> based on his performance
                      </div>
                    </div>
                  ) : (
                    <ul
                      style={{
                        position: 'relative',
                        height: 250,
                        width: '100%',
                        overflow: 'auto',
                        zIndex: 1
                      }}
                      className='list-group'
                    >
                      {addedAssing.map((employee) => (
                        <li className='list-group-item' key={uuidv4()}>
                          <div className='d-flex align-items-center'>
                            <div>
                              {employee.avatar === '' ? (
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
                                  src={employee.avatar}
                                  alt='imagen usuario'
                                  height='50'
                                  width='50'
                                />
                              )}
                            </div>
                            <div
                              className='d-flex flex-column ml-3'
                              style={{ width: 155 }}
                            >
                              <h6 className='mb-0'>{employee.fullName}</h6>
                              <small>{employee.workPosition}</small>
                            </div>
                            <div
                              className='ml-auto'
                              role='button'
                              onClick={() =>
                                deleteAssingEmployees(employee.user)
                              }
                            >
                              <i className='fas fa-times-circle fa-lg text-danger'></i>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className=''>
                  <button
                    onClick={(e) => sendAssingToPending(e)}
                    className='btn btn-danger form-control'
                  >
                    Assing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AssingEmployees.propTypes = {
  assingSearchEmployees: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  searchAssingEmployees: PropTypes.func.isRequired,
  assingned: PropTypes.bool.isRequired,
  clearAssingEmployees: PropTypes.func.isRequired,
  addAssingEmployees: PropTypes.func.isRequired,
  addedAssing: PropTypes.array,
  deleteAssingEmployees: PropTypes.func.isRequired,
  assingToPending: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  edited: state.employees.edited,
  assingSearchEmployees: state.employees.assingSearchEmployees,
  loading: state.employees.loadingAssingSearch,
  assingned: state.employees.assingned,
  addedAssing: state.employees.addAssingEmployees
});
export default connect(mapStateToProps, {
  searchAssingEmployees,
  clearAssingEmployees,
  addAssingEmployees,
  deleteAssingEmployees,
  assingToPending,
  getEmployees
})(AssingEmployees);
