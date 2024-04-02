/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import reducer from './store';
import { getAllContacts } from './store/contactsSlice';
import { getwordsListByContactUrl } from '../../administrator/store/dictionarySlice';
import ContactsHeader from './ContactsHeader';
import ContactsTable from './ContactsTable';
import ContactViewDialog from './ContactViewDialog';

const Root = styled(FusePageCarded)(({ theme }) => ({
	'& .FusePageCarded-header': {
		minHeight: 52,
		height: 52,
		alignItems: 'center',
		[theme.breakpoints.up('sm')]: {
			minHeight: 52,
			height: 52
		}
	},
	'& .FusePageCarded-content': {
		display: 'flex'
	},
	'& .FusePageCarded-contentCard': {
		overflow: 'hidden'
	}
}));

function Contacts(props) {
	const {
		isloardingCtarrif,
		contactsWordsArray,
		setCustomerID,
		setSelectedVendorItem,
		setSelectedVendorNameImp1,
		setOpenContacts,
		setOpenImp1,
		addBuyItem,
		openCustomer,
		setOpenCustomer,
		setSelectedVendorItemId,
		openexp1,
		setSelectedVendorNameExp1,
		openNotify1,
		setOpenNotify1,
		setSelectedNameNotify1,
		openShipingLine,
		setSelectedNameShipinline,
		openexp2,
		setOpenexp2,
		setSelectedopenexp2,
		setSelectedopenexp3,
		openexp3,
		setOpenexp3,
		setOpenexp1,
		openimoorter2,
		setSelectedopenimporter2,
		openimoorter3,
		setSelectedopenimporter3,
		openNotify2,
		setSelectedopennotify2,
		openNotify3,
		setSelectedopennotify3,
		openNotify4,
		setSelectedopennotify4,
		openNotify5,
		setSelectedopennotify5,
		setOpenShipingLine,
		openvendorbuy,
		opensubvendorbuy,
		setSelectedsubVendorItem,
		openvendorsell,
		setSelectedVendorSellItem,
		setSelectedVendorSellItemID,
		setSelectedsubVendorItemId
	} = props;

	const dispatch = useDispatch();
	const allContactsList = useSelector(({ addressBookApp }) => addressBookApp.contacts.all);
	const [selectedOption, setSelectedOption] = useState('');

	const [isLoadingContacts, setIsLoadingContacts] = useState(false);

	const isloardingcontactontarrif = isloardingCtarrif || false;

	useEffect(() => {
		const curretPath = window.location.pathname.toString();
		const encodedCurretPath = btoa(curretPath);
		dispatch(getwordsListByContactUrl(encodedCurretPath));
	}, [dispatch]);

	useEffect(() => {
		// Set the loading state to true before making the API call
		setIsLoadingContacts(true);

		if (allContactsList?.length === 0) {
			dispatch(getAllContacts()).then(res => {
				if (res?.payload) {
					setIsLoadingContacts(false);
				}
			});
		} else {
			setIsLoadingContacts(false);
		}
	}, [dispatch, allContactsList]);

	return (
		<>
			<Root
				header={
					<ContactsHeader
						isloardingcontactontarrif={isloardingcontactontarrif}
						setSelectedOption={setSelectedOption}
						selectedOption={selectedOption}
						setIsLoadingContacts={setIsLoadingContacts}
					/>
				}
				content={
					<ContactsTable
						isloardingcontactontarrif={isloardingcontactontarrif}
						isLoadingContacts={isLoadingContacts}
						setCustomerID={setCustomerID}
						setSelectedVendorItem={setSelectedVendorItem}
						setSelectedVendorNameImp1={setSelectedVendorNameImp1}
						setSelectedVendorNameExp1={setSelectedVendorNameExp1}
						setSelectedNameNotify1={setSelectedNameNotify1}
						setSelectedVendorItemId={setSelectedVendorItemId}
						setSelectedVendorSellItemID={setSelectedVendorSellItemID}
						setOpenContacts={setOpenContacts}
						setOpenCustomer={setOpenCustomer}
						setSelectedNameShipinline={setSelectedNameShipinline}
						setSelectedopenimporter2={setSelectedopenimporter2}
						setOpenImp1={setOpenImp1}
						openexp1={openexp1}
						setOpenexp1={setOpenexp1}
						openexp2={openexp2}
						setOpenexp2={setOpenexp2}
						openexp3={openexp3}
						setOpenexp3={setOpenexp3}
						openNotify4={openNotify4}
						openimoorter2={openimoorter2}
						openimoorter3={openimoorter3}
						openNotify2={openNotify2}
						openNotify3={openNotify3}
						openNotify5={openNotify5}
						setSelectedopenexp2={setSelectedopenexp2}
						setSelectedopenexp3={setSelectedopenexp3}
						setSelectedopenimporter3={setSelectedopenimporter3}
						setSelectedopennotify3={setSelectedopennotify3}
						setSelectedopennotify4={setSelectedopennotify4}
						setSelectedopennotify5={setSelectedopennotify5}
						setSelectedopennotify2={setSelectedopennotify2}
						openNotify1={openNotify1}
						setOpenNotify1={setOpenNotify1}
						openShipingLine={openShipingLine}
						setOpenShipingLine={setOpenShipingLine}
						openCustomer={openCustomer}
						addBuyItem={addBuyItem}
						openvendorbuy={openvendorbuy}
						opensubvendorbuy={opensubvendorbuy}
						setSelectedsubVendorItem={setSelectedsubVendorItem}
						openvendorsell={openvendorsell}
						setSelectedVendorSellItem={setSelectedVendorSellItem}
						setSelectedsubVendorItemId={setSelectedsubVendorItemId}
					/>
				}
				innerScroll
			/>
			<ContactViewDialog />
		</>
	);
}

// Wrap your component with React.memo
const MemoizedContacts = React.memo(Contacts);
export default withReducer('addressBookApp', reducer)(MemoizedContacts);
