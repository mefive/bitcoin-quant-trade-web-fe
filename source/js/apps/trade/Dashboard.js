import React, { Component } from 'react';
import classNames from 'classnames';

const HIGHER = 'higher';
const LOWER = 'lower';
const EQUAL = 'equal';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trend: EQUAL
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentLast = this.props.ticker.last;
    const nextLast = nextProps.ticker.last;

    if (currentLast !== nextLast && currentLast !== 0) {
      let trend = EQUAL;

      if (nextLast > currentLast) {
        trend = HIGHER;
      }
      else if (nextLast < currentLast) {
        trend = LOWER;
      }

      this.setState({ trend });
    }
  }

  render() {
    const { user, ticker } = this.props;
    const { trend } = this.state;

    return (
      <div className="panel dashboard">
        <div className="row">
          当前价格：
          <strong
            className={classNames({
              'higher': trend === HIGHER,
              'lower': trend === LOWER
            })}
          >
            {trend === HIGHER && (
              <i className="icon icon-arrow-up" />
            )}

            {trend === LOWER && (
              <i className="icon icon-arrow-down" />
            )}

            ￥{ticker.last.toFixed(2)}
          </strong>
        </div>

        <div className="row">
          总资产：
          <span>￥{user.asset.total.toFixed(2)}</span>
        </div>

        <div className="row">
          可用资金：
          <span>￥{user.free.cny}</span>
        </div>

        <div className="row">
          可用比特币：
          <span>
            {user.free.btc} 个（￥{(user.free.btc * ticker.last).toFixed(2)}）
          </span>
        </div>
      </div>
    );
  }
}

export default Dashboard;
