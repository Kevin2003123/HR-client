import React from 'react';
import Starts from '../layout/Stars';
import EmployeeData from './EmployeeData';
import { ProgressBar } from 'react-bootstrap';
import EditEmployee from './EditEmployee';
import DeleteEmployee from './DeleteEmployee';
import AssingEmployees from './AssingEmployees';
const EmployeesItems = ({ employee, search, page, length }) => {
  const avatar = (fullName) => {
    let first = fullName.substring(0, 1).toUpperCase();
    let index = fullName.indexOf(' ') + 1;
    let second = fullName.substring(index).slice(0, 1).toUpperCase();
    return first + ' ' + second;
  };
  return (
    <li className='list-group-item d-flex justify-content-between w-100 '>
      <div className='d-flex align-items-center'>
        <div>
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
