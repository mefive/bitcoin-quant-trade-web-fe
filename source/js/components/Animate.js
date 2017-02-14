import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import 'styles/components/animation.scss';

const INIT = 'init';
const MOUNTED = 'mounted';
const ANIMATED = 'animate';
const LEAVING = 'leaving';
const UMMOUNTED = 'ummounted';

class Animate extends Component {
  static propTypes = {
    enterClassName: PropTypes.string,
    leaveClassName: PropTypes.string,
    enterDuration: PropTypes.number,
    leaveDuration: PropTypes.number,
    activeClass: PropTypes.string
  }

  static defaultProps = {
    enterDuration: 200,
    leaveDuration: 200,
    activeClass: 'active'
  }

  constructor(props) {
    super(props);

    this.state = {
      status: INIT,
      children: this.props.children
        ? React.cloneElement(
            this.props.children,
          )
        : null
    };
  }

  // componentDidMount() {
  //   // setTimeout(
  //   //   () => this.setState({
  //   //     status: ANIMATED,
  //   //   }),
  //   //   this.props.enterDuration
  //   // );
  // }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.children && this.props.children) {
      this.setState({
        children: React.cloneElement(this.props.children),
        status: LEAVING
      });

      setTimeout(
        () => this.setState({
          status: UMMOUNTED,
        }),
        this.props.leaveDuration
      );
    }
    else if (nextProps.children && !this.props.children) {
      this.setState({
        status: INIT,
      });

      setTimeout(
        () => this.setState({
          status: ANIMATED,
        }),
        this.props.enterDuration
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.children && !prevProps.children) {
      setTimeout(
        () => this.setState({
          status: MOUNTED
        })
      );
    }
  }

  render() {
    const {
      enterClassName,
      leaveClassName,
      activeClass
    } = this.props;
    const { status } = this.state;

    let children = this.props.children;
    const className = [];

    if (status === LEAVING) {
      children = this.state.children;
      className.push(leaveClassName);
    }

    if (status === UMMOUNTED || !children) {
      return null;
    }

    if (status !== INIT) {
      className.push(activeClass);
    }

    if (status === MOUNTED) {
      className.push(enterClassName);
    }

    return React.cloneElement(
      children,
      {
        className: classNames(...className)
      }
    );
  }
}

export default Animate;
