import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EMPLOYEES,
  GET_EMPLOYEES_ERROR,
  LOADING_EMPLOYEES,
  LAST_EMPLOYEE,
  GET_LAST_EMPLOYEE_ERROR,
  SEARCH_EMPLOYEE,
  SEARCH_EMPLOYEE_ERROR,
  GET_LAST_SEARCH,
  GET_LAST_SEARCH_ERROR,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_ERROR,
  EDITED,
  DELETED,
  ASSING_SEARCH_EMPLOYEE,
  ASSING_SEARCH_ERROR,
  ASSING_SEARCH_LOADING,
  CLEAR_ASSING_EMPLOYEE,
  ADD_ASSING_EMPLOYEE,
  ASSINGNED,
  DELETE_ASSING_EMPLOYEE,
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATED,
  SET_PAGE,
  GET_COMMENTS,
  GET_COMMENTS_ERROR,
  LAST_COMMENT,
  GET_LAST_COMMENT_ERROR,
  LOADING_COMMENTS,
  ASSIGMENT_SUCCESS
} from './types';

//Get Employees

export const getEmployees = (page) => async (dispatch) => {
  dispatch({
    type: LOADING_EMPLOYEES
  });

  const body = JSON.stringify({ page });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/adminPage`, body, config);

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

export const getLastEmployee = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/adminPage/last/employee`, config);

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

//Get Employees by search
export const searchForEmployees = (fullName, page) => async (dispatch) => {
  dispatch({
    type: LOADING_EMPLOYEES
  });

  const body = JSON.stringify({
    fullName,
    page
  });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/adminPage/search`, body, config);

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

//Get Last Search Employee

export const getLastSearchEmployee = (fullName) => async (dispatch) => {
  const body = JSON.stringify({
    fullName
  });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/adminPage/lastSearch`, body, config);
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

//Edit Employee
export const editEmployee = (
  employeeId,
  name,
  lastName,
  birthday,
  email,
  phone,
  mobilePhone,
  address,
  workPosition
) => async (dispatch) => {
  const body = JSON.stringify({
    employeeId,
    name,
    lastName,
    birthday,
    email,
    phone,
    mobilePhone,
    address,
    workPosition
  });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/adminPage/edit/employee`, body, config);
    dispatch({
      type: EDIT_EMPLOYEE,
      payload: res.data
    });
    dispatch(setAlert('Edit Success', 'success'));
    dispatch({ type: EDITED });
  } catch (err) {
    dispatch({
      type: EDIT_EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//set Page

export const setPage = (page) => async (dispatch) => {
  try {
    dispatch({ type: SET_PAGE, payload: page });
  } catch (error) {
    console.log(error);
  }
};

//Delete Employee
export const deleteEmployee = (employeeId, search, page, length) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/adminPage/delete/employee/${employeeId}`);

    dispatch({
      type: DELETE_EMPLOYEE,
      payload: employeeId
    });

    if (search === '') {
      dispatch(getEmployees(page));
      dispatch(getLastEmployee());
    } else {
      dispatch(searchForEmployees(search, page));
      dispatch(getLastSearchEmployee(search));
    }

    dispatch({
      type: DELETED
    });
  } catch (err) {
    dispatch({
      type: DELETE_EMPLOYEE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Employees and assing by search
export const searchAssingEmployees = (fullName) => async (dispatch) => {
  const body = {
    fullName: fullName
  };

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    dispatch({ type: ASSING_SEARCH_LOADING });
    const res = await axios.post(`/api/adminPage/assing/search`, body, config);

    dispatch({
      type: ASSING_SEARCH_EMPLOYEE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ASSING_SEARCH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//clear  assing employees
export const clearAssingEmployees = () => async (dispatch) => {
  dispatch({ type: CLEAR_ASSING_EMPLOYEE });
};

//add Assing Employee

export const addAssingEmployees = (add) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ASSING_EMPLOYEE, payload: add });
    dispatch({ type: ASSINGNED });
  } catch (error) {
    console.log(error);
  }
};

//delete Assing Employee

export const deleteAssingEmployees = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ASSING_EMPLOYEE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//Create Employee
export const createEmployee = (
  name,
  lastName,
  birthday,
  email,
  phone,
  mobilePhone,
  address,
  workPosition
) => async (dispatch) => {
  const body = JSON.stringify({
    name,
    lastName,
    birthday,
    email,
    phone,
    mobilePhone,
    address,
    workPosition
  });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/adminPage/createUser`, body, config);
    console.log('error found');
    dispatch({
      type: CREATE_USER,
      payload: res.data
    });

    dispatch(setAlert('Create Success', 'success'));
    dispatch({ type: CREATED });
  } catch (err) {
    dispatch({
      type: CREATE_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get Employees

export const getComments = (employeeId, page) => async (dispatch) => {
  dispatch({
    type: LOADING_COMMENTS
  });

  const body = JSON.stringify({ employeeId, page });

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(`/api/adminPage/comments`, body, config);

    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_COMMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getLastComment = (employeeId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ employeeId });
  try {
    const res = await axios.post(`/api/adminPage/lastComment`, body, config);

    dispatch({
      type: LAST_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_LAST_COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Assing to pending

export const assingToPending = (employeeId, assingId, page, search) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({
    employeeId,
    assingId
  });

  try {
    const res = await axios.post(`/api/assignment/pending`, body, config);
    dispatch({ type: ASSIGMENT_SUCCESS, payload: res.data });
    dispatch(setAlert('Assing Success', 'success'));

    if (search === '') {
      dispatch(getEmployees(page));
      dispatch(getLastEmployee());
    } else {
      dispatch(searchForEmployees(search, page));
      dispatch(getLastSearchEmployee(search));
    }
  } catch (err) {
    const error = err.response.data.msg;
    dispatch(setAlert(error, 'danger'));
  }
};
