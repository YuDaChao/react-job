import React from 'react'
import {
  connect
} from 'react-redux'
import {
  Result,
  WhiteSpace,
  List,
  Button,
  Modal
} from 'antd-mobile'
import Cookies from 'js-cookie'


import userAction from '../../redux/action/userAction'

import '../../assets/styles/index.less'

const Item = List.Item;
const alert = Modal.alert;

class Personal extends React.PureComponent {

  handleLogout = () => {
    // 移除cookie
    Cookies.remove('user_id');
    this.props.resetUser()
  };

  handleLogoutClick = () => (
    alert('退出', '确定要退出?', [
      { text: 'Cancel', onPress: () => {} },
      { text: 'Ok', onPress: () => this.handleLogout() },
    ])
  );

  baseInfo = (user) => {
    const { company, salary, post, info } = user;
    if (user && user.role === 1) {
      return[
        <Item key="post">
          <div className="term">招聘职位</div>
          <div className="desc">{post}</div>
        </Item>,
        <Item key="company">
          <div className="term">所属公司</div>
          <div className="desc">{company}</div>
        </Item>,
        <Item key="salary">
          <div className="term">薪资</div>
          <div className="desc">{salary}</div>
        </Item>,
        <Item key="info">
          <div className="term">职位简介</div>
        <div className="desc">{info}</div>
        </Item>
      ]
    } else {
      return[
        <Item key="post">
          <div className="term">招聘职位</div>
          <div className="desc">{post}</div>
        </Item>,
        <Item key="salary">
          <div className="term">期望薪资</div>
          <div className="desc">{salary}</div>
        </Item>,
        <Item key="info">
          <div className="term">个人简介</div>
          <div className="desc">{info}</div>
        </Item>
      ]
    }
  };
  render() {
    const { user } = this.props;

    return (
      <div>
        <Result
          img={<img src={user.avatar} alt="" />}
          title={user.userName}
          message={user.company}
        />
        <WhiteSpace/>
        <List
          renderHeader={() => '基本信息'}
        >
          {this.baseInfo(user)}
          <WhiteSpace size="lg"/>
          <Button type="warning" onClick={this.handleLogoutClick}>退出登录</Button>
        </List>
      </div>
    )
  }
}

const mapStateTopProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = ({
  resetUser: userAction.resetUser
});

export default connect(mapStateTopProps, mapDispatchToProps)(Personal)
