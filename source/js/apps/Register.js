import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'components/Form';
import Input from 'components/Input';
import Alert from 'components/Alert';

import * as actionTypes from 'config/actionTypes';
import * as constants from 'config/constants';

const RegisterForm = Form.create({
  vertical: true
})(React.createClass({
  render() {
    const {
      form,
      onSubmit = () => null,
      dataSource
    } = this.props;

    const { simulate } = dataSource;

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

          {!simulate && form.getFieldDecorator(
            <Form.Item
              label="Api Key"
              required
              keyName="apiKey"
            >
              <Input type="text" />
            </Form.Item>
          )}

          {!simulate && form.getFieldDecorator(
            <Form.Item
              label="Secret Key"
              required
              keyName="secretKey"
            >
              <Input type="text" />
            </Form.Item>
          )}

          {form.getFieldDecorator(
            <Form.Item
              label="模拟账户"
              keyName="simulate"
            >
              <Input type="checkbox" />
            </Form.Item>
          )}
        </Form>

        <div className="actions">
          <div
            className="btn btn-primary"
            onClick={() => {
              let fileds = ['name', 'password'];

              if (!simulate) {
                fileds = fileds.concat(['apiKey', 'secretKey']);
              }

              if (form.validate(fileds)) {
                onSubmit();
              }
            }}
          >
            提交
          </div>
        </div>
      </div>
    )
  }
}));

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: {
        name: '',
        password: '',
        apiKey: '',
        secretKey: '',
        simulate: false
      }
    };
  }

  render() {
    const { dataSource } = this.state;
    const { modal } = this.props;

    return (
      <div>
        <h1>注册</h1>
        <RegisterForm
          dataSource={dataSource}
          onChange={(key, value) => this.setState({
            dataSource: {
              ...dataSource,
              [key]: value
            }
          })}
          onSubmit={() => this.props.dispatch({
            type: actionTypes.REGISTER,
            payload: dataSource
          })}
        />
        <Alert
          visible={modal
            && modal.modalType
              === constants.MODAL_TYPE_REGISTER_SUCC}
          onClose={() => this.props.dispatch({
            type: actionTypes.ROUTE_TO,
            payload: constants.PATHNAME_LOGIN
          })}
        >
          注册成功
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

export default connect(mapStateToProps)(Register);
