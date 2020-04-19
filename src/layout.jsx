// in src/MyLayout.js
import React from 'react';
import { Layout } from 'react-admin';
import menu from './menu.jsx';
import { Sidebar } from 'react-admin';
import MyAppBar from './appBar.jsx';
const MySidebar = props => <Sidebar {...props} size={500} />;

export const MyLayout = (props) => {
  console.log('props', props)
  return <Layout {...props} menu={menu} sidebar={MySidebar} appBar={MyAppBar} />;
}
