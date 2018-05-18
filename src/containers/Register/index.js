import React from 'react'
import { connect} from 'react-redux'
import {
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Button,
  Radio,
  Toast,
  Flex,
} from 'antd-mobile'

import userAction from '../../redux/action/userAction'

import Logo from '../../components/Logo'

import './styles/index.less'

const RadioItem = Radio.RadioItem;

class Register extends React.PureComponent {

  state = {
    hasError: false,
    roleValue: 0,
    userName: '',
    password: '',
    rePassword: ''
  };

  handleRoleChange = (value) => {
    this.setState({
      roleValue: value
    })
  };

  handleUserNameChange = (userName) => {
    this.setState({
      userName
    })
  };
  handlePasswordChange = (password) => {
    const { rePassword, hasError } = this.state;
    this.setState({
      password
    });
    if (rePassword === password && hasError) {
      this.setState({
        hasError: false
      })
    }
  };
  handleRePasswordChange = (rePassword) => {
    const { password } = this.state;
    this.setState({
      rePassword
    });
    if (password !== rePassword) {
      this.setState({
        hasError: true
      })
    } else {
      this.setState({
        hasError: false
      })
    }
  };

  handleErrorClick = () => {
   this.showMessage('fail', '两次密码不一致！')
  };

  handleRegisterClick = () => {
    const { userName, password, rePassword, roleValue } = this.state;
    this.props.register({userName, password, rePassword, roleValue});
  };

  isRegister = () => {
    const { userName, password, rePassword, hasError } = this.state;
    return !userName || !password || !rePassword || hasError
  };

  showMessage = (type, message) => {
    if (type === 'info') {
      Toast.info(message)
    }
    if (type === 'fail') {
      Toast.fail(message)
    }
  };

  render() {
    const { roleValue, hasError } = this.state;
    const { user } = this.props;
    const roles = [
      { value: 0, label: '大神'},
      { value: 1, label: '老板'},
    ];
    if (user) {
      if (user.roleValue === "0") {
        this.props.history.push('/')
      } else {
        this.props.history.push('/boss')
      }
    }
    return(
      <WingBlank className="register">
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
          <InputItem
            type="password"
            placeholder="确认密码"
            error={hasError}
            onErrorClick={this.handleErrorClick}
            onChange={(value) => this.handleRePasswordChange(value)}
          >确认密码</InputItem>
          <Flex>
            <span className="role">角色</span>
            {roles.map(role => (
              <Flex.Item  key={role.value}>
                <RadioItem checked={roleValue === role.value} onChange={() => this.handleRoleChange(role.value)}>
                  {role.label}
                </RadioItem>
              </Flex.Item>
            ))}
          </Flex>
        </List>
        <WhiteSpace />
        <Button type="primary" disabled={this.isRegister()} onClick={this.handleRegisterClick}>注册</Button>
        <a href="/login" className="account">使用已有账号登录</a>
      </WingBlank>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  errorMsg: state.userReducer.errorMsg
});

const mapDispatchToProps = {
  register: userAction.register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)
