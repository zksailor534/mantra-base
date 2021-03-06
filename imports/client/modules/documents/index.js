import actions from './actions';
import routes from './routes';
import methodStubs from './configs/method_stubs';

export default {
  routes,
  actions,
  load(context) {
    methodStubs(context);
  },
};
