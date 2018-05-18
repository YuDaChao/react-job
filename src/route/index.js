import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Main from '../containers'

import routeConfig from './routeConfig'

export default class RouteMap extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route key="index" path="/" render={() => <Redirect to="/login" />} exact />,
          {routeConfig.map(route => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
          ))}
          <Route key="main" component={Main} />
        </Switch>
      </BrowserRouter>
    )
  }
}
