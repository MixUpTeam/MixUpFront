import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '../../assets/scss/forms.scss';

import { Form, Input, Button, message } from 'antd';
import Cookies from 'js-cookie';

import APIManager from '../../services/APIManager';
import { cookieName } from '../../constants';
import { setProfile, setConnection } from '../../redux';

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 6,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 9,
    span: 16,
  },
};

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const Inscription = (userInput) => {
    const sendRegistrationRequest = async () => {
      try {
        const res = await APIManager.registerUser({
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
        message.success('Hey there, welcome to MixUp!', 3);
      } catch (error) {
        console.error(error);
        return message.error(
          'An error occurred. The email might already has a MixUp account.',
          3
        );
      }
    };
    sendRegistrationRequest();
  };

  const onFinish = (values) => {
    Inscription({ ...values, email: values.email.toLowerCase() });
  };

  return (
    <>
      <div className="forms">
        <h1>Sign up</h1>
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
                message: 'Please provide an email!',
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
                message: 'Please choose a password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <p className="authDirection">
          Already have an account? Sign in <Link to="/sign_in">here</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
