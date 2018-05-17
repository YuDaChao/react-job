import React from 'react'
import { connect } from 'react-redux'
import {
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Button,
} from 'antd-mobile'

import Logo from '../../components/Logo'

class Login extends React.PureComponent {

  state = {
    roleValue: 0
  };

  handleRegisterClick = () => {
    this.props.history.push('/register')
  };

  render() {

    return(
      <WingBlank>
        <Logo />
        <List>
          <InputItem
            placeholder="请输入用户名"
          >用户名</InputItem>
          <InputItem
            type="password"
            placeholder="请输入密码"
          >密码</InputItem>
        </List>
        <WhiteSpace />
        <Button type="primary">登录</Button>
        <WhiteSpace />
        <Button type="primary" onClick={this.handleRegisterClick}>注册</Button>
      </WingBlank>
    )
  }
}

export default connect()(Login)
