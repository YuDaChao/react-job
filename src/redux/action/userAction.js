import io from 'socket.io-client'
import createAsyncAction from '../../utils/createAsyncAction'
import {
  signUp,
  signIn,
  completeUserInfo,
  getUserById,
  getUsersByRole,
  getUserChats
} from '../../api/user'

function initIO(dispatch, userId) {
  if (!io.scoket) {
    io.scoket = io('ws://localhost:8000');
    io.scoket.on('receiveMsg', function (msg) {
      if (userId === msg.from || userId === msg.to) {
        dispatch(receiveMsg(msg))
      }
    })
  }
}

function login(userName, password) {
  return createAsyncAction('GET_USER', () => {
    return signIn(userName, password)
  })
}

function register(userInfo) {
  return createAsyncAction('REGISTER', () => {
    return signUp(userInfo)
  })
}

function complete(userInfo) {
  return createAsyncAction('REGISTER', () => {
    return completeUserInfo(userInfo)
  })
}

function getUser(userId) {
  return createAsyncAction('GET_USER', () => {
    return getUserById(userId)
  })
}

function resetUser() {
  return createAsyncAction('GET_USER', () => (
    Promise.resolve({data: '', isLogined: false})
  ))
}

function getUserList(role) {
  return createAsyncAction('GET_USER_LIST', () => {
    return getUsersByRole(role)
  })
}

function getUserChatList(userId) {
  const name = 'GET_USER_CHATS';
  const meta = {};
  return (dispatch) => {
    dispatch({
      type: `${name}_REQUEST`,
    });

    try {
      return getUserChats()
        .then((value) => {
          const action = {
            type: `${name}_SUCCESS`,
            payload: value,
          };
          dispatch(action);
          initIO(dispatch, userId);
          return action;
        })
        .catch((err) => {
          const action = {
            meta,
            type: `${name}_ERROR`,
            payload: err,
            error: true,
          };
          dispatch(action);
          return action;
        });
    } catch (err) {
      const action = {
        meta,
        type: `${name}_ERROR`,
        payload: err,
        error: true,
      };

      dispatch(action);
      return Promise.resolve(action);
    }
  };
  // return createAsyncAction('GET_USER_CHATS', () => {
  //   console.log('getUserChatList....')
  //   initIO(userId);
  //   return getUserChats()
  // })
}

function receiveMsg(msg) {
  return createAsyncAction('RECEIVE_MSG', () => {
    return Promise.resolve(msg)
  })
}

function sendMsg(msg) {
  return createAsyncAction('GET_MSG', () => {
    return new Promise((resolve, reject) => {
      // 发消息
      io.scoket.emit('sendMsg', msg);
      resolve("")
    })
  })
}


export default {
  login,
  register,
  complete,
  getUser,
  resetUser,
  getUserList,
  sendMsg,
  getUserChatList
}
