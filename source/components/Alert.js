import React, { Component, PropTypes } from 'react';

import Modal from './Modal';

class Alert extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    confirmText: PropTypes.string,
    hasCloseButton: PropTypes.bool,
    title: PropTypes.string,
    visible: PropTypes.bool
  }

  static defaultProps = {
    onClose: () => null,
    confirmText: '确定',
    hasCloseButton: true,
    visible: false
  }

  render() {
    const {
      onClose,
      hasCloseButton,
      children,
      confirmText,
      title,
      visible
    } = this.props;

    return (
      <Modal
        onClose={onClose}
        hasCloseButton={hasCloseButton}
        title={title}
        visible={visible}
      >
        <div className="dialog-content">
          {children}
        </div>

        <div className="dialog-actions">
          <div
            className="btn btn-primary"
            onClick={onClose}
          >
            {confirmText}
          </div>
        </div>
      </Modal>
    );
  }
}

export default Alert;