import createAsyncAction from '../../utils/createAsyncAction'

function login() {
  return createAsyncAction('GET_USER', () => (
    Promise.resolve({
      data: {userName: 'happyu'}
    })
  ))
}

export default {
  login
}
