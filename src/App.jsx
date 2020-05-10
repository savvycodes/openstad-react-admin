import React from 'react';
//import logo from './logo.svg';
import './App.less';
import { Admin, Resource, fetchUtils} from 'react-admin';
import { Route } from 'react-router-dom';
import simpleRestProvider from 'ra-data-simple-rest';
import { ArticleList, ArticleEdit, ArticleCreate, ArticleIcon } from './resources/article.jsx';
import { OrderList, OrderEdit, OrderCreate, OrderIcon } from './resources/order.jsx';
import { UserList, UserEdit, UserCreate, UserIcon } from './resources/user.jsx';
import { IdeaList, IdeaEdit, IdeaCreate, IdeaIcon } from './resources/idea.jsx';
import { ProductList, ProductEdit, ProductCreate, ProductIcon } from './resources/product.jsx';
import { VoteList, VoteEdit, VoteCreate, VoteIcon } from './resources/vote.jsx';
import { ArgumentList, ArgumentEdit, ArgumentCreate, ArgumentIcon } from './resources/argument.jsx';

import { SettingsForm } from './profile.jsx';
import { MyLayout } from './layout.jsx';
import Dashboard from './Dashboard.jsx';
import dataProvider from './dataProvider';
import { connect } from 'react-redux';
import themeReducer from './themeReducer';

import { createMuiTheme } from '@material-ui/core/styles';

import theme from './theme';

/*
customRoutes={[
    <Route exact path={userPath} render={() => <SettingsForm />} />,
]}
 */

function OpenstadReactAdmin(props) {
  const resources = props.resources;
  const user = props.user;
  const userPath = "/user/" + user.id;
  console.log('props', props.displayAppBar)

  return (
    <Admin
        dashboard={Dashboard}
        theme={theme}
        dataProvider={dataProvider(props.restApi.url, props.jwt)}
        appLayout={MyLayout}
        customReducers={{ theme: themeReducer }}
    >
      {resources.product && resources.product.active ? <Resource name="product" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={ProductIcon} options={{menuTitle: 'Producten', imageApiUrl: props.imageApi.url}} /> : <div />}
      {resources.order && resources.order.active ? <Resource name="order" list={OrderList} edit={OrderEdit} create={OrderCreate} icon={OrderIcon} options={{menuTitle: 'Bestellingen'}} /> : <div />}
      {resources.idea && resources.idea.active ?  <Resource name="idea" list={IdeaList} edit={IdeaEdit} create={IdeaCreate} icon={IdeaIcon} options={{menuTitle: 'Plannen'}} />  : <div />}
      {resources.article && resources.article.active ?  <Resource name="article" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} icon={ArticleIcon} />  : <div />}
      {resources.argument && resources.argument.active ? <Resource name="argument" list={ArgumentList} edit={ArgumentEdit} create={ArgumentCreate} icon={ArgumentIcon} options={{menuTitle: 'Argumenten'}} /> : <div />}
      {resources.vote && resources.vote.active ? <Resource name="vote" list={VoteList} edit={VoteEdit} create={VoteCreate} icon={VoteIcon} options={{menuTitle: 'Stemmen'}} /> : <div />}
      {resources.user && resources.user.active ? <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} options={{menuTitle: 'Gebruikers',userPath: userPath}} /> : <div />}
    </Admin>
  );
}

export default OpenstadReactAdmin;
