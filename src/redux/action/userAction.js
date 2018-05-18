import createAsyncAction from '../../utils/createAsyncAction'
import { signUp, signIn, completeUserInfo } from '../../api/user'

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

export default {
  login,
  register,
  complete
}
