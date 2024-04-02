/* eslint-disable import/no-extraneous-dependencies */
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { authRoles } from 'app/auth';

const Users = lazy(() => import('./system/users/Users'));
const User = lazy(() => import('./system/user/User'));
const Container = lazy(() => import('./system/ContactTypes/ContactType'));
const Language = lazy(() => import('./system/language/LanguageList'));
const AddressType = lazy(() => import('./system/AddressType/AddressTypes'));
//const FileUploadTypes = lazy(() => import('./system/FileUploadType/FileUploadTypes'));
const CurrencyTypes = lazy(() => import('./system/CurrencyType/CurrencyTypes'));
const Incorterms = lazy(()=> import('./system/Incoterms/IncortermTypes'))

const AdministratorConfig = {
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
			path: 'administration/system/users',
			element: <Users />
		},
		{
			path: 'administration/system/new-user',
			element: <User />
		},
		{
			path: 'administration/system/users/:userId',
			element: <User />
		},
		{
			path: 'administration/system',
			element: <Navigate to="users" />
		},
		{
			path: 'administration/system/contact-types',
			element: <Container />
		},
		{
			path: '/administration/word_dictionary',
			element: <Language />
		},

		{
			path: 'administration/system/address-types',
			element: <AddressType />
		},
		/*{
			path: 'administration/system/file-upload-type',
			element: <FileUploadTypes />
		},*/
		{
			path: 'administration/system/currency_type',
			element: <CurrencyTypes />
		},
		{
			path: 'administration/system/incoterms',
			element: <Incorterms />
		}
	]
};

export default AdministratorConfig;
