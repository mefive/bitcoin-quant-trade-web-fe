import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import 'styles/components/modal.scss';

import Portal from './Portal';
import Animate from './Animate';

class Modal extends Component {
  static propTypes = {
    title: PropTypes.string,
    hasCloseButton: PropTypes.bool,
    className: PropTypes.string,
    onClose: PropTypes.func,
    demension: PropTypes.object,
    visible: PropTypes.bool
  }

  static defaultProps = {
    onClose: () => null,
    hasCloseButton: true,
    visible: false
  }

  constructor(props) {
    super(props);

    this.state = {
      marginLeft: 0,
      marginTop: 0
    };
  }

  componentDidMount() {
    this.pin();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      this.pin();
    }
  }

  pin() {
    if (!this.props.visible) {
      return;
    }

    const { dialog } = this.refs;

    this.setState({
      marginLeft: -0.5 * dialog.offsetWidth,
      marginTop: -0.5 * dialog.offsetHeight
    });
  }

  render() {
    const {
      className,
      title,
      hasCloseButton,
      onClose,
      children,
      visible
    } = this.props;

    const { marginTop, marginLeft } = this.state;

    return (
      <Animate
        enterClassName="enter"
        enterDuration={200}
        leaveClassName="leave"
        leaveDuration={200}
      >
      {visible && (
        <Portal>
          <div
            className={classNames(
              'modal',
              { [className]: !!className }
            )}
          >
            <div className="modal-mask" />

            <div
              className="modal-dialog"
              style={{
                marginLeft, marginTop
              }}
              ref="dialog"
            >
            {title && (
              <div className="dialog-header">
              {hasCloseButton && (
                <i
                  className="icon icon-times-circle-o close"
                  onClick={onClose}
                />
              )}
                <h3>{title}</h3>
              </div>
            )}

              <div className="dialog-body">
                {children}
              </div>
            </div>
          </div>
        </Portal>
      )}
      </Animate>
    );
  }
}

export default Modal;
