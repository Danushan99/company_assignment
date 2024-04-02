/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-duplicates */
import FusePageCarded from '@fuse/core/FusePageCarded';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { resetUser } from '../../store/systemUserSlice';
import reducer from '../../store';
import UserHeader from './UserHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import { getJoblist, selectJobtitles } from '../../store/systemJobtitleSlice';
import { getCompanylist } from '../../store/systemCompanySlice';
import FuseLoading from '../../../../../../@fuse/core/FuseLoading';
import { getUser } from '../../store/systemUserSlice';
import { useDeepCompareEffect } from '../../../../../../@fuse/hooks';
import { getUsers, selectUsers } from '../../store/userslice';
import AccessLevel from './tabs/AccessLevel';
import EducationalQualification from './tabs/EducationalQualification';
import ProfessionalQualification from './tabs/ProfessionalQualification';
import EmployeeInformation from './tabs/EmployeeInformation';
import EmployeeDocuments from './tabs/EmployeeDocuments';
import JwtService from '../../../../../services/jwtService';
import QuatationtoProcess from './tabs/QuatationtoProcess';
import BookinginProcessTab from './tabs/BookinginProcessTab';

const Root = styled(FusePageCarded)(({ theme }) => ({
	'& .FusePageCarded-header': {
		minHeight: 52,
		height: 52,
		alignItems: 'center',
		[theme.breakpoints.up('sm')]: {
			minHeight: 52,
			height: 52
		}
	}
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	Company: yup.number().required('You must enter a employee office'),
	JobTitle: yup.string().required('You must enter a job title'),
	Extention: yup.string().required('You must enter a Extention'),
	FirstName: yup
		.string()
		.required('You must enter a first name')
		.matches(/^[a-zA-Z]+$/, 'Frist Name must contain letters and without `.`'),
	LastName: yup
		.string()
		.required('You must enter a last name')
		.matches(/^[a-zA-Z]+$/, 'Last Name must contain letters and without `.`'),

	Gender: yup.string().required('You must enter a gender'),
	// DOB: yup.string().required('You must enter date of birth'),
	Email: yup.string().email('Enter a valid email').required('You must enter a email'),
	UserName: yup
		.string()
		.required('You must enter your username')
		.matches(/^[0-9a-z]+$/, 'Username must contain lowercase and without `.`'),
	pw: yup
		.string()
		.required('Please enter your password.')
		.min(3, 'Password is too short - should be 3 chars minimum.')
	//  JoinDate: yup.date().default(() => new Date())
	// DoB:yup.date(),
});

const defaultValues = {
	companyId: '',
	title: '',
	CompanyName: '',
	dob: '',
	pob: '',
	perAddress: '',
	prsAddress: '',
	email: '',
	drivLicenNo: '',
	fname: '',
	placeofbirth: '',
	telephoneno: '',
	mariStatus: '',
	uname: '',
	mname: '',
	gender: '',
	mobiNo: '',
	nicNo: '',
	telNo: '',
	pws: '',
	lname: '',
	nationality: '',
	comment: '',
	crimeOff: '',
	avatar: '',
	famillyMember: []
};

function Calculation(props) {
	const dispatch = useDispatch();
	const systemUser = useSelector(({ system }) => system.systemUser);

	//  const  users = useSelector(selectUsers);

	// users.map((data)=> {
	//     const defaultValues = {
	//         UserName: '',
	//         pw: '',
	//         FirstName: 'ravi',
	//         LastName: 'mobile',
	//         JobTitle: [],
	//         Email: '',
	//         DOB: '',
	//         Gender: [],
	//         Company: [],
	//         // JoinDate: new Date(),
	//         JoinDate: '',
	//         Extention: '',
	//         avatar: ''
	//     }
	// })

	//   console.log("penandaaaaaaaaaaaaaaaaa",setTuserValue)
	//  console.log("getuser",getUser())
	//  const jobtitle = useSelector(selectJobtitles);
	// // const [loading, setLoading] = useState(true);

	// console.log("blndaaaaa",name)
	// users.map((data)=>{
	//
	//      var name = data.FirstName
	//
	//     return name
	//
	//
	// })
	// const companylist = useSelector(selectCompanies);
	// console.log(companylist)
	const routeParams = useParams();
	// const routeParams = Test().props.children
	//  const routeParams = 278
	// console.log("Test 1",test);
	const [tabValue, setTabValue] = useState(0);
	const [noUser, setNoUser] = useState(false);
	const methods = useForm({
		mode: 'onChange',
		defaultValues,
		// defaultValues: {
		//     FirstName: {name},
		// },
		resolver: yupResolver(schema)
	});

	useEffect(() => {
		dispatch(getJoblist());
		// console.log(dispatch(getJoblist()));
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCompanylist());
	}, [dispatch]);

	// useEffect(() => {
	// 	dispatch(getUsers());
	// }, [dispatch]);

	const { reset, watch, register, handleSubmit, control, onChange, formState, getValues } = methods;
	const form = watch();
	const { errors } = formState;

	console.log('check basic info data in user', getValues());

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { userId } = routeParams;
			console.log('check out put', routeParams);
			if (userId === 'new') {
				/**
				 * Create New Product data
				 */
				// dispatch(newProduct());
			} else {
				/**
				 * Get Product data
				 */
				dispatch(getUser(routeParams)).then(action => {
					/**
					 * If the requested product is not exist show message
					 */
					// if (!action.payload) {
					//     setNoProduct(true);
					// }
				});
			}
		}

		updateProductState();
		// for refresh the token
		JwtService.signInWithToken();
	}, [dispatch, routeParams]);

	const [selectedImage, setSelectedImage] = useState({});
	console.log('selectedImage', selectedImage);

	useEffect(() => {
		if (!systemUser) {
			return;
		}
		/**
		 * Reset the form on systemUser state changes
		 */
		reset(systemUser);
	}, [systemUser, reset]);

	useEffect(
		() => () => {
			/**
			 * Reset System Calculation on component unload
			 */
			dispatch(resetUser());
			console.log('resetuser', resetUser());
			setNoUser(false);
		},
		[dispatch]
	);

	/**
	 * Tab Change
	 */
	function handleTabChange(event, value) {
		setTabValue(value);
		// for refresh the token
		JwtService.signInWithToken();
	}

	/**
	 * Show Message if the requested systemUsers is not exists
	 */
	// if (noUser) {
	//   return (
	//     <motion.div
	//       initial={{ opacity: 0 }}
	//       animate={{ opacity: 1, transition: { delay: 0.1 } }}
	//       className="flex flex-col flex-1 items-center justify-center h-full"
	//     >
	//       <Typography color="textSecondary" variant="h5">
	//         There is no such user!
	//       </Typography>
	//       <Button
	//         className="mt-24"
	//         component={Link}
	//         variant="outlined"
	//         to="/apps/e-commerce/products"
	//         color="inherit"
	//       >
	//         Back
	//       </Button>
	//     </motion.div>
	//   );
	// }

	/**
	 * Wait while system user data is loading and form is setted
	 */
	// if (_.isEmpty(form) || (systemUser && routeParams?.userId !== systemUser?.id && routeParams?.userId !== 'new')) {
	//     return <FuseLoading />;
	// }
	// console.log('methods', methods);

	// make sure formState is read before render to enable the Proxy
	return (
		<FormProvider {...methods}>
			{/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
			<Root
				header={<UserHeader setSelectedImage={setSelectedImage} selectedImage={selectedImage} />}
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
						<Tab className="h-64" label="Basic Info" />
						<Tab className="h-64" label="Acess Level" />
						<Tab className="h-64" label="Educational Qualifications" />
						<Tab className="h-64" label="Professional Qualifications" />
						<Tab className="h-64" label="Employee Informations" />
						<Tab className="h-64" label="Employee Documents" />
						<Tab className="h-64" label="OPTION" />
						<Tab className="h-64" label="Booking in Process" />
					</Tabs>
				}
				content={
					<div className="p-16 sm:p-16 ">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<BasicInfoTab setSelectedImage={setSelectedImage} selectedImage={selectedImage} />
						</div>

						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<AccessLevel />
						</div>

						<div className={tabValue !== 2 ? 'hidden' : ''}>
							<EducationalQualification />
						</div>

						<div className={tabValue !== 3 ? 'hidden' : ''}>
							<ProfessionalQualification />
						</div>

						<div className={tabValue !== 4 ? 'hidden' : ''}>
							<EmployeeInformation />
						</div>

						<div className={tabValue !== 5 ? 'hidden' : ''}>
							<EmployeeDocuments />
						</div>

						<div className={tabValue !== 6 ? 'hidden' : ''}>
							<QuatationtoProcess />
						</div>

						<div className={tabValue !== 7 ? 'hidden' : ''}>
							<BookinginProcessTab />
						</div>
					</div>
				}
				innerScroll
			/>
			{/* </form> */}
		</FormProvider>
	);
}

export default withReducer('system', reducer)(Calculation);
