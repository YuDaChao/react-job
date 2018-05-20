import React from 'react'
import { connect } from 'react-redux'

import {
  List
} from 'antd-mobile'

const Item = List.Item;

class Message extends React.PureComponent {
  render() {
    return (
      <div>
        <List>
          <Item/>
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userMapObj: state.userReducer.userMapObj,
  chatList: state.userReducer.chatList,
});


export default connect(mapStateToProps)(Message)
