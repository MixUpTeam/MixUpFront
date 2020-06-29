import React from 'react';
import { useLocation, NavLink, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { Menu, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import APIManager from '../../services/APIManager';
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
          mode="horizontal"
          theme="dark"
          className={location.pathname === '/' && 'homeNavbar'}
        >
          <Menu.Item icon={<HomeOutlined />}>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </Menu.Item>

          {logStatus && (
            <Menu.Item disabled icon={<SettingOutlined />}>
              Profile
            </Menu.Item>
          )}

          {logStatus && (
            <Menu.Item
              className="newPlaylistNavlink"
              icon={<CustomerServiceOutlined />}
            >
              <NavLink
                className="importantLinkText"
                to="/new-playlist"
                activeClassName="active"
              >
                CREATE A PLAYLIST
              </NavLink>
            </Menu.Item>
          )}

          <Menu.Item disabled icon={<AppstoreOutlined />}>
            About
          </Menu.Item>
          <Menu.Item disabled icon={<MailOutlined />}>
            Contact
          </Menu.Item>

          {logStatus && (
            <Menu.Item icon={<LogoutOutlined />}>
              <NavLink type="button" onClick={disconnection} to="/">
                Logout
              </NavLink>
            </Menu.Item>
          )}

          {!logStatus && (
            <Menu.Item icon={<UserOutlined />}>
              <NavLink to="/sign_in" activeClassName="active">
                Sign in
              </NavLink>
            </Menu.Item>
          )}

          {!logStatus && (
            <Menu.Item icon={<UserOutlined />}>
              <NavLink to="/sign_up" activeClassName="active">
                Sign up
              </NavLink>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
