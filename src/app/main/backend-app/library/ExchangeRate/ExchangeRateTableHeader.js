/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { findByKey } from 'app/main/utils/utils';
import TableHead from '@mui/material/TableHead';

function ExchangeRateTableHeader(props) {
	const { t } = useTranslation();
	const { selectedIds } = props;
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	// common words translater
	const actionTtle = findByKey(commonTranslateWordsArray, 'ACTION_TITLE');
	const usdTtle = findByKey(commonTranslateWordsArray, 'USD_TITLE');
	const lkrTtle = findByKey(commonTranslateWordsArray, 'LKR_TITLE');
	const rubTtle = findByKey(commonTranslateWordsArray, 'RUS_TITLE');
	const eurTtle = findByKey(commonTranslateWordsArray, 'EUR_TITLE');
	const inrTtle = findByKey(commonTranslateWordsArray, 'INR_TITLE');
	const cnyTtle = findByKey(commonTranslateWordsArray, 'CNY_TITLE');
	// page words translater
	const dTitle = findByKey(wordsList, 'DATE_TITLE');

	const actionTitle =
		currentLanguageId === 'en' ? actionTtle?.en_US : currentLanguageId === 'rus' ? actionTtle?.rus : 'Action';

	const usdTitle = currentLanguageId === 'en' ? usdTtle?.en_US : currentLanguageId === 'rus' ? usdTtle?.rus : 'USD';
	const lkrTitle = currentLanguageId === 'en' ? lkrTtle?.en_US : currentLanguageId === 'rus' ? lkrTtle?.rus : 'LKR';
	const rubTitle = currentLanguageId === 'en' ? rubTtle?.en_US : currentLanguageId === 'rus' ? rubTtle?.rus : 'RUB';
	const eurTitle = currentLanguageId === 'en' ? eurTtle?.en_US : currentLanguageId === 'rus' ? eurTtle?.rus : 'EUR';
	const inrTitle = currentLanguageId === 'en' ? inrTtle?.en_US : currentLanguageId === 'rus' ? inrTtle?.rus : 'INR';
	const cnyTitle = currentLanguageId === 'en' ? cnyTtle?.en_US : currentLanguageId === 'rus' ? cnyTtle?.rus : 'CNY';
	const dateTitle = currentLanguageId === 'en' ? dTitle?.en_US : currentLanguageId === 'rus' ? dTitle?.rus : 'Date';

	const rows = [
		{
			id: 'action',
			align: 'right',
			disablePadding: false,
			label: actionTitle,
			sort: true
		},
		{
			id: 'Date',
			align: 'left',
			disablePadding: false,
			label: dateTitle,
			sort: true
		},
		{
			id: 'USD',
			align: 'left',
			disablePadding: false,
			label: usdTitle,
			sort: true
		},
		{
			id: 'LKR',
			align: 'left',
			disablePadding: false,
			label: lkrTitle,
			sort: true
		},
		{
			id: 'RUB',
			align: 'left',
			disablePadding: false,
			label: rubTitle,
			sort: true
		},
		{
			id: 'EUR',
			align: 'left',
			disablePadding: false,
			label: eurTitle,
			sort: true
		},
		{
			id: 'INR',
			align: 'left',
			disablePadding: false,
			label: inrTitle,
			sort: true
		},
		{
			id: 'CNY',
			align: 'left',
			disablePadding: false,
			label: cnyTitle,
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

export default ExchangeRateTableHeader;
