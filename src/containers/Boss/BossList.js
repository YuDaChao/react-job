import React from 'react'
import { connect } from 'react-redux'

import UserItem from '../../components/UserItem'

import userAction from '../../redux/action/userAction'

class BossList extends React.PureComponent {

  componentDidMount() {
    const {user: { role }} = this.props;
    const id = role === 0 ? 1 : 0;
    this.props.getUserList(id)
  }

  render() {
    const { userList } = this.props;
    return (
      <UserItem userList={userList || []}/>
    )
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user,
  userList: state.userReducer.userList
});

const mapDispatchToProps = ({
  getUserList: userAction.getUserList
});

export default connect(mapStateToProps, mapDispatchToProps)(BossList)
