import createReducer from '../../utils/createReducer'

const defaultState = () => ({
  user: '',
  errorMsg: '',
  userList: '',
  isLogined: false,
  message: '',
  userMapObj: '', // 存放用户信息{userId: {}}
  chatList: '',
  unReadCount: 0,
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
  message: action.payload
});

const receiveMsgSuccess = (state, action) => {
  const chat = action.payload;
  return {
    ...state,
    chatList: [...state.chatList, action.payload],
    unReadCount: state.unReadCount + !chat.read && chat.to === state.user._id ? 1 : 0
  }
};

const getUserChatsSuccess = (state, action) => {
  const { data: { users, chats } } = action.payload;
  return {
    ...state,
    userMapObj: users,
    chatList: chats,
    unReadCount: chats.reduce((preNum, chat) => preNum + (!chat.read && chat.to === state.user._id ? 1 : 0),0)
  }
};

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
