import React from 'react';
import PropTypes from 'prop-types';

//import './App.less';
import { Admin, Resource} from 'react-admin';
import { ArticleList, ArticleEdit, ArticleCreate, ArticleIcon } from './resources/article.jsx';
import { TagList, TagEdit, TagCreate, TagIcon } from './resources/tag.jsx';
import { OrderList, OrderEdit, OrderCreate, OrderIcon } from './resources/order.jsx';
import { UserList, UserEdit, UserCreate, UserIcon } from './resources/user.jsx';
import { IdeaList, IdeaEdit, IdeaCreate, IdeaIcon } from './resources/idea/index.jsx';
import { ProductList, ProductEdit, ProductCreate, ProductIcon } from './resources/product.jsx';
import { VoteList, VoteIcon } from './resources/vote/index.jsx';
import { ArgumentList, ArgumentEdit, ArgumentCreate, ArgumentIcon } from './resources/argument.jsx';
import { SiteEdit, SiteIcon } from './resources/site/index.jsx';
import { NewsletterSignupList, NewsletterSignupIcon } from './resources/newslettersignup.jsx';
import { ChoicesGuideList, ChoicesGuideEdit, ChoicesGuideCreate, ChoicesGuideIcon } from './resources/choicesGuide/index.jsx';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { SettingsForm } from './profile.jsx';

/* presentation elements */
import { MyLayout } from './presentation/layout.jsx';
import Dashboard from './Dashboard.jsx';
import dataProvider from './dataProvider';
import { connect } from 'react-redux';
import themeReducer from './themeReducer';

import { createMuiTheme } from '@material-ui/core/styles';

import theme from './theme';
import { AreaList } from './resources/area/list.jsx';
import { AreaCreate, AreaEdit, AreaIcon } from './resources/area/index.jsx';

/*
customRoutes={[
]}
*/

export const OpenstadReactAdmin = (props) => {
  const resources = props.resources;
  const user = props.user;
  const userPath = "/user/" + user.id;

  // @todo: Also move the dataProvider to generic header options,
  //  this way JWT, siteKey and CSRF logic can be in one place at the top
  const authHeader = props.siteKey ? {
    'X-Authorization': `${props.siteKey}`
  } : {
    'X-Authorization': `Bearer ${props.jwt}`
  };

  return (
    <Admin
        dashboard={(dashboardProps) => {
          return <Dashboard
              {...dashboardProps}
              authHeader={authHeader}
              statsApi={props.statsApi && props.statsApi.url ? props.statsApi.url : false}
          />
        }}
        theme={theme}
        dataProvider={dataProvider(props.restApi.url, props.jwt, props.siteKey, props.csrf)}
        appLayout={MyLayout}
        customReducers={{ theme: themeReducer }}
    >
      {resources.site && resources.site.active ? <Resource name="site" edit={SiteEdit}  icon={IdeaIcon} options={{menuTitle: 'Sites', hideMenulink:true, siteId: props.site.id}} /> : <div />}
      {resources.product && resources.product.active ? <Resource name="product" list={ProductList} edit={ProductEdit} create={ProductCreate} icon={ProductIcon} options={{menuTitle: 'Producten', imageApiUrl: props.imageApi.url}} /> : <div />}
      {resources.order && resources.order.active ? <Resource name="order" list={OrderList} edit={OrderEdit} create={OrderCreate} icon={OrderIcon} options={{menuTitle: 'Bestellingen'}} /> : <div />}
      {resources.idea && resources.idea.active ?  <Resource name="idea" list={IdeaList} edit={IdeaEdit} create={IdeaCreate} icon={SpeakerNotesIcon} options={{menuTitle: 'Plannen', imageApiUrl: props.imageApi.url}} />  : <div />}
      {resources.area && resources.area.active ?  <Resource name="area" list={AreaList} edit={AreaEdit} create={AreaCreate} icon={ChangeHistoryIcon} options={{menuTitle: 'Polygonen'}} />  : <div />}
      {resources.article && resources.article.active ?  <Resource name="article" list={ArticleList} edit={ArticleEdit} create={ArticleCreate} icon={ArticleIcon} options={{menuTitle: 'Artikelen'}} />  : <div />}
      {resources.tag && resources.tag.active ?  <Resource name="tag" list={TagList} edit={TagEdit} create={TagCreate} icon={LocalOfferIcon} options={{menuTitle: 'Tags'}}  />  : <div />}
      {resources.argument && resources.argument.active ? <Resource name="argument" list={ArgumentList} edit={ArgumentEdit} create={ArgumentCreate} icon={ArgumentIcon} options={{menuTitle: 'Argumenten'}} /> : <div />}
      {resources.vote && resources.vote.active ? <Resource name="vote" list={VoteList} icon={HowToVoteIcon} options={{menuTitle: 'Stemmen'}} /> : <div />}
      {resources.user && resources.user.active ? <Resource name="user" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} options={{menuTitle: 'Gebruikers',userPath: userPath}} /> : <div />}
      {resources.newsletterSignup && resources.newsletterSignup.active ? <Resource name="newslettersignup" list={NewsletterSignupList} icon={ContactMailIcon}  options={{menuTitle: 'Nieuwsbrief'}} /> : <div />}
      {resources.choicesGuide && resources.choicesGuide.active ? <Resource name="choicesGuide" list={ChoicesGuideList} edit={ChoicesGuideEdit} create={ChoicesGuideCreate} icon={ChoicesGuideIcon} options={{menuTitle: 'Keuzewijzers'}} /> : <div />}
    </Admin>
  );
}

OpenstadReactAdmin.propTypes = {
  // Expects following object {id : 1}, initial ideas to add user REST object, but can be changed to userId
  site: PropTypes.object.isRequired,
  // Expects following object {id : 1}, initial ideas to add user REST object, but can be changed to userId
  user: PropTypes.object.isRequired,
  // Expects string of image openstad API
  imageApi: PropTypes.string.isRequired,
  // Expects of REST API, in openstad this format is with site id, since every site has it's own REST api
  // So base of rest api would be something like this /api/site/148, for dev there is a proxy and in CMS and Admin panel proxies to API exists
  // this fixes the CORS errors
  restApi: PropTypes.element.isRequired,
  statsApi: PropTypes.element.isRequired,
  // JTW for active user or siteKey apikey for static admin user for testing in DEV
  jwt: PropTypes.string,
  siteKey: PropTypes.string,
  // array of objects with list of resources and whether they are active of not
  // this is config that can potentially be changed by where it's loaded
  // This makes it possible for some sites to show articles in admin, but in others not if not relevant
  // This way admin users can customize the admin interface for moderators a bit.
  resources: PropTypes.array.isRequired
};
