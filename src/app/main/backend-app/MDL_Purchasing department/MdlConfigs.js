/* eslint-disable import/no-extraneous-dependencies */
import { lazy } from 'react';
import { authRoles } from 'app/auth';

const Tarrif = lazy(() => import('./tarrif/Tarrif'));
const InsertTarrif = lazy(() => import('./tarrif/InsertTarrif'));
const RenewTarrif = lazy(() => import('./RenewTarrif/RenewTarrif'));
const RequestTariffs = lazy(() => import('./RequestTariffs/RequestTariffs'));
const ArchiveTariffs = lazy(() => import('./ArchiveTarrifs/ArchiveTariffs'));
const PendingTariffs = lazy(() => import('./PendingTarrif/PendingTarrif'));
const SendRequest = lazy(() => import('./SendRequest/SendRequest'));

const MdlConfigs = {
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
			path: '/mdl_purchasing_department/tariffs',
			element: <Tarrif />
		},
		{
			path: '/mdl_purchasing_department/Posting-tariff',
			element: <InsertTarrif />
		},
		{
			path: '/mdl_purchasing_department/renew_tariff',
			element: <RenewTarrif />
		},
		{
			path: '/mdl_purchasing_department/tariff_request',
			// element: <RequestTariffs />
			element: <PendingTariffs />
		},
		{
			path: '/mdl_purchasing_department/tariffs_archive',
			element: <ArchiveTariffs />
		},
		// {
		// 	path: '/mdl_purchasing_department/pending_tariff',
		// 	element: <PendingTariffs />
		// },
		{
			path: '/mdl_purchasing_department/pending-request',
			element: <SendRequest />
		}
	]
};

export default MdlConfigs;
