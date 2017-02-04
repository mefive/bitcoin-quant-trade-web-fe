import React, { Component } from 'react';

import Form from 'components/Form';
import Input from 'components/Input';

import 'styles/apps/login.scss';

const LoginForm = Form.create(
  { vertical: true }
)(React.createClass({
  render() {
    const { form, onSubmit = () => null } = this.props;

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
            onClick={() => {
              if (!form.validate()) {
                onSubmit();
              }
            }}
          >
            登录
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
      dataSource: {
        name: '',
        apiKey: '',
        secretKey: ''
      }
    };
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
                ...this.state.dataSource,
                [key]: value
              }
            })}
          />
        </div>
      </div>
    );
  }
}

export default Login;
