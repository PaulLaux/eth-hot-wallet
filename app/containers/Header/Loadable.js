/**
 *
 * Asynchronously loads the component for Header
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index').then((m) => m.default),
  loading: () => null,
});
