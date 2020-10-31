import React from 'react';
import Starts from '../layout/Stars';
import EmployeeData from './EmployeeData';
import { ProgressBar } from 'react-bootstrap';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';
import AssingEmployees from './AssingEmployees';
const EmployeesItems = ({ employee, search, page, length }) => {
  return (
    <li className='list-group-item d-flex justify-content-between w-100 '>
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

        <Starts rate={employee.skill.result} />
      </div>
      <div className='d-flex align-items-center'>
        <div
          style={{ position: 'relative' }}
          className='d-flex flex-column justify-content-center'
        >
          <ProgressBar
            style={{ width: 250, height: 20 }}
            now={
              (100 * employee.completedReviews.length) /
              employee.pendingReviews.length
            }
            className='ml-3'
          />
          <span style={{ position: 'absolute' }} className='align-self-center'>
            {employee.completedReviews.length} /{' '}
            {employee.pendingReviews.length}
          </span>
        </div>
        <div className='ml-3'>
          <AssingEmployees
            employee={employee}
            page={page}
            searchEmployee={search}
          />
        </div>
        <div className='ml-3'>
          <EmployeeData employee={employee} rate={5} />
        </div>

        <div className='ml-3'>
          <EditEmployee employee={employee} />
        </div>

        <div className='ml-3'>
          <DeleteEmployee
            employee={employee}
            search={search}
            page={page}
            length={length}
          />
        </div>
      </div>
    </li>
  );
};

EmployeesItems.propTypes = {};

export default EmployeesItems;
