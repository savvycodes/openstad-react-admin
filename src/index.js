import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {OpenstadReactAdmin} from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <OpenstadReactAdmin
      displayAppBar={true}
      site={{
        id: 149
      }}
      user={{
        id: 26
      }}
      imageApi={{
        //url: '',
  //      url: 'http://localhost:3333/image?access_token=MHhfb5U0m8vquAR81p',
        url: '/image'
      }}
      restApi={{
             url: '/api/site/1',
        // url: '/api/site/149'
      }}
      jwt=""
      siteKey="xxxxxxx"
      resources={{
        idea: {
          active: true
        },
        user: {
          active: true
        },
        product: {
          active: false
        },
        order: {
          active: false
        },
        vote: {
          active: true
        },
        article: {
          active: false
        },
        argument: {
          active: true
        },
        site: {
          active: true
        },
        newsletterSignup: {
          active: true
        },
        tag: {
          active: true
        },
      }}
    />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
