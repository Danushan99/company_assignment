import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import _ from '@lodash';
import { API_DATA_LIMIT } from 'app/main/utils/commonConstant';
import { saveContact } from '../store/singleContactSlice';
import { getContacts } from '../store/contactsSlice';

function ContactHeader(props) {
	const { isEdit } = props;
	const dispatch = useDispatch();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);

	const paramsData = {
		limits: API_DATA_LIMIT
	};

	const methods = useFormContext();
	const { formState, watch, getValues } = methods;

	const theme = useTheme();
	const navigate = useNavigate();

	const address = getValues('contactaddressItems')?.map(item => {
		return {
			...item,
			avatar: item.avatar ? item.avatar[0] : null
		};
	});

	const employeeItemList = getValues('employeeItems')?.map(item => {
		return {
			...item,
			avatar: item.avatar ? item.avatar[0] : null
		};
	});

	const agreementDoc = getValues('contactagreementItems')?.map(item => {
		return {
			...item,
			agrementFile: item.agrementFile ? item.agrementFile[0] : null
		};
	});

	// const submitDate1 = {
	// 	datas: {
	// 		code: getValues('code'),
	// 		contacttype: getValues('contacttype')?.toString(),
	// 		companyName: getValues('companyName'),
	// 		email: getValues('email'),
	// 		tpno: getValues('tpno'),
	// 		web: getValues('webSite'),
	// 		countryID: getValues('countryID'),
	// 		cityID: getValues('cityID'),
	// 		notes: getValues('note'),
	// 		otherCompanyName: getValues('companyNameItems'),
	// 		otheremail: getValues('emailItems'),
	// 		othertpno: getValues('telephoneItems'),
	// 		employee: employeeItemList,
	// 		contactaddress: address,
	// 		contactperson: getValues('contactPersonItems'),
	// 		contactagreement: agreementDoc
	// 	}
	// };

	function handleSaveContact() {
		const submitDate = {
			datas: {
				code: getValues('code'),
				contacttype: getValues('contacttype')?.toString(),
				companyName: getValues('companyName'),
				email: getValues('email'),
				tpno: getValues('tpno'),
				web: getValues('webSite'),
				countryID: getValues('countryID'),
				cityID: getValues('cityID'),
				notes: getValues('note'),
				otherCompanyName: getValues('companyNameItems'),
				otheremail: getValues('emailItems'),
				othertpno: getValues('telephoneItems'),
				employee: employeeItemList,
				contactaddress: address,
				contactperson: getValues('contactPersonItems'),
				contactagreement: agreementDoc
			}
		};

		dispatch(saveContact(submitDate)).then(response => {
			if (response?.payload?.Msg) {
				dispatch(getContacts(paramsData));
				navigate('/library/contacts');
			}
		});
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
	const saveBtn = findByKey(wordsList, 'SAVE_BTN');
	const contactsHeader = findByKey(wordsList, 'Contacts');

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/library/contacts"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">
							{' '}
							{currentLanguageId === 'en'
								? contactsHeader?.en_US
								: currentLanguageId === 'rus'
								? contactsHeader?.rus
								: 'Contacts'}
						</span>
					</Typography>
				</motion.div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{isEdit === false && (
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={() => handleSaveContact()}
					>
						{currentLanguageId === 'en'
							? saveBtn?.en_US
							: currentLanguageId === 'rus'
							? saveBtn?.rus
							: 'SAVE'}
					</Button>
				)}
			</motion.div>
		</div>
	);
}

export default ContactHeader;
