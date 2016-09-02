import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Components
import Layout from './components/layout';
import HomePage from './components/homePage';
import ProfilePage from '../user/components/profilePage';
import { Login } from './components/login';
import { NotFound } from './components/not-found';
import { RecoverPassword } from './components/recover-password';
import { Signup } from './components/signup';

export default function (injectDeps, { Meteor, Store }) {
  const history = syncHistoryWithStore(browserHistory, Store);
  const LayoutCtx = injectDeps(Layout);

  const requireAuth = (nextState, replace) => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  };

  ReactDOM.render(
    <Provider store={Store}>
      <Router history={history}>
        <Route path="/" component={LayoutCtx}>
          <IndexRoute component={HomePage} onEnter={ requireAuth } />
          <Route path="profile" component={ProfilePage} onEnter={ requireAuth } />
          <Route name="login" path="/login" component={ Login } />
          <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
          <Route name="signup" path="/signup" component={ Signup } />
          <Route path="*" component={ NotFound } />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('react-root')
  );
};
