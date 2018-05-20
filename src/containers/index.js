import React from 'react'
import { connect } from 'react-redux'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {
  NavBar
} from 'antd-mobile'
import Cookies from 'js-cookie'


import BossDetail from '../containers/Boss/DetailInfo'
import BossList from '../containers/Boss/BossList'
import NiurenDetail from '../containers/NiuRen/DetailInfo'
import NiurenList from '../containers/NiuRen/NiurenList'
import Chat from '../containers/Chat'
import Message from '../containers/Message'
import Personal from '../containers/Personal'
import NotFound from '../components/NotFound'

import FootNavbar from '../components/NavBar'

import userAction from '../redux/action/userAction'
import { getRedirectPath } from '../utils/util'

// import { getAccessToken } from '../api/user'

import '../assets/styles/index.less'

class Main extends React.PureComponent {

  componentDidMount() {
    const { user } = this.props;
    // 获取cookie信息
    const userId = Cookies.get('user_id');
    if (userId && !user) {
      // 根据userId请求数据
      this.props.getUser(userId)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.getUserChats(nextProps.user._id)
  }

  navList = [
    {
      path: '/boss-info',
      component: NiurenList,
      title: '牛人列表',
      icon: 'niuren',
      text: '牛人'
    },
    {
      path: '/niuren-info',
      component: BossList,
      title: 'boss列表',
      icon: 'boss',
      text: 'boss'
    },
    {
      path: '/message',
      component: Message,
      title: '信息列表',
      icon: 'message',
      text: '信息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '个人中心',
      icon: 'personal',
      text: '个人'
    },
  ];


  render() {
    const { user, location: { pathname } } = this.props;
    // 获取cookie信息
    const userId = Cookies.get('user_id');

    // 如果有用户信息  根据用户信息重定向到对于界面
    if (user) {
      if (pathname === '/') {
        const path = getRedirectPath(user.role, user.avatar);
        return <Redirect to={path} />
      }
    } else {
      // 没有cookie信息  重定向到登录页面
      if (!userId) {
        return <Redirect to="/login" />
      }
      return null
    }

    const { navList } = this;

    const currentNav = navList.find(nav => nav.path === pathname);
    if (currentNav) {
      if (user.role === 0) {
        navList[0].hide = true
      } else {
        navList[1].hide = true
      }
    }

    return(
      <div className="main">
        {currentNav && <NavBar>{currentNav.title}</NavBar>}
        <div style={{ paddingTop: 45 }}>
          <Switch>
            {navList.map(nav => (
              <Route key={nav.path} path={nav.path} exact component={nav.component} />
            ))}
            <Route key="/boss" path="/boss" exact component={BossDetail} />
            <Route key="/niuren" path="/niuren" exact component={NiurenDetail} />
            <Route key="/chat" path="/chat/:userId" exact component={Chat} />
            <Route component={NotFound} />
          </Switch>
        </div>
        {currentNav && <FootNavbar navList={navList} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  errorMsg: state.userReducer.errorMsg,
});

const mapDispatchToProps = ({
  getUser: userAction.getUser,
  getUserChats: userAction.getUserChatList
});

export default connect(mapStateToProps, mapDispatchToProps)(Main)
