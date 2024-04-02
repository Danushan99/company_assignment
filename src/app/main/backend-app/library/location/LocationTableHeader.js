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

function LocationTableHeader(props) {
	const { t } = useTranslation();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.locationsWordsList);
	const notCurrentUrlWordsList = useSelector(({ words }) => words.preList); // not current url words
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

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

	const actionTitle =
		currentLanguageId === 'en' ? actionTtle?.en_US : currentLanguageId === 'rus' ? actionTtle?.rus : 'Action';

	const countryText = findByKey(wordsList, 'COUNTRY_TEXT');
	const cityText = findByKey(wordsList, 'CITY_TEXT');
	const portText = findByKey(wordsList, 'PORT_TEXT');
	const terminalText = findByKey(wordsList, 'TERMINAL_TEXT');

	const countryTitle =
		currentLanguageId === 'en' ? countryText?.en_US : currentLanguageId === 'rus' ? countryText?.rus : 'Country';

	const cityTitle =
		currentLanguageId === 'en' ? cityText?.en_US : currentLanguageId === 'rus' ? cityText?.rus : 'City';

	const portTitle =
		currentLanguageId === 'en' ? portText?.en_US : currentLanguageId === 'rus' ? portText?.rus : 'Port';

	const terminalTitle =
		currentLanguageId === 'en' ? terminalText?.en_US : currentLanguageId === 'rus' ? terminalText?.rus : 'Terminal';

	const rows = [
		{
			id: 'action',
			align: 'right',
			disablePadding: false,
			label: actionTitle,
			sort: false
		},
		{
			id: 'Country',
			align: 'left',
			disablePadding: false,
			label: countryTitle,
			sort: true
		},
		{
			id: 'City',
			align: 'left',
			disablePadding: false,
			label: cityTitle,
			sort: true
		},
		{
			id: 'Port',
			align: 'left',
			disablePadding: false,
			label: portTitle,
			sort: true
		},
		{
			id: 'Terminal',
			align: 'left',
			disablePadding: false,
			label: terminalTitle,
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

export default LocationTableHeader;
