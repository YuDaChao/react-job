import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import routeConfig from './routeConfig'

export default class RouteMap extends React.Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          {routeConfig.map(route => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
          ))}
        </Switch>
      </BrowserRouter>
    )
  }
}
