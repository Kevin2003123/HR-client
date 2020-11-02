import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import $ from 'jquery';
import AddUser from './AddUser';
import {
  getEmployees,
  getLastEmployee,
  searchForEmployees,
  getLastSearchEmployee,
  setPage
} from '../../actions/employees';
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';
import EmployeesItems from './EmployeesItems';
import { v4 as uuidv4 } from 'uuid';

const Employees = ({
  loading,
  loadingEmployees,
  getEmployees,
  employees,
  getLastEmployee,
  lastEmployee,
  searchForEmployees,
  getLastSearchEmployee,
  edited,
  setAlert,
  created,
  setPage,
  page
}) => {
  useEffect(() => {
    getEmployees(1);
    getLastEmployee();
    setPage(1);
  }, [getEmployees, getLastEmployee, setPage]);
  var [search, setSearch] = useState('');

  const previews = () => {
    if (search === '') {
      if (page > 1) {
        setPage(page - 1);
        getEmployees(page - 1);
      }
    } else {
      if (page > 1) {
        setPage(page - 1);
        searchForEmployees(search, page - 1);
      }
    }
  };

  const nexts = () => {
    if (!employees.some((employee) => employee.user === lastEmployee.user)) {
      setPage(page + 1);
      if (search === '') {
        getEmployees(page + 1);
      } else {
        searchForEmployees(search, page + 1);
      }
    }
  };

  const getSearch = (e) => {
    setSearch((search = e.target.value));
    if (search !== '') {
      setPage(1);
      searchForEmployees(search, 1);
      getLastSearchEmployee(search);
    } else {
      setPage(1);
      getEmployees(1);
      getLastEmployee();
    }
  };

  const isEmptyEmployees = () => {
    if (employees.length <= 0) {
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
    if (employees.some((employee) => employee.user === lastEmployee.user)) {
      return 'disabled';
    } else {
      return '';
    }
  };

  if (edited || created) {
    $('.edited').animate({ left: '+=50' }, 5000, () => {
      $('.edited').css({ left: 0 });
    });
  }

  return loading ? (
    <div className='container-fluid vh-100'>
      <Spinner />
    </div>
  ) : (
    <div className='container-fluid vh-100 m-0 p-0 w-100 overflow-small'>
      <div className='row row-cols-1 p-0'>
        <div className='col p-0 w-100 '>
          <Navbar />
        </div>
        <div
          className='col bg-light  d-flex p-0 vw-100 '
          style={{ height: 175 }}
        >
          <h1 className='mt-auto ml-large pb-2 font-weight-bold'>Employees</h1>
          <div
            style={{ position: 'absolute', height: 10, width: 150 }}
            className='edited'
          >
            <Alert />
          </div>
        </div>

        <div className='col d-flex d-small justify-content-between mr-large mx-0 px-0 pt-4 pb-4 w-100 '>
          <input
            className='ml-large rounded border border-secondary'
            type='search'
            name='search'
            value={search}
            placeholder='Search by name'
            style={{ width: 250, height: 34 }}
            onChange={(e) => getSearch(e)}
          />
          <div className='mt-small ml-small mr-large'>
            <AddUser />
          </div>
        </div>
        <div className='col w-100'>
          {loadingEmployees ? (
            <Spinner />
          ) : (
            <div className='d-flex flex-column w-100  position-small '>
              <ul className='list-group list-group-flush w-100'>
                {employees.map((employee) => (
                  <EmployeesItems
                    key={uuidv4()}
                    employee={employee}
                    search={search}
                    page={page}
                    length={employees.length}
                  />
                ))}
              </ul>

              <nav aria-label='...' className='align-self-center'>
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
          )}
        </div>
      </div>
    </div>
  );
};

Employees.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  getEmployees: PropTypes.func.isRequired,
  loadingEmployees: PropTypes.bool,
  employees: PropTypes.array,
  getLastEmployee: PropTypes.func.isRequired,
  lastEmployee: PropTypes.object,
  searchForEmployees: PropTypes.func.isRequired,
  getLastSearchEmployee: PropTypes.func.isRequired,
  edited: PropTypes.bool,
  setAlert: PropTypes.func,
  created: PropTypes.bool,
  setPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  employees: state.employees.employees,
  loadingEmployees: state.employees.loadingEmployees,
  lastEmployee: state.employees.lastEmployee,
  edited: state.employees.edited,
  created: state.employees.created,
  page: state.employees.page
});

export default connect(mapStateToProps, {
  getEmployees,
  getLastEmployee,
  searchForEmployees,
  getLastSearchEmployee,
  setAlert,
  setPage
})(Employees);
