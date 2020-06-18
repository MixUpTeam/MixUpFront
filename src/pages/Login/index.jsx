import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Form, Input, Button, message } from 'antd';
import Cookies from 'js-cookie';

import { setConnection, setProfile } from '../../redux';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

const LogIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const Connection = ({ email, password }) => {
    const data = {
      email,
      password,
    };

    fetch('https://form-you-back.herokuapp.com/users/sign_in.json', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((user) => ({
          jwt: response.headers.get('Authorization'),
          user,
        }))
      )
      .then((result) => {
        console.log(result);
        if (!result.jwt) {
          message.error('Check your logs', 3);
        } else {
          message.success('Profile well login', 3);
          Cookies.set('token', { jwt: result.jwt }, { expires: 7 });
          dispatch(setConnection());
          dispatch(setProfile(result));
          history.push('/');
        }
      })
      .catch((error) => console.error(error));
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    Connection(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogIn;
