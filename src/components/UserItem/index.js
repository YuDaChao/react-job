import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
  Card,
  WhiteSpace,
  WingBlank,
  List,
} from 'antd-mobile'

import '../../assets/styles/index.less'

const Brief = List.Item.Brief;

class UserItem extends React.Component {

  static propTypes = {
    userList: PropTypes.array.isRequired
  };

  render() {
    const { userList } = this.props;

    return(
      <WingBlank size="lg" style={{ paddingBottom: 50}}>
        {userList.map(u => ([
          <WhiteSpace key={`WhiteSpace-top-${u._id}`} size="lg" />,
            <Card
              key={`Card-${u._id}`}
              onClick={() => this.props.history.push(`/chat/${u._id}`)}
            >
              <Card.Header
                thumb={<img src={u.avatar} alt="" />}
                extra={<span>{u.userName}</span>}
              />
              <Card.Body>
                <Brief key="post">
                  <div className="term">{u.role === 0 ? '应聘职位' : '招聘职位'}</div>
                  <div className="desc">{u.post}</div>
                </Brief>
                {u.role === 1 && (
                  <Brief key="company">
                    <div className="term">所属公司</div>
                    <div className="desc">{u.company}</div>
                  </Brief>
                )}
                <Brief key="salary">
                  <div className="term">{u.role === 0 ? '期望薪资' : '薪资'}</div>
                  <div className="desc">{u.salary}</div>
                </Brief>
                <Brief key="info">
                  <div className="term">{u.role === 0 ? '个人简介' : '职位简介'}</div>
                  <div className="desc">{u.info}</div>
                </Brief>
              </Card.Body>
            </Card>,
        ]))}
      </WingBlank>
    )
  }
}

export default withRouter(UserItem)
