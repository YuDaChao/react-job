
import Login from '../containers/Login'
import Register from '../containers/Register'
import Main from '../containers'


const routeConfig = [
  {
    path: '/',
    exact: true,
    component: Main
  },
  {
    path: '/login',
    exact: true,
    component: Login
  },
  {
    path: '/register',
    exact: true,
    component: Register
  },
];

export default routeConfig
