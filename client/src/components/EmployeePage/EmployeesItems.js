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
  return (
    <li className='list-group-item d-flex justify-content-between w-100  '>
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
