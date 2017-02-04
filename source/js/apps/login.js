import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'components/Form';
import Input from 'components/Input';

import * as actionTypes from 'config/actionTypes';

import 'styles/apps/login.scss';

const LoginForm = Form.create(
  { vertical: true }
)(React.createClass({
  render() {
    const {
      form,
      onSubmit = () => null,
      onGetKey = () => null
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
              label="ApiKey"
              required
              keyName="apiKey"
            >
              <Input type="text" />
            </Form.Item>
          )}

          {form.getFieldDecorator(
            <Form.Item
              label="SecretKey"
              required
              keyName="secretKey"
            >
              <Input type="text" />
            </Form.Item>
          )}
        </Form>

        <div className="actions">
          <div
            className="btn btn-primary"
            onClick={onSubmit}
          >
            登录
          </div>

          <div
            className="btn btn-primary"
            onClick={onGetKey}
          >
            获取Key
          </div>
        </div>
      </div>
    )
  }
}))

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: { ...this.props.user }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        dataSource: { ...nextProps.user }
      });
    }
  }

  render() {
    const { dataSource } = this.state;

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
            onGetKey={() => this.props.dispatch({
              type: actionTypes.FETCH_LOGIN_USER,
              payload: {
                name: dataSource.name
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { login } = state;

  return {
    user: login.user
  };
}

export default connect(mapStateToProps)(Login);
