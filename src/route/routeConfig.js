
import Login from '../containers/Login'
import Register from '../containers/Register'


const routeConfig = [
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
