import React from 'react'
import { connect} from 'react-redux'
import {
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Button,
  Radio,
  Flex
} from 'antd-mobile'

import userAction from '../../redux/action/userAction'

import Logo from '../../components/Logo'

import './styles/index.less'

const RadioItem = Radio.RadioItem;

class Register extends React.PureComponent {

  state = {
    roleValue: 0
  };

  componentDidMount() {
    this.props.login();
  }

  handleRoleChange = (value) => {
    this.setState({
      roleValue: value
    })
  };

  render() {
    const { roleValue } = this.state;
    const roles = [
      { value: 0, label: '大神'},
      { value: 1, label: '老板'},
    ];
    return(
      <WingBlank className="register">
        <Logo />
        <List>
          <InputItem
            placeholder="请输入用户名"
          >用户名</InputItem>
          <InputItem
            type="password"
            placeholder="请输入密码"
          >密码</InputItem>
          <InputItem
            type="password"
            placeholder="确认密码"
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
        <Button type="primary">注册</Button>
        <a href="/login" className="account">使用已有账号登录</a>
      </WingBlank>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = {
  login: userAction.login
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)
