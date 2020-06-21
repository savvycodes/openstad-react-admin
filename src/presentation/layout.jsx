// in src/MyLayout.js
import React from 'react';
import { Layout,Sidebar } from 'react-admin';
import menu from './menu.jsx';

//Setup
import AdminAppBar from './appBar.jsx';
const AdminSideBar = props => <Sidebar {...props} size={500} />;

export const MyLayout = (props) => {
  return <Layout {...props} menu={menu} sidebar={AdminSideBar} appBar={AdminAppBar} />;
}
