/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-extraneous-dependencies */
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { resetContact, newContact, getOneContact } from '../store/singleContactSlice';
import reducer from '../store';
import ContactHeader from './ContactHeader';
import ContactBasicinfo from '../componets/ContactBasicInfor';
import ContactAdress from '../componets/ContactAddress';
import ContactPerson from '../componets/ContactPerson';
import AgreementContactinfo from '../componets/AgreementContacts';
import PersonalDetails from '../componets/PersonalDetails';
import { getwordsListByUrl } from '../../../administrator/store/dictionarySlice';
import JwtService from '../../../../../services/jwtService';

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

/**
 * Form Validation Schema
 */
const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
	code: yup.string().trim().required('You must enter a code').min(6, 'The code must be at least 6 characters'),
	webSite: yup.string().trim().required('You must enter a website'),
	companyName: yup.string().trim().required('You must enter a company name'),
	email: yup.string().trim().email().required('You must enter a email'),
	tpno: yup.string().trim().matches(phoneRegExp, 'Please enter valid number.'),
	countryID: yup.string().required('You must enter a country'),
	cityID: yup.string().required('You must enter a city'),
	telephoneItems: yup.array().of(
		yup.object().shape({
			telephone: yup.string().trim().matches(phoneRegExp, 'Please enter valid number.')
			// .matches(/^[6-9]\d{9}$/, 'Please enter valid number.')
		})
	),

	emailItems: yup.array().of(
		yup.object().shape({
			email: yup.string().email('You must enter a valid email')
		})
	),

	// companyNameItems: yup.array().of(
	// 	yup.object().shape({
	// 		companyName: yup.string().trim().required('You must enter a company name')
	// 	})
	// ),

	// contact person  section other eamail
	// otheremail: yup.array().of(
	// 	yup.object().shape({
	// 		email: yup.string().trim().email().required('You must enter a valid email')
	// 	})
	// ),

	contactPersonItems: yup.array().of(
		yup.object().shape({
			jobtle: yup.string().required('You must select a job title'),
			title: yup.string().required('You must select a title'),
			fname: yup.string().trim().required('You must enter a frist name'),
			lname: yup.string().trim().required('You must enter a last name'),
			email: yup.string().trim().email().required('You must enter a valid email'),
			tpno: yup
				.string()
				.trim()
				.matches(phoneRegExp, 'Please enter valid telephone.')
				.required('You must enter a phone'),
			mobiles: yup
				.string()
				.trim()
				.matches(phoneRegExp, 'Please enter valid mobile.')
				.required('You must enter a phone')

			// otheremail: yup.array().of(
			// 	yup.object().shape({
			// 		email: yup.string().trim().email().required('You must enter a valid email')
			// 	})
			// ),

			// othertpno: yup.array().of(
			// 	yup.object().shape({
			// 		tpno: yup
			// 			.string()
			// 			.trim()
			// 			.matches(phoneRegExp, 'Please enter valid number.')
			// 			.required('You must enter a phone')
			// 	})
			// ),

			// othermobile: yup.array().of(
			// 	yup.object().shape({
			// 		mobile: yup
			// 			.string()
			// 			.trim()
			// 			.matches(phoneRegExp, 'Please enter valid number.')
			// 			.required('You must enter a mobile')
			// 	})
			// )
		})
	),

	// agreement section
	contactagreementItems: yup.array().of(
		yup.object().shape({
			agretype: yup.string().required('You must select a agreement type'),
			refNo: yup.string().trim().required('You must enter a reference number')
		})
	)
});

function Contact(props) {
	const dispatch = useDispatch();
	const contact = useSelector(({ contactApp }) => contactApp.contact);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);

	const curretPath = '/library/contacts'; // window.location.pathname.toString();

	useEffect(() => {
		// const curretPath = window.location.pathname.toString();
		const encodedCurretPath = btoa(curretPath);
		dispatch(getwordsListByUrl(encodedCurretPath));
	}, [dispatch]);

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [noContact, setNoContact] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues: {
			code: '',
			contacttype: '',
			companyName: '',
			email: '',
			tpno: '',
			webSite: '',
			countryID: '',
			cityID: '',
			note: '',
			telephoneItems: [{ tpno: '' }],
			companyNameItems: [{ companyName: '' }],
			emailItems: [{ email: '' }],
			otheremail: [{ email: '', contactPersonKey: 0 }], // constact person section
			othertpno: [{ tpno: '', contactPersonKey: 0 }], // constact person section
			othermobile: [{ mobile: '', contactPersonKey: 0 }], // constact person section
			contactPersonItems: [
				{
					jobtle: '',
					title: '',
					fname: '',
					lname: '',
					email: '',
					tpno: '',
					ext: '',
					mobiles: '',
					skype: ''
				}
			],

			contactaddressItems: [
				{
					contid: '',
					addresstype: '',
					addrs1: '',
					addrs2: '',
					addrs3: '',
					addrs4: '',
					addrs5: '',
					addrs6: '',
					avatar: null
				}
			],
			employeeItems: [
				{
					mtoffice: '',
					fname: '',
					lname: '',
					dob: '',
					gender: '',
					languages: '',
					livesin: '',
					highschool: '',
					gschool: '',
					biodata: '',
					hobbies: '',
					ext: '',
					avatar: ''
				}
			],
			contactagreementItems: [
				{
					agretype: '',
					refNo: '',
					discription: '',
					tarifCcy: '',
					invoCcy: '',
					setleCcy: '',
					payment: '',
					paytype: '',
					bankDtl: '',
					signNo: '',
					expire: '',
					agrementFile: null
				}
			]
		},
		resolver: yupResolver(schema)
	});
	const { reset, watch, getValues, setValue, control, onChange, formState } = methods;
	const form = watch();

	useDeepCompareEffect(() => {
		function updateContactState() {
			const { contactId } = routeParams;

			if (contactId === 'new') {
				/**
				 * Create New Contact data
				 */
				dispatch(newContact());
			} else {
				/**
				 * Get Contact data
				 */
				dispatch(getOneContact(routeParams)).then(action => {
					/**
					 * If the requested contact is not exist show message
					 */
					if (!action.payload) {
						setNoContact(true);
					}
				});
			}
		}
		// for refresh the token
		JwtService.signInWithToken();
		updateContactState();
	}, [dispatch, routeParams]);

	// useEffect(() => {
	// 	if (!contact) {
	// 		return;
	// 	}
	// 	/**
	// 	 * Reset the form on contact state changes
	// 	 */
	// 	// const addedContactType = contact?.contactType?.map(item => item?.type);
	// 	// setValue('contacttype', addedContactType);

	// }, [contact, reset, setValue]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Contact on component unload
			 */
			dispatch(resetContact());
			setNoContact(false);
		};
	}, [dispatch]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event, value) {
		setTabValue(value);
		// for refresh the token
		JwtService.signInWithToken();
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
	const basicInfoTab = findByKey(wordsList, 'BASIC_INFO_TAB');
	const addressTab = findByKey(wordsList, 'CON_ADDRESS_TAB');
	const contactPersonTab = findByKey(wordsList, 'CON_PERSON_TAB');
	const personalDetailsTab = findByKey(wordsList, 'P_DETAILS_TAB');
	const agreementTab = findByKey(wordsList, 'AGREEMENT_TAB');

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noContact) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There is no such contact!
				</Typography>
				<Button className="mt-24" component={Link} variant="outlined" to="/library/contacts" color="inherit">
					Go to Contacts Page
				</Button>
			</motion.div>
		);
	}
	/**
	 * Wait while product data is loading and form is setted
	 */
	// if (_.isEmpty(form) || (contact && routeParams.contactId !== contact.ContactID && routeParams.contactId !== 'new')) {
	// 	return <FuseLoading />;
	// }

	const ispersonalDetailsShow = getValues('contacttype') ? getValues('contacttype')?.includes(3) : false;

	return (
		<FormProvider {...methods}>
			<Root
				header={<ContactHeader isEdit={false} />}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab
							className="h-64"
							label={
								currentLanguageId === 'en'
									? basicInfoTab?.en_US
									: currentLanguageId === 'rus'
									? basicInfoTab?.rus
									: 'Basic Information'
							}
						/>
						<Tab
							className="h-64"
							label={
								currentLanguageId === 'en'
									? addressTab?.en_US
									: currentLanguageId === 'rus'
									? addressTab?.rus
									: 'Contact Address'
							}
						/>
						<Tab
							className="h-64"
							label={
								currentLanguageId === 'en'
									? contactPersonTab?.en_US
									: currentLanguageId === 'rus'
									? contactPersonTab?.rus
									: 'Contact Person'
							}
						/>
						{ispersonalDetailsShow === true && (
							<Tab
								className="h-64"
								label={
									currentLanguageId === 'en'
										? personalDetailsTab?.en_US
										: currentLanguageId === 'rus'
										? personalDetailsTab?.rus
										: 'Personal Details'
								}
							/>
						)}

						<Tab
							className="h-64"
							label={
								currentLanguageId === 'en'
									? agreementTab?.en_US
									: currentLanguageId === 'rus'
									? agreementTab?.rus
									: 'Agreement/Contract'
							}
						/>
					</Tabs>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<ContactBasicinfo />
						</div>

						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<ContactAdress />
						</div>

						<div className={tabValue !== 2 ? 'hidden' : ''}>
							<ContactPerson />
						</div>

						{ispersonalDetailsShow === true && (
							<div className={tabValue !== 3 ? 'hidden' : ''}>
								<PersonalDetails />
							</div>
						)}

						{ispersonalDetailsShow && ispersonalDetailsShow === true && (
							<div className={tabValue !== 4 ? 'hidden' : ''}>
								<AgreementContactinfo />
							</div>
						)}

						{ispersonalDetailsShow === false && (
							<div className={tabValue !== 3 ? 'hidden' : ''}>
								<AgreementContactinfo />
							</div>
						)}
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default withReducer('contactApp', reducer)(Contact);
