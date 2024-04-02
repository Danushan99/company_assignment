/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import _ from '@lodash';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogContent } from '@mui/material';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { closeViewContactDetailDialog } from './store/contactsSlice';
import ViewAgreementContact from './componets/ViewAgreementContact';
import ViewContactAddress from './componets/ViewContactAddress';
import ViewPersonDetails from './componets/ViewPersonDetails';
import ViewContactPerson from './componets/ViewContactPerson';
import ViewContactBasicinfo from './componets/ViewContactBasicinfo';

function ContactViewDialog(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const contactDetailsDialog = useSelector(({ addressBookApp }) => addressBookApp.contacts.contactDetailsDialog);
	const viewContactDetail = useSelector(({ addressBookApp }) => addressBookApp.contact);

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.contactwordsList);

	const [tabValue, setTabValue] = useState(0);

	/**
	 * Close Dialog
	 */
	function closeDialog() {
		dispatch(closeViewContactDetailDialog());
	}
	/**
	 * Translate section
	 */
	function findByKey(arr, findVal) {
		if (arr?.length > 0) {
			const found = arr?.find(obj => {
				return obj.headerKey === findVal;
			});
			return found;
		}
		return '';
	}
	const conDetailsText = findByKey(wordsList, 'CON_DETAILS_TEXT');
	const closeBtn = findByKey(wordsList, 'CLOSE_BTN');

	const basicInfoTab = findByKey(wordsList, 'BASIC_INFO_TAB');
	const addressTab = findByKey(wordsList, 'CON_ADDRESS_TAB');
	const contactPersonTab = findByKey(wordsList, 'CON_PERSON_TAB');
	const personalDetailsTab = findByKey(wordsList, 'P_DETAILS_TAB');
	const agreementTab = findByKey(wordsList, 'AGREEMENT_TAB');
	/**
	 * Tab Change
	 */
	function handleTabChange(event, value) {
		setTabValue(value);
	}

	const tabArray = [];
	// Only include contactAddress as a tab if it is not an empty array
	if (viewContactDetail?.contactAddress && viewContactDetail.contactAddress.length > 0) {
		tabArray.push({
			key: 'contactAddress',
			lable:
				currentLanguageId === 'en'
					? addressTab?.en_US
					: currentLanguageId === 'rus'
					? addressTab?.rus
					: 'Contact Address'
		});
	}

	if (viewContactDetail?.companyName) {
		tabArray.push({
			key: 'main',
			lable:
				currentLanguageId === 'en'
					? basicInfoTab?.en_US
					: currentLanguageId === 'rus'
					? basicInfoTab?.rus
					: 'Basic Information'
		});
	}
	if (viewContactDetail?.contactPerson && viewContactDetail.contactPerson.length > 0) {
		tabArray.push({
			key: 'contactPerson',
			lable:
				currentLanguageId === 'en'
					? contactPersonTab?.en_US
					: currentLanguageId === 'rus'
					? contactPersonTab?.rus
					: 'Contact Person'
		});
	}

	if (viewContactDetail?.agreements && viewContactDetail.agreements.length > 0) {
		tabArray.push({
			key: 'agreements',
			lable:
				currentLanguageId === 'en'
					? agreementTab?.en_US
					: currentLanguageId === 'rus'
					? agreementTab?.rus
					: 'Agreement/Contract'
		});
	}

	if (viewContactDetail?.personalDetails && viewContactDetail.personalDetails.length > 0) {
		tabArray.push({
			key: 'personalDetails',
			lable:
				currentLanguageId === 'en'
					? personalDetailsTab?.en_US
					: currentLanguageId === 'rus'
					? personalDetailsTab?.rus
					: 'Personal Details'
		});
	}

	const desiredOrder = ['main', 'contactAddress', 'contactPerson', 'agreements'];

	const reorderedTabArray = tabArray.sort((a, b) => {
		const indexA = desiredOrder.indexOf(a.key);
		const indexB = desiredOrder.indexOf(b.key);
		return indexA - indexB;
	});

	return (
		<Dialog {...contactDetailsDialog.props} onClose={() => closeDialog()} fullWidth maxWidth="md" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{currentLanguageId === 'en'
							? conDetailsText?.en_US
							: currentLanguageId === 'rus'
							? conDetailsText?.rus
							: 'Contact Details'}
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }}>
				<Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
					{reorderedTabArray.map((tab, index) => (
						<Tab key={index} label={tab?.lable} />
					))}
				</Tabs>

				{reorderedTabArray.map((tab, index) => {
					const componentsMapping = {
						main: <ViewContactBasicinfo />,
						contactAddress: <ViewContactAddress />,
						contactPerson: <ViewContactPerson />,
						personalDetails: <ViewPersonDetails />,
						agreements: <ViewAgreementContact />
					};

					const componentToRender = componentsMapping[tab?.key];

					return (
						<div key={index} style={{ display: tabValue === index ? 'block' : 'none' }}>
							{componentToRender}
						</div>
					);
				})}
			</DialogContent>
			<DialogActions className="justify-between px-8 py-16">
				<Button type="button" variant="contained" onClick={closeDialog}>
					{currentLanguageId === 'en'
						? closeBtn?.en_US
						: currentLanguageId === 'rus'
						? closeBtn?.rus
						: t('CLOSE')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ContactViewDialog;
