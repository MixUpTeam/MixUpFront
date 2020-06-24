import React from 'react';
import { useLocation, NavLink, Link, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { Menu, Button, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import APIManager from 'services/APIManager';
import { cookieName } from '../../constants';

import { removeConnection, removeProfile } from '../../redux';

import './styles.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logStatus = useSelector((state) => state.log.user_connected);
  const location = useLocation();

  const disconnection = () => {
    const sendDisconnectRequest = async () => {
      try {
        await APIManager.disconnectUser();
        history.push('/');
        Cookies.remove(cookieName);
        dispatch(removeConnection());
        dispatch(removeProfile());
        history.push('/');
        message.success('Hope to see you soon!', 3);
      } catch (error) {
        console.error(error);
        return message.error('An error occurred, please retry.', 3);
      }
    };
    sendDisconnectRequest();
  };

  return (
    <>
      <div>
        <Menu
          key="menu1"
          mode="horizontal"
          theme="dark"
          className={location.pathname === '/' && 'homeNavbar'}
        >
          <Menu.Item key="4" icon={<HomeOutlined />}>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5" disabled icon={<AppstoreOutlined />}>
            About
          </Menu.Item>
          <Menu.Item key="6" disabled icon={<MailOutlined />}>
            Contact
          </Menu.Item>

          {logStatus ? (
            <Menu.Item key="7" disabled icon={<SettingOutlined />}>
              Profile
            </Menu.Item>
          ) : (
            <Menu.Item key="8" icon={<UserOutlined />}>
              <NavLink to="/register" activeClassName="active">
                Sign up
              </NavLink>
            </Menu.Item>
          )}

          {logStatus ? (
            <Menu.Item key="9" icon={<LogoutOutlined />}>
              <NavLink type="button" onClick={disconnection} to="/">
                Logout
              </NavLink>
            </Menu.Item>
          ) : (
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to="/login">Sign in</NavLink>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
