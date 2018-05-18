import React from 'react'
import {connect} from "react-redux";
import {
  NavBar,
  InputItem,
  List,
  TextareaItem,
  Button
} from 'antd-mobile'

import AvatarList from '../../components/AvatarList'
import userAction from "../../redux/action/userAction";


class DetailInfo extends React.PureComponent {
  state = {
    avatar: '',
    post: '',
    salary: '',
    info: ''
  };

  handleClick = (item) => {
    this.setState({
      avatar: item.icon
    })
  };

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  };

  handleSaveClick = () => {
    this.props.completeUserInfo(this.state)
  };

  isSave = () => {
    const { avatar, post, salary, info } = this.state;
    return !avatar || !post || !salary || !info
  };

  render() {
    return [
      <div key="top" style={{ minHeight: '100%' }}>
        <div style={{ paddingBottom: 47}}>
          <NavBar>牛人信息完善</NavBar>
          <AvatarList clickItem={this.handleClick}/>
          <List>
            <InputItem
              placeholder="请输入求职岗位"
              onChange={(value) => this.handleChange('post', value)}
            >求职岗位</InputItem>
            <InputItem
              placeholder="请输期望薪资"
              onChange={(value) => this.handleChange('salary', value)}
            >期望薪资</InputItem>
            <TextareaItem
              row={3}
              autoHeight
              title="个人介绍"
              placeholder="请输入个人介绍"
              onChange={(value) => this.handleChange('info', value)}
            />
          </List>
        </div>
      </div>,
      <Button
        key="bottom"
        type="primary"
        style={{ marginTop: -47}}
        disabled={this.isSave()}
        onClick={this.handleSaveClick}
      >
        保存
      </Button>
    ]
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = ({
  completeUserInfo: userAction.complete
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailInfo)
