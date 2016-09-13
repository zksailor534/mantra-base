import { useDeps } from 'mantra-core';
import { withRedux, composeAll } from 'react-komposer-plus';

import Navigation from '../components/navigation';

const mapStateToProps = ({ accounts }) => ({
  loggedIn: accounts.isAuthenticated,
});

export default composeAll(
  withRedux(mapStateToProps),
  useDeps()
)(Navigation);
