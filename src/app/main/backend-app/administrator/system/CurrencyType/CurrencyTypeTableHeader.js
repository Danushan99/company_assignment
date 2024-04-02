/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
// import Checkbox from '@mui/material/Checkbox';
// import Icon from '@mui/material/Icon';
// import IconButton from '@mui/material/IconButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { useSelector } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import DeleteReasonDialog from './DeleteReasonDialog';

function CurrencyTypeTableHeader(props) {
	const { selectedIds, setOpenDeleteReasonDialog, openDeleteReasonDialog } = props;
	// const numSelected = selectedIds.length;

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
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
	const currencyDescriptionTitle = findByKey(wordsList, 'DES_TITLE');
	const currTitle = findByKey(wordsList, 'CURRENCY_TITLE');

	const actionTitle =
		currentLanguageId === 'en' ? actionTtle?.en_US : currentLanguageId === 'rus' ? actionTtle?.rus : 'Action';

	const currencyTitle =
		currentLanguageId === 'en' ? currTitle?.en_US : currentLanguageId === 'rus' ? currTitle?.rus : 'Currency';

	const desTitle =
		currentLanguageId === 'en'
			? currencyDescriptionTitle?.en_US
			: currentLanguageId === 'rus'
			? currencyDescriptionTitle?.rus
			: 'Description';

	const rows = [
		{
			id: 'action',
			align: 'right',
			disablePadding: false,
			label: actionTitle,
			sort: false
		},
		{
			id: 'currency',
			align: 'left',
			disablePadding: false,
			label: currencyTitle,
			sort: true
		},

		{
			id: 'currencyName',
			align: 'left',
			disablePadding: false,
			label: desTitle,
			sort: true
		}
	];

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-32 sm:h-32">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					<DeleteReasonDialog
						selectedIds={selectedIds}
						openDeleteReasonDialog={openDeleteReasonDialog}
						setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
					/>
				</TableCell>
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

export default CurrencyTypeTableHeader;
