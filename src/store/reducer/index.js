/** @format */

const INITIAL_STATE = {
  users: [],
  current_user: {},
  messages: [],
  chat_users_info: null,
  message_uid: '',
  canvas_open: false,
  signup_modal_open: false,
  signup_error_message: '',
  login_error_message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        users: action.payload
      };
    default:
  }
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        current_user: action.payload
      };
    default:
  }
  switch (action.type) {
    case 'GET_MESSAGES':
      return {
        ...state,
        messages: action.payload
      };
    default:
  }
  switch (action.type) {
    case 'CHAT_USERS_INFO':
      return {
        ...state,
        chat_users_info: action.payload
      };
    default:
  }
  switch (action.type) {
    case 'SET_MESSAGES_UID':
      return {
        ...state,
        message_uid: action.payload
      };
    default:
  }
  switch (action.type) {
    case 'CANVAS_OPEN':
      return {
        ...state,
        canvas_open: action.payload
      };
    default:
  }
  switch (action.type) {
    case 'SIGNUP_MODAL_OPEN':
      return {
        ...state,
        signup_modal_open: action.payload
      };
    default:
  }
  switch (action.type) {
    case 'SIGNUP_ERROR_MESSAGE':
      return {
        ...state,
        signup_error_message: action.payload
      };
    default:
  }
  switch (action.type) {
    case 'LOGIN_ERROR_MESSAGE':
      return {
        ...state,
        login_error_message: action.payload
      };
    default:
  }
  return state;
};
