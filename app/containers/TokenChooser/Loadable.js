/**
 *
 * Asynchronously loads the component for TokenChooser
 *
 */

import Loadable from 'react-loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default Loadable({
  loader: () => import('./index').then((m) => m.default),
  loading: LoadingIndicator,
});
