import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Button,
} from 'antd-mobile'

import userAction from '../../redux/action/userAction'

import { getRedirectPath } from '../../utils/util'

import Logo from '../../components/Logo'

class Login extends React.PureComponent {

  state = {
    userName: '',
    password: '',
  };

  handleUserNameChange = (userName) => {
    this.setState({
      userName
    })
  };
  handlePasswordChange = (password) => {
    this.setState({
      password
    })
  };
  handleLoginClick = () => {
    const { userName, password } = this.state;
    this.props.login(userName, password);
  };

  isLogin = () => {
    const { userName, password } = this.state;
    return !userName || !password
  };

  handleRegisterClick = () => {
    this.props.history.push('/register')
  };

  render() {
    const { isLogined, user: { role, avatar } } = this.props;
    if (isLogined) {
      const path = getRedirectPath(role, avatar);
      return <Redirect to={path}/>
    }
    return(
      <WingBlank>
        <Logo />
        <List>
          <InputItem
            placeholder="请输入用户名"
            onChange={(value) => this.handleUserNameChange(value)}
          >用户名</InputItem>
          <InputItem
            type="password"
            placeholder="请输入密码"
            onChange={(value) => this.handlePasswordChange(value)}
          >密码</InputItem>
        </List>
        <WhiteSpace />
        <Button type="primary" disabled={this.isLogin()} onClick={this.handleLoginClick}>登录</Button>
        <WhiteSpace />
        <Button type="primary" onClick={this.handleRegisterClick}>注册</Button>
      </WingBlank>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  isLogined: state.userReducer.isLogined,
});

const mapDispatchToProps = {
  login: userAction.login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
