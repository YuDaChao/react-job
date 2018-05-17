import createAsyncAction from '../../utils/createAsyncAction'
import { signUp, signIn } from '../../api/user'

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

export default {
  login,
  register
}
