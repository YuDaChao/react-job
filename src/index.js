import React from 'react'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import { render } from 'react-dom'

import RouteMap from './route'
import createAppStore from './redux/store/createAppStore'

const history = createBrowserHistory();
const store = createAppStore(history);

render(
  <Provider store={store}>
    <RouteMap/>
  </Provider>,
  document.getElementById('root')
);
