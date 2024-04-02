import { lazy } from 'react';
import { authRoles } from 'app/auth';

const Error500Page = lazy(() => import('./Error500Page'));

const Error500PageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: true
				},
				toolbar: {
					display: true
				},
				footer: {
					display: true
				},
				leftSidePanel: {
					display: true
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.privilege,
	routes: [
		{
			path: 'apps/errors/error-500',
			element: <Error500Page />
		}
	]
};

export default Error500PageConfig;
