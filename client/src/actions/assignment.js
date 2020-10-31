import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_EMPLOYEES,
  LOADING_EMPLOYEES,
  LAST_EMPLOYEE,
  SEARCH_EMPLOYEE,
  GET_LAST_SEARCH,
  REVIEW_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GET_LAST_EMPLOYEE_ERROR,
  GET_LAST_SEARCH_ERROR,
  SEARCH_EMPLOYEE_ERROR
} from './types';

//Get  pending Employees ASINGNED

export const getPendingEmployees = (employeeId, page) => async (dispatch) => {
  dispatch({
    type: LOADING_EMPLOYEES
  });
  const body = {
    employeeId: employeeId,
    page: page
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/assignment/get/pendings`, body, config);
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_EMPLOYEES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Pending Employees by search
export const searchForPendingEmployees = (employeeId, fullName, page) => async (
  dispatch
) => {
  dispatch({
    type: LOADING_EMPLOYEES
  });
  const body = {
    employeeId: employeeId,
    fullName: fullName,
    page: page
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `/api/assignment/search/pending`,
      body,
      config
    );

    dispatch({
      type: SEARCH_EMPLOYEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get completed  Employees ASINGNED

export const getCompletedEmployees = (employeeId, page) => async (dispatch) => {
  dispatch({
    type: LOADING_EMPLOYEES
  });
  const body = {
    employeeId: employeeId,
    page: page
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/assignment/get/completed`, body, config);
    dispatch({
      type: GET_EMPLOYEES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_EMPLOYEES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get completed Employees by search
export const searchForCompletedEmployees = (
  employeeId,
  fullName,
  page
) => async (dispatch) => {
  dispatch({
    type: LOADING_EMPLOYEES
  });
  const body = {
    employeeId: employeeId,
    fullName: fullName,
    page: page
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `/api/assignment/search/completed`,
      body,
      config
    );

    dispatch({
      type: SEARCH_EMPLOYEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Last Pending Employee

export const getLastPendingEmployee = (employeeId) => async (dispatch) => {
  const body = {
    employeeId: employeeId
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/assignment/last/pending`, body, config);
    dispatch({
      type: LAST_EMPLOYEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LAST_EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Last Pending Search Employee

export const getLastSearchPendingEmployee = (employeeId, name) => async (
  dispatch
) => {
  const body = {
    employeeId: employeeId,
    fullName: name
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/assignment/search/lastPending`,
      body,
      config
    );
    dispatch({
      type: GET_LAST_SEARCH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LAST_SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Last completed Employee

export const getLastCompletedEmployee = (employeeId) => async (dispatch) => {
  const body = {
    employeeId: employeeId
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `/api/assignment/last/completed`,
      body,
      config
    );
    dispatch({
      type: LAST_EMPLOYEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LAST_EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Last completed Search Employee

export const getLastSearchCompletedEmployee = (employeeId, name) => async (
  dispatch
) => {
  const body = {
    employeeId: employeeId,
    fullName: name
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/assignment/search/lastCompleted`,
      body,
      config
    );
    dispatch({
      type: GET_LAST_SEARCH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LAST_SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Loading Employees

export const loadingEmployees = () => async (dispatch) => {
  dispatch({
    type: LOADING_EMPLOYEES
  });
};
/*
//Get a Employee by id

export const getEmployee = (id) => async (dispatch) => {
  const _id = id;
  try {
    const res = await axios.get(`/api/employees/getEmployee/${_id}`);
    dispatch({
      type: GET_EMPLOYEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
*/

//send pending to completed

export const sendPendingToCompleted = (
  search,
  page,
  id,
  employeeId,
  assingId,
  attitude,
  productivity,
  communication,
  initiative,
  growth,
  innovation,
  dependability,
  comment
) => async (dispatch) => {
  const body = {
    employeeId: employeeId,
    assingId: assingId,
    attitude: attitude,
    communication: communication,
    growth: growth,
    dependability: dependability,
    productivity: productivity,
    initiative: initiative,
    innovation: innovation,
    comment: comment
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    await axios.post(`/api/assignment/completed`, body, config);

    dispatch({
      type: REVIEW_SUCCESS,
      payload: id
    });

    if (search === '') {
      dispatch(getPendingEmployees(employeeId, page));
      dispatch(getLastPendingEmployee(employeeId));
    } else {
      dispatch(searchForPendingEmployees(employeeId, search, page));
      dispatch(getLastSearchPendingEmployee(employeeId, search));
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
