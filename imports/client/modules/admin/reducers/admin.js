// user state pattern
// {
//   users: {
//     `${id}`: {
//       firstName: string,
//       lastName: string,
//       email: string,
//       role: string,
//       isChanging: bool,
//       error: bool,
//     },
//   },
// }

const initialAdminState = {
  users: {},
  isChanging: false,
};

const initialUserState = {
  isChanging: false,
  error: false,
  inviteModal: false,
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case 'ROLE_CHANGE_REQUEST':
    case 'REMOVE_USER_REQUEST':
      return Object.assign({}, state, {
        isChanging: false,
        error: false,
      });
    case 'ROLE_CHANGE_ERROR':
    case 'REMOVE_USER_ERROR':
      return Object.assign({}, state, {
        isChanging: false,
        error: true,
      });
    case 'ROLE_CHANGE_SUCCESS':
      return Object.assign({}, state, {
        role: action.role,
        isChanging: false,
        error: false,
      });
    default:
      return state;
  }
};

const users = (state = {}, action) => {
  switch (action.type) {
    case 'ROLE_CHANGE_REQUEST':
    case 'ROLE_CHANGE_ERROR':
    case 'ROLE_CHANGE_SUCCESS':
    case 'REMOVE_USER_REQUEST':
    case 'REMOVE_USER_ERROR':
      return Object.assign({}, state, {
        [action.id]: user(state.id, action),
      });
    case 'REMOVE_USER_SUCCESS': {
      const newState = state;
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

export default (state = initialAdminState, action) => {
  switch (action.type) {
    case 'ROLE_CHANGE_REQUEST':
    case 'REMOVE_USER_REQUEST':
      return Object.assign({}, state, {
        users: users(state.users, action),
        isChanging: true,
      });
    case 'ROLE_CHANGE_ERROR':
    case 'ROLE_CHANGE_SUCCESS':
    case 'REMOVE_USER_ERROR':
    case 'REMOVE_USER_SUCCESS':
      return Object.assign({}, state, {
        users: users(state.users, action),
        isChanging: false,
      });
    case 'OPEN_NEW_USER_MODAL':
      return Object.assign({}, state, {
        newUserModal: true,
      });
    case 'CLOSE_NEW_USER_MODAL':
      return Object.assign({}, state, {
        newUserModal: false,
      });
    case 'OPEN_INVITE_MODAL':
      return Object.assign({}, state, {
        inviteModal: true,
      });
    case 'CLOSE_INVITE_MODAL':
      return Object.assign({}, state, {
        inviteModal: false,
      });
    default:
      return state;
  }
};
