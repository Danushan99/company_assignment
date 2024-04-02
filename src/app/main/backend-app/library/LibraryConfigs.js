/* eslint-disable import/no-extraneous-dependencies */
import { lazy } from 'react';
import { authRoles } from 'app/auth';
// const Contacts = lazy(() => import('./contact/ContactsAppConfig'));
const Location = lazy(() => import('./location/LocationApp'));
const Exchangerate = lazy(() => import('./ExchangeRate/ExchangeRate'));
const Agreement = lazy(() => import('./Agreement/Agrement'));
const Contacts = lazy(() => import('./Contacts/Contacts'));
const Contact = lazy(() => import('./Contacts/contact/Contact'));
const ChartofAcoount = lazy(() => import('./ChartofAccount/ChartofAcoount'));
const Intercome = lazy(() => import('./Incoterms/IncortermTypes'));

const LibraryConfigs = {
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
			path: '/library/contacts',
			element: <Contacts />
		},
		{
			path: '/library/contacts/new',
			element: <Contact />
		},	
		{
			path: '/library/agreement',
			element: <Agreement />
		},
		{
			path: '/library/location',
			element: <Location />
		},
		{
			path: '/library/chart_of_accounts',
			element: <ChartofAcoount />
		},
		{
			path: '/library/exchangerate',
			element: <Exchangerate />
		},
		{
			path: '/library/incoterms',
			element: <Intercome />
		}
	]
};

export default LibraryConfigs;
