import React from 'react'
import { connect } from 'react-redux'
import {
  NavBar,
  List,
  InputItem
} from 'antd-mobile'

import userAction from '../../redux/action/userAction'

import '../../assets/styles/index.less'

const Item = List.Item;

class Chat extends React.PureComponent {

  state = {
    content: ''
  };

  handleClick = () => {
    const { user, match: { params: { userId } } } = this.props;
    const { content } = this.state;
    const from = user._id;
    const to = userId;
    if (content.trim()) {
      this.props.sendMsg({from, to, content});
      this.setState({
        content: ''
      })
    }
  };

  handleChange = (content) => {
    this.setState({
      content
    })
  };

  handleRenderItem = (msgList) => {
    const { userMapObj, user, match: { params: { userId } } } = this.props;
    let items = [];
    msgList.forEach((msg, index) => {
      if (msg.from === userId) { // 对方
        items.push(
          <Item
            key={`${msg.chat_id}_${index}`}
            thumb={<img src={userMapObj[userId].avatar} alt="" />}
          >
            {msg.content}
          </Item>
        )
      } else {
        items.push(
          <Item
            key={`${msg.chat_id}_${index}`}
            className="am-list-item-me"
            extra={<img src={user.avatar} alt=""/>}
          >
            {msg.content}
          </Item>
        )
      }
    });
    return items
  };

  render() {

    const { userMapObj, chatList, user, match: { params: { userId } } } = this.props;

    if (!userMapObj) {
      return null
    }

    // 得到当前和我聊天的userId
    const me = user._id;
    const targetId = userId;

    const id = [me, targetId].sort().join("_");

    // 得到聊天列表
    const msgList = chatList.filter(msg => msg.chat_id === id);

    const items = this.handleRenderItem(msgList);

    return (
      <div className="main">
        <NavBar>{userMapObj[targetId].userName}</NavBar>
        <List>
          {items}
        </List>
        <div
          className="am-tab-bar"
        >
          <InputItem
            placeholder="请输入..."
            value={this.state.content}
            onChange={this.handleChange}
            extra={
              <span onClick={this.handleClick}>发送</span>
            }
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  userMapObj: state.userReducer.userMapObj,
  chatList: state.userReducer.chatList,
});

const mapDispatchToProps = ({
  sendMsg: userAction.sendMsg,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
