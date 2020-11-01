import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';
import EmployeesItems from './EmployeesItems';

import { v4 as uuidv4 } from 'uuid';
import {
  getEmployees,
  getLastEmployee,
  searchForEmployees,
  getLastSearchEmployee,
  setPage
} from '../../actions/employees';

import {
  getPendingEmployees,
  getLastPendingEmployee,
  getCompletedEmployees,
  getLastCompletedEmployee,
  searchForCompletedEmployees,
  searchForPendingEmployees,
  getLastSearchPendingEmployee,
  getLastSearchCompletedEmployee
} from '../../actions/assignment';

const Assigments = ({
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
  page,
  getPendingEmployees,
  getLastPendingEmployee,
  getCompletedEmployees,
  getLastCompletedEmployee,
  searchForCompletedEmployees,
  searchForPendingEmployees,
  getLastSearchPendingEmployee,
  getLastSearchCompletedEmployee,
  user
}) => {
  useEffect(() => {
    if (!loading) {
      getPendingEmployees(user._id, 1);
      getLastPendingEmployee(user._id);
      setPage(1);
    }
  }, [getLastPendingEmployee, getPendingEmployees, loading, setPage, user._id]);
  var [search, setSearch] = useState('');
  const [pending, setPending] = useState('bg-white border border-bottom-0');
  const [completed, setCompleted] = useState(
    'bg-secondary border border-bottom-0 text-white'
  );
  const [window, setWindow] = useState(false);
  const previews = () => {
    if (!window) {
      if (search === '') {
        if (page > 1) {
          setPage(page - 1);
          getPendingEmployees(user._id, page - 1);
        }
      } else {
        if (page > 1) {
          setPage(page - 1);
          searchForPendingEmployees(user._id, search, page - 1);
        }
      }
    } else {
      if (search === '') {
        if (page > 1) {
          setPage(page - 1);
          getCompletedEmployees(user._id, page - 1);
        }
      } else {
        if (page > 1) {
          setPage(page - 1);
          searchForCompletedEmployees(user._id, search, page - 1);
        }
      }
    }
  };

  const nexts = () => {
    if (!window) {
      if (!employees.some((employee) => employee._id === lastEmployee._id)) {
        setPage(page + 1);
        if (search === '') {
          getPendingEmployees(user._id, page + 1);
        } else {
          searchForPendingEmployees(user._id, search, page + 1);
        }
      }
    } else {
      if (!employees.some((employee) => employee._id === lastEmployee._id)) {
        setPage(page + 1);
        if (search === '') {
          getCompletedEmployees(user._id, page + 1);
        } else {
          searchForCompletedEmployees(user._id, search, page + 1);
        }
      }
    }
  };

  const getSearch = (e) => {
    setSearch((search = e.target.value));
    if (!window) {
      if (search !== '') {
        setPage(1);
        searchForPendingEmployees(user._id, search, 1);
        getLastSearchPendingEmployee(user._id, search);
      } else {
        setPage(1);
        getPendingEmployees(user._id, 1);
        getLastPendingEmployee(user._id);
      }
    } else {
      if (search !== '') {
        setPage(1);
        searchForCompletedEmployees(user._id, search, 1);
        getLastSearchCompletedEmployee(user._id, search);
      } else {
        setPage(1);
        getCompletedEmployees(user._id, 1);
        getLastCompletedEmployee(user._id);
      }
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
    if (employees.some((employee) => employee._id === lastEmployee._id)) {
      return 'disabled';
    } else {
      return '';
    }
  };

  const getPending = () => {
    setPending('bg-white border border-bottom-0');
    setCompleted('bg-secondary border border-bottom-0 text-white');
    setWindow(false);
    getPendingEmployees(user._id, 1);
    getLastPendingEmployee(user._id);
    setSearch('');
  };

  const getCompleted = () => {
    setPending('bg-secondary border border-bottom-0 text-white');
    setCompleted('bg-white border border-bottom-0');
    setWindow(true);
    getCompletedEmployees(user._id, 1);
    getLastCompletedEmployee(user._id);
    setSearch('');
  };
  /*
  if (edited || created) {
    $('.edited').animate({ left: '+=50' }, 5000, () => {
      $('.edited').css({ left: 0 });
    });
  }
*/
  return loading ? (
    <div className='container-fluid vh-100'>
      <Spinner />
    </div>
  ) : (
    <div className='container-fluid vh-100 m-0 p-0 w-100'>
      <div className='row row-cols-1 p-0'>
        <div className='col p-0 w-100'>
          <Navbar />
        </div>
        <div
          className='col bg-light  d-flex flex-column p-0 vw-100'
          style={{ height: 175 }}
        >
          <div className='d-flex d-small w-100 h-100'>
            <h1 className='mt-review ml-5 pl-5 pb-2 font-weight-bold'>
              Reviews
            </h1>

            <div className='d-flex mt-review2 ml-auto mr-auto'>
              <div
                className={`mr-2 py-1 px-4 ${pending}`}
                role='button'
                onClick={() => getPending()}
              >
                Pending
              </div>

              <div
                className={`ml-2 border py-1 px-3 ${completed}`}
                role='button'
                onClick={() => getCompleted()}
              >
                Completed
              </div>
            </div>
          </div>

          <div
            style={{ position: 'absolute', height: 10, width: 150 }}
            className='edited'
          >
            <Alert />
          </div>
        </div>

        <div className='col d-flex justify-content-between mr-large mx-0 px-0 pt-4 pb-4 w-100'>
          <input
            className='ml-5 pl-2 rounded border border-secondary'
            type='search'
            name='search'
            value={search}
            placeholder='Search by name'
            style={{ width: 250, height: 34 }}
            onChange={(e) => getSearch(e)}
          />
        </div>
        <div className='col w-100'>
          {loadingEmployees ? (
            <Spinner />
          ) : (
            <div className='d-flex flex-column w-100'>
              <ul className='list-group list-group-flush w-100 position-small'>
                {employees.map((employee) => (
                  <EmployeesItems
                    key={uuidv4()}
                    employee={employee}
                    search={search}
                    page={page}
                    length={employees.length}
                    window={window}
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

Assigments.propTypes = {
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
  page: PropTypes.number.isRequired,
  getCompletedEmployees: PropTypes.func.isRequired,
  getLastCompletedEmployee: PropTypes.func.isRequired,
  searchForCompletedEmployees: PropTypes.func.isRequired,
  searchForPendingEmployees: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  employees: state.employees.employees,
  loadingEmployees: state.employees.loadingEmployees,
  lastEmployee: state.employees.lastEmployee,
  edited: state.employees.edited,
  created: state.employees.created,
  page: state.employees.page,
  getPendingEmployees: PropTypes.func.isRequired,
  getLastPendingEmployee: PropTypes.func.isRequired,
  getLastSearchPendingEmployee: PropTypes.func.isRequired,
  getLastSearchCompletedEmployee: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {
  getEmployees,
  getLastEmployee,
  searchForEmployees,
  getLastSearchEmployee,
  setAlert,
  setPage,
  getPendingEmployees,
  getLastPendingEmployee,
  getCompletedEmployees,
  getLastCompletedEmployee,
  searchForCompletedEmployees,
  searchForPendingEmployees,
  getLastSearchPendingEmployee,
  getLastSearchCompletedEmployee
})(Assigments);
