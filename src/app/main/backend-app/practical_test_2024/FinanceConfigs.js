import { lazy } from 'react';
import { authRoles } from 'app/auth';

const JuornalEntry = lazy(() => import('./JE/JournalEntry')); // You can Update this
//const IndexPages = lazy(() => import('./IndexPage/IndexPages'))// You can Update this
const FinanceConfigs = {
	settings: {
		layout: {
			config: {
				// scroll: 'content',
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
			path: '/fIN/mtl/crud',
			element: <JuornalEntry />  //You can Update this
		},
		{
			path:'/fIN/mtl/test2024',
			//element: <IndexPages />  You can Update this
		}
		
	]
};

export default FinanceConfigs;