import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Form from 'components/Form';
import Input from 'components/Input';
import Alert from 'components/Alert';

import * as actionTypes from 'config/actionTypes';
import * as constants from 'config/constants';

import 'styles/apps/login.scss';

const LoginForm = Form.create(
  { vertical: true }
)(React.createClass({
  render() {
    const {
      form,
      onSubmit = () => null,
    } = this.props;

    return (
      <div>
        <Form>
          {form.getFieldDecorator(
            <Form.Item
              label="用户名"
              required
              keyName="name"
            >
              <Input type="text" />
            </Form.Item>
          )}

          {form.getFieldDecorator(
            <Form.Item
              label="密码"
              required
              keyName="password"
            >
              <Input type="password" />
            </Form.Item>
          )}
        </Form>

        <div className="actions">
          <div
            className="btn btn-primary"
            onClick={() => {
              if (form.validate()) {
                console.log('onSubmit');
                onSubmit();
              }
            }}
          >
            登录
          </div>

          <Link>
            注册
          </Link>
        </div>
      </div>
    )
  }
}))

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: {
        name: '',
        password: ''
      }
    };
  }

  render() {
    const { dataSource } = this.state;
    const { modal } = this.props;

    let code = 0;

    if (modal
      && modal.modalType === constants.MODAL_TYPE_LOGIN_ERROR
    ) {
      code = modal.data;
    }

    return (
      <div id="login">
        <div>
          <h1>登录</h1>
          <LoginForm
            dataSource={dataSource}
            onChange={(key, value) => this.setState({
              dataSource: {
                ...dataSource,
                [key]: value
              }
            })}
            onSubmit={() => this.props.dispatch({
              type: actionTypes.LOGIN,
              payload: {
                user: dataSource
              }
            })}
          />
        </div>
        <Alert
          onClose={() => {
            if (code === 500) {
              this.setState({
                dataSource: {
                  ...this.state.dataSource,
                  password: ''
                }
              });
            }

            this.props.dispatch({
              type: actionTypes.POP_MODAL
            });
          }}
          visible={!!code}
        >
          {!!code && (() => {
            if (code === 404) {
              return '没有该用户';
            }
            else if (code === 500) {
              return '密码错误';
            }
          })()}
        </Alert>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { modal } = state;

  return {
    modal: modal.current
  };
}

export default connect(mapStateToProps)(Login);
