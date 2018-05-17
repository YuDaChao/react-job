import createReducer from '../../utils/createReducer'

const defaultState = () => ({
  user: '',
  errorMsg: ''
});

const getUserSuccess = (state, action) => ({
  ...state,
  user: action.payload.data
});

/**
 * 用户注册成功
 * @param state
 * @param action
 * @returns {{user: string|*}}
 */
const registerSuccess = (state, action) => ({
  ...state,
  user: action.payload.data
});

/**
 * 用户注册失败
 * @param state
 * @param action
 * @returns {{user: string|*}}
 */
const registerFailure = (state, action) => ({
  ...state,
  errorMsg: action.payload
});

export default createReducer(defaultState, {
  GET_USER_SUCCESS: getUserSuccess,
  REGISTER_SUCCESS: registerSuccess,
  REGISTER_ERROR: registerFailure,
})
