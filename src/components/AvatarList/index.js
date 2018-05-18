import React from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import {
  List,
  Grid,
} from 'antd-mobile'

import './styles/index.less'

export default class AvatarList extends React.PureComponent {

  static propTypes = {
    clickItem: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.avatarList = this.handleLoadAvatars();
  }

  handleLoadAvatars = () => {
    let avatarList = [];
    for(let i = 1; i <= 20; i++) {
      avatarList.push({
        text: `头像${i}`,
        icon: require(`../../assets/images/头像${i}.png`)
      })
    }
    return avatarList
  };

  handleClick = (item) => {
    this.setState({
      text: item.text
    });
    this.props.clickItem(item)
  };

  render() {
    const { text } = this.state;
    return (
      <List renderHeader={() => "请选择头像"} className="avatar-list">
        <Grid
          columnNum={5}
          data={this.avatarList}
          onClick={this.handleClick}
          renderItem={dataItem => (
            <div className="am-grid-item-inner-content column-num-5" style={{ position: 'relation'}}>
              <img className="am-grid-icon" src={dataItem.icon} alt="" />
              <div className="am-grid-text">
                {dataItem.text}
              </div>
              {text === dataItem.text && <div className="am-grid-shade"></div>}
            </div>
          )}
        />
      </List>
    )
  }
}
