import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Form, Input, Button, message } from 'antd';
import Cookies from 'js-cookie';

import APIManager from 'services/APIManager';
import { cookieName } from '../../constants';

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

  const Connection = (userInput) => {
    const sendConnectionRequest = async () => {
      try {
        const res = await APIManager.connectUser({
          user: { ...userInput },
        });
        Cookies.set(
          cookieName,
          {
            token: res.headers.authorization,
            userInfo: res.data,
          },
          { expires: 6 }
        );
        dispatch(setConnection());
        dispatch(setProfile(res.data));
        history.push('/new-playlist');
        message.success('Hey there, welcome back!', 3);
      } catch (error) {
        console.error(error);
        return message.error(
          'An error occurred, please verify your email/password and retry.',
          3
        );
      }
    };
    sendConnectionRequest();
  };

  const onFinish = (values) => {
    Connection(values);
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
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please provide an email.',
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
              message: 'Please provide a password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Connect
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogIn;
