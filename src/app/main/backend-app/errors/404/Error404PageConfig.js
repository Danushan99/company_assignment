import { lazy } from 'react';
import { authRoles } from 'app/auth';

const Error404Page = lazy(() => import('./Error404Page'));

const Error404PageConfig = {
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
			path: 'apps/page-not-found',
			element: <Error404Page />
		}
	]
};

export default Error404PageConfig;
