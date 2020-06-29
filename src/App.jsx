import React from 'react';
import './App.less';
import { Admin, Resource} from 'react-admin';
import { ArticleList, ArticleEdit, ArticleCreate, ArticleIcon } from './resources/article.jsx';
import { TagList, TagEdit, TagCreate, TagIcon } from './resources/tag.jsx';
import { OrderList, OrderEdit, OrderCreate, OrderIcon } from './resources/order.jsx';
import { UserList, UserEdit, UserCreate, UserIcon } from './resources/user.jsx';
import { IdeaList, IdeaEdit, IdeaCreate, IdeaIcon } from './resources/idea';
import { ProductList, ProductEdit, ProductCreate, ProductIcon } from './resources/product.jsx';
import { VoteList, VoteIcon } from './resources/vote';
import { ArgumentList, ArgumentEdit, ArgumentCreate, ArgumentIcon } from './resources/argument.jsx';
import { SiteEdit } from './resources/site';
import { NewsletterSignupList, NewsletterSignupIcon } from './resources/newslettersignup.jsx';


import { SettingsForm } from './profile.jsx';

/* presentation elements */
import { MyLayout } from './presentation/layout.jsx';
import Dashboard from './Dashboard.jsx';
import dataProvider from './dataProvider';
import { connect } from 'react-redux';
import themeReducer from './themeReducer';

import { createMuiTheme } from '@material-ui/core/styles';

import theme from './theme';
import { AreaList } from './resources/area/list';
import { AreaCreate, AreaEdit, AreaIcon } from './resources/area';

/*
customRoutes={[
]}
 */

export const OpenstadReactAdmin = (props) => {
  const resources = props.resources;
  const user = props.user;
  const userPath = "/user/" + user.id;

  return (
    <Admin
        dashboard={Dashboard}
        theme={theme}
        dataProvider={dataProvider(props.restApi.url, props.jwt, props.siteKey, props.csrf)}
        appLayout={MyLayout}
        customReducers={{ theme: themeReducer }}
    >
      {resources.site && resources.site.active ? <Resource name="site" edit={SiteEdit}  icon={ProductIcon} options={{menuTitle: 'Sites', hideMenulink:true, siteId: props.site.id}} /> : <div />}
      {resources.product && resources.product.active ? <Resource name="product" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={ProductIcon} options={{menuTitle: 'Producten', imageApiUrl: props.imageApi.url}} /> : <div />}
      {resources.order && resources.order.active ? <Resource name="order" list={OrderList} edit={OrderEdit} create={OrderCreate} icon={OrderIcon} options={{menuTitle: 'Bestellingen'}} /> : <div />}
      {resources.idea && resources.idea.active ?  <Resource name="idea" list={IdeaList} edit={IdeaEdit} create={IdeaCreate} icon={IdeaIcon} options={{menuTitle: 'Plannen', imageApiUrl: props.imageApi.url}} />  : <div />}
      {resources.area && resources.area.active ?  <Resource name="area" list={AreaList} edit={AreaEdit} create={AreaCreate} icon={AreaIcon} options={{menuTitle: 'Polygonen'}} />  : <div />}
      {resources.article && resources.article.active ?  <Resource name="article" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} icon={ArticleIcon} options={{menuTitle: 'Artikelen'}} />  : <div />}
      {resources.tag && resources.tag.active ?  <Resource name="tag" list={TagList} edit={TagEdit} create={TagCreate} icon={TagIcon} options={{menuTitle: 'Tags'}}  />  : <div />}
      {resources.argument && resources.argument.active ? <Resource name="argument" list={ArgumentList} edit={ArgumentEdit} create={ArgumentCreate} icon={ArgumentIcon} options={{menuTitle: 'Argumenten'}} /> : <div />}
      {resources.vote && resources.vote.active ? <Resource name="vote" list={VoteList} icon={VoteIcon} options={{menuTitle: 'Stemmen'}} /> : <div />}
      {resources.user && resources.user.active ? <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} options={{menuTitle: 'Gebruikers',userPath: userPath}} /> : <div />}
      {resources.newsletterSignup && resources.newsletterSignup.active ? <Resource name="newslettersignup" list={NewsletterSignupList} icon={NewsletterSignupIcon}  options={{menuTitle: 'Nieuwsbrief'}} /> : <div />}
    </Admin>
  );
}
