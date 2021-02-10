import React from 'react';
import Review from './Review';
//import Starts from '../layout/Stars';
//import EmployeeData from './EmployeeData';
//import { ProgressBar } from 'react-bootstrap';
//import EditEmployee from './EditEmployee';
//import DeleteEmployee from './DeleteEmployee';
//import AssingEmployees from './AssingEmployees';
import View from './View';
const EmployeesItems = ({ employee, search, page, length, window }) => {
  const avatar = (fullName) => {
    let first = fullName.substring(0, 1).toUpperCase();
    let index = fullName.indexOf(' ') + 1;
    let second = fullName.substring(index).slice(0, 1).toUpperCase();
    return first + ' ' + second;
  };

  return (
    <li className='list-group-item d-flex justify-content-between w-100  '>
      <div className='d-flex align-items-center'>
        <div className=''>
          <div
            className='img-fluid rounded-circle bg-danger text-white text-center d-flex align-items-center justify-content-center'
            style={{ width: 50, height: 50 }}
          >
            <strong>{avatar(employee.fullName)}</strong>
          </div>
        </div>
        <div className='d-flex flex-column ml-3' style={{ width: 155 }}>
          <h6 className='mb-0'>{employee.fullName}</h6>
          <small>{employee.workPosition}</small>
        </div>
      </div>
      {!window ? (
        <Review
          employee={employee}
          search={search}
          page={page}
          window={window}
        />
      ) : (
        <View employee={employee} />
      )}
    </li>
  );
};

EmployeesItems.propTypes = {};

export default EmployeesItems;
