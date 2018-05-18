import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'


import BossDetail from '../containers/Boss/DetailInfo'
import NiurenDetail from '../containers/NiuRen/DetailInfo'

class Main extends React.PureComponent {
  render() {
    return(
      <Switch>
        <Route path="/boss" exact component={BossDetail} />
        <Route path="/niuren" exact component={NiurenDetail} />
      </Switch>
    )
  }
}

export default Main
