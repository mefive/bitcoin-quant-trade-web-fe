import React, { Component, PropTypes } from 'react';
import ReactDOM, {
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom';

import Portal from './Portal';
import Animate from './Animate';

class Trigger extends Component {
  static propTypes = {
    popover: PropTypes.element,
    active: PropTypes.bool,
    onActiveChange: PropTypes.func,
    disabled: PropTypes.bool,
    enterClassName: PropTypes.string,
    leaveClassName: PropTypes.string
  }

  static defaultProps = {
    onActiveChange: () => null
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      anchorRect: {},
      containerRect: {}
    }

    this.tryToggle = ::this.tryToggle;
  }

  componentDidUpdate(prevProps, prevState) {
    const active = this.props.active == null
      ? this.state.active : this.props.active;

    const prevActive = prevProps.active == null
      ? prevState.active : prevProps.active;

    if (active && !prevActive) {
      // show
      this.setState({
        anchorRect:
          ReactDOM.findDOMNode(this).getBoundingClientRect()
      });
      document.addEventListener('click', this.tryToggle);
    }
    else if (!active && prevActive) {
      // hide
      document.removeEventListener('click', this.tryToggle);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.tryToggle);
  }

  tryToggle(e) {
    if (
      !ReactDOM.findDOMNode(this.refs.popover)
        .contains(e.target)
    ) {
      this.toggle();
    }
  }

  toggle() {
    if (this.props.disabled) {
      return;
    }

    let active = this.props.active;

    if (active == null) {
      active = this.state.active;
      this.setState({ active: !active });
    }

    this.props.onActiveChange(!active);
  }

  render() {
    const active = this.props.active == null
      ? this.state.active : this.props.active;

    const { enterClassName, leaveClassName } = this.props;

    const { anchorRect, containerRect } = this.state;

    const child = React.Children.only(this.props.children);

    return React.createElement(
      child.type,
      {
        ...child.props,
        onClick: ::this.toggle
      },
      ...React.Children.toArray(child.props.children),
      <Animate
        enterClassName={enterClassName}
        leaveClassName={leaveClassName}
        enterDuration={enterClassName ? undefined : 0}
        leaveDuration={leaveClassName ? undefined : 0}
      >
      {active && (
        <Portal
          onContainerChange={container => this.setState({
            containerRect: container.parentNode.getBoundingClientRect()
          })}
        >
          {React.cloneElement(
            this.props.popover,
            {
              containerRect,
              anchorRect,
              ref: 'popover'
            }
          )}
        </Portal>
      )}
      </Animate>
    );
  }
}

export default Trigger;
