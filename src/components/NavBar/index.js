import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  TabBar
} from 'antd-mobile'

const Item = TabBar.Item;


class FootNavbar extends React.PureComponent {

  static propsTypes = {
    navList: PropTypes.array.isRequired
  };

  render() {
    let { navList, location: { pathname } } = this.props;
    navList = navList.filter(nav => !nav.hide);
    return(
      <TabBar>
        {navList.map(nav => (
          <Item
            key={nav.path}
            title={nav.text}
            icon={{uri: require(`./images/${nav.icon}.png`)}}
            selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}}
            selected={pathname === nav.path}
            onPress={() => {
              this.props.history.replace(nav.path)
            }}
          />
        ))}
      </TabBar>
    )
  }
}

export default withRouter(FootNavbar)
