import {
  GET_EMPLOYEES_ERROR,
  GET_EMPLOYEES,
  LOADING_EMPLOYEES,
  LAST_EMPLOYEE,
  GET_LAST_EMPLOYEE_ERROR,
  GET_LAST_SEARCH,
  GET_LAST_SEARCH_ERROR,
  SEARCH_EMPLOYEE,
  SEARCH_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE,
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
  REVIEW_SUCCESS,
  GET_COMMENTS,
  GET_COMMENTS_ERROR,
  GET_LAST_COMMENT_ERROR,
  LAST_COMMENT,
  LOADING_COMMENTS,
  ASSIGMENT_SUCCESS
} from '../actions/types';

const initialState = {
  employees: [],
  loadingEmployees: true,
  lastEmployee: {},
  edited: false,
  deleted: false,
  loadingAssingSearch: true,
  assingSearchEmployees: [],
  addAssingEmployees: [],
  assingned: true,
  created: false,
  page: 1,
  comments: [],
  lastComment: {},
  loadingComments: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EMPLOYEES:
    case SEARCH_EMPLOYEE:
      return {
        ...state,
        loadingEmployees: false,
        employees: payload
      };

    case GET_COMMENTS:
      return {
        ...state,
        loadingComments: false,
        comments: payload
      };

    case LAST_COMMENT:
      return {
        ...state,
        lastComment: payload
      };

    case LAST_EMPLOYEE:
    case GET_LAST_SEARCH:
      return {
        ...state,
        lastEmployee: payload
      };

    case EDIT_EMPLOYEE:
      return {
        ...state,
        edited: true,
        employees: state.employees.map((employee) =>
          employee.user === payload.user ? payload : employee
        )
      };

    case EDITED:
      return {
        ...state,
        edited: false
      };

    case DELETED:
      return {
        ...state,
        deleted: false
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        deleted: true,
        employees: state.employees.filter(
          (employee) => employee.user !== payload
        )
      };

    case ASSIGMENT_SUCCESS:
      return {
        ...state
      };

    case ASSING_SEARCH_EMPLOYEE:
      return {
        ...state,
        loadingAssingSearch: false,
        assingSearchEmployees: payload
      };

    case ASSING_SEARCH_LOADING:
      return {
        ...state,
        loadingAssingSearch: true
      };

    case ADD_ASSING_EMPLOYEE:
      return {
        ...state,
        addAssingEmployees: [...state.addAssingEmployees, JSON.parse(payload)],
        assingSearchEmployees: [],
        loadingAssingSearch: true,
        assingned: false
      };

    case ASSINGNED:
      return {
        ...state,
        assingned: true
      };

    case CLEAR_ASSING_EMPLOYEE:
      return {
        ...state,
        addAssingEmployees: [],
        loadingAssingSearch: true
      };

    case DELETE_ASSING_EMPLOYEE:
      return {
        ...state,
        addAssingEmployees: state.addAssingEmployees.filter(
          (employee) => employee.user !== payload
        )
      };

    case CREATED: {
      return {
        ...state,
        created: false
      };
    }

    case CREATE_USER: {
      return {
        ...state,
        employees: [payload, ...state.employees],
        created: true
      };
    }

    case SET_PAGE: {
      return {
        ...state,
        page: payload
      };
    }

    case REVIEW_SUCCESS: {
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee._id !== payload
        )
      };
    }

    case GET_LAST_COMMENT_ERROR:
    case CREATE_USER_ERROR:
    case ASSING_SEARCH_ERROR:
    case DELETE_EMPLOYEE_ERROR:
    case EDIT_EMPLOYEE_ERROR:
    case GET_EMPLOYEES_ERROR:
    case GET_LAST_EMPLOYEE_ERROR:
    case GET_LAST_SEARCH_ERROR:
    case SEARCH_EMPLOYEE_ERROR:
      return {
        ...state,
        error: payload,
        loadingEmployees: false
      };

    case GET_COMMENTS_ERROR:
      return {
        ...state,
        loadingComments: false
      };
    case LOADING_EMPLOYEES:
      return {
        ...state,
        loadingEmployees: true
      };

    case LOADING_COMMENTS:
      return {
        ...state,
        loadingComments: true
      };
    default:
      return state;
  }
}
