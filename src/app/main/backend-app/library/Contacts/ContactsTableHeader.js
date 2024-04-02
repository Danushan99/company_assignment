/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TableHead from '@mui/material/TableHead';

function ContactsHeader(props) {
	const { t } = useTranslation();
	const { selectedIds } = props;
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.contactwordsList);
	const notCurrentUrlWordsList = useSelector(({ words }) => words.preList); // not current url words
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const curretPath = window.location.pathname.toString();
	const contactpagePath = '/library/contacts';

	function findByKey(arr, findVal) {
		if (arr?.length > 0) {
			const found = arr?.find(obj => {
				return obj.headerKey === findVal;
			});
			return found;
		}
		return '';
	}
	// common words translater
	const actionTtle = findByKey(commonTranslateWordsArray, 'ACTION_TITLE');
	// page words translater
	const idText = findByKey(curretPath === contactpagePath ? wordsList : notCurrentUrlWordsList, 'ID_TEXT');
	const codeText = findByKey(curretPath === contactpagePath ? wordsList : notCurrentUrlWordsList, 'CODE_TEXT');
	const emailText = findByKey(curretPath === contactpagePath ? wordsList : notCurrentUrlWordsList, 'EMAIL_TEXT');
	const phoneText = findByKey(curretPath === contactpagePath ? wordsList : notCurrentUrlWordsList, 'PHONE_TEXT');
	const companyText = findByKey(
		curretPath === contactpagePath ? wordsList : notCurrentUrlWordsList,
		'COMPANY_NAME_TEXT'
	);

	const actionTitle =
		currentLanguageId === 'en' ? actionTtle?.en_US : currentLanguageId === 'rus' ? actionTtle?.rus : 'Action';

	const IDTitle = currentLanguageId === 'en' ? idText?.en_US : currentLanguageId === 'rus' ? idText?.rus : 'ID';
	const codeTitle =
		currentLanguageId === 'en' ? codeText?.en_US : currentLanguageId === 'rus' ? codeText?.rus : 'Code';
	const companyTitle =
		currentLanguageId === 'en' ? companyText?.en_US : currentLanguageId === 'rus' ? companyText?.rus : 'Company';
	const emailTitle =
		currentLanguageId === 'en' ? emailText?.en_US : currentLanguageId === 'rus' ? emailText?.rus : 'Email';
	const phoneTitle =
		currentLanguageId === 'en' ? phoneText?.en_US : currentLanguageId === 'rus' ? phoneText?.rus : 'Phone';

	const rows = [
		{
			id: 'action',
			align: 'right',
			disablePadding: false,
			label: actionTitle,
			sort: true
		},
		{
			id: 'ID',
			align: 'left',
			disablePadding: false,
			label: IDTitle,
			sort: true
		},
		{
			id: 'Code',
			align: 'left',
			disablePadding: false,
			label: codeTitle,
			sort: true
		},
		{
			id: 'Company',
			align: 'left',
			disablePadding: false,
			label: companyTitle,
			sort: true
		},
		{
			id: 'Email',
			align: 'left',
			disablePadding: false,
			label: emailTitle,
			sort: true
		},
		{
			id: 'Phone',
			align: 'left',
			disablePadding: false,
			label: phoneTitle,
			sort: true
		}
	];
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-32 sm:h-32">
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-8"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'normal'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
										className="font-semibold"
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default ContactsHeader;
