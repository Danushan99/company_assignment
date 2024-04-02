import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import backendAppConfigs from 'app/main/backend-app/backendAppConfigs';

import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';

import { Navigate } from 'react-router-dom';

const routeConfigs = [
	...appsConfigs,
	
	...authRoleExamplesConfigs,
	...backendAppConfigs,
	
	LogoutConfig,
	LoginConfig
	
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff', 'user']),
	{
		path: '/',
		element: <Navigate to="/apps/dashboards/analytics" />
		
	},
	{
		path: '*',
		element: <Navigate to="/login" />
	}
];

export default routes;
