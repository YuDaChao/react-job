import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  NavBar,
  InputItem,
  List,
  TextareaItem,
  Button
} from 'antd-mobile'

import userAction from '../../redux/action/userAction'

import AvatarList from '../../components/AvatarList'

class DetailInfo extends React.Component {

  state = {
    avatar: '',
    post: '',
    company: '',
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
    const { avatar, post, company, salary, info } = this.state;
    return !avatar || !post || !company || !salary || !info
  };

  render() {
    const { user } = this.props;
    if (user && user.avatar) {
      return <Redirect to="/boss-info" />
    }
    return [
      <div key="top" style={{ minHeight: '100%' }}>
        <div style={{ paddingBottom: 47}}>
          <NavBar>boss信息完善</NavBar>
          <AvatarList clickItem={this.handleClick}/>
          <List>
            <InputItem
              placeholder="请输入招聘职位"
              onChange={(value) => this.handleChange('post', value)}
            >招聘职位</InputItem>
            <InputItem
              placeholder="请输入公司名称"
              onChange={(value) => this.handleChange('company', value)}
            >公司名称</InputItem>
            <InputItem
              placeholder="请输职位薪资"
              onChange={(value) => this.handleChange('salary', value)}
            >职位薪资</InputItem>
            <TextareaItem
              row={3}
              autoHeight
              title="职位要求"
              placeholder="请输入职位要求"
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
