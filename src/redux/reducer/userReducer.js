import createReducer from '../../utils/createReducer'

const defaultState = () => ({
  user: '',
  errorMsg: '',
  userList: '',
  isLogined: false,
  message: '',
  userMapObj: '', // 存放用户信息{userId: {}}
  chatList: ''
});

const getUserSuccess = (state, action) => ({
  ...state,
  isLogined: action.payload.isLogined,
  user: action.payload.data
});

const getUserListSuccess = (state, action) => ({
  ...state,
  userList: action.payload.data
});

const getUserFailure = (state, action) => ({
  ...state,
  errorMsg: action.payload
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

/**
 * 发送消息
 * @param state
 * @param action
 * @returns {{message}}
 */
const sendMsgSuccess = (state, action) => ({
  ...state,
  message: action.payload.data
});

const receiveMsgSuccess = (state, action) => ({
  ...state,
  chatList: [...state.chatList, action.payload]
});

const getUserChatsSuccess = (state, action) => ({
  ...state,
  userMapObj: action.payload.data.users,
  chatList: action.payload.data.chats,
});

export default createReducer(defaultState, {
  GET_USER_SUCCESS: getUserSuccess,
  GET_USER_LIST_SUCCESS: getUserListSuccess,
  GET_USER_ERROR: getUserFailure,
  REGISTER_SUCCESS: registerSuccess,
  REGISTER_ERROR: registerFailure,
  GET_MSG_SUCCESS: sendMsgSuccess,
  GET_USER_CHATS_SUCCESS: getUserChatsSuccess,
  RECEIVE_MSG_SUCCESS: receiveMsgSuccess,
})
