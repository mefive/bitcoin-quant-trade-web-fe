import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import 'styles/components/select.scss';

import Trigger from './Trigger';
import Popover from './Popover';

class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ]),
    optionsHeight: PropTypes.number,
    getPopoverContainer: PropTypes.func,
    title: PropTypes.string,
    defaultTitle: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    optionsHeight: 200,
    defaultTitle: '请选择',
    onChange: () => null
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      triggerWidth: 0
    };
  }

  componentDidMount() {
    this.setState({
      triggerWidth:
        this.refs.trigger.getBoundingClientRect().width
    });
  }

  changeActive(active) {
    this.setState({ active });
  }

  getTitle() {
    const { value, options, multiple, getTitle, defaultTitle } = this.props;

    let option, title;

    if (multiple) {
      option = options.filter(i => value.indexOf(i.value) !== -1);

      title = option.map(i => i.title).join(',');
    }
    else {
      option = options.find(i => i.value === value);
      title = option ? option.title : '';
    }

    return title || defaultTitle;
  }

  select(value) {
    const { value: old, onChange } = this.props;

    if (value !== old) {
      onChange(value);
    }

    this.changeActive(false);
  }

  render() {
    const {
      className,
      width,
      multiple,
      optionsHeight,
      options,
      value,
      title,
      disabled
    } = this.props;
    const { active, triggerWidth } = this.state;

    return (
      <Trigger
        active={active}
        disabled={disabled}
        enterClassName="slide-down-in"
        leaveClassName="slide-down-out"
        popover={
          <Popover
            placement="bottom"
            offset={5}
            className={classNames(
              'select-popup'
            )}
          >
            <div
              style={{
                height: multiple ? optionsHeight : null,
                maxHeight: multiple ? null : optionsHeight,
                width: triggerWidth
              }}
            >
              <div
                className="wrapper"
                style={{
                  height: multiple ? optionsHeight - 32 : null,
                  maxHeight: multiple ? null : optionsHeight
                }}
              >
                <ul>
                {options && options.map(i => (
                  <li
                    key={i.value}
                    className={classNames(
                      { 'active': i.value === value }
                    )}
                    onClick={() => this.select(i.value)}
                  >
                  {multiple && i.value === value && (
                    <i className="icon icon-check"></i>
                  )}

                  {i.title}
                  </li>
                ))}
                </ul>
              </div>

            {multiple && (
              <div className="actions">
                <div
                  className="btn btn-sm btn-primary"
                >
                  确定
                </div>
              </div>
            )}
            </div>
          </Popover>
        }
        onActiveChange={::this.changeActive}
      >
        <div
          className={classNames(
            'select',
            { [className]: !!className }
          )}
          style={{
            width: width || null
          }}
        >
          <div
            className={classNames(
              'select-trigger',
              { 'active': active }
            )}
            ref="trigger"
          >
            {title || this.getTitle()}

            <i className="icon icon-caret-down" />
          </div>
        </div>
      </Trigger>
    );
  }
}

export default Select;
