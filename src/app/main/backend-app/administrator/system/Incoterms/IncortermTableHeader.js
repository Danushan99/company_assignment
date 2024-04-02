/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { useSelector } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import DeleteReasonDialog from './DeleteReasonDialog';

function IncortermTableHeader(props) {
	const { selectedIds, setOpenDeleteReasonDialog, openDeleteReasonDialog } = props;

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
	const currencyDescriptionTitle = findByKey(wordsList, 'DES_ENG_TITLE');
	const DES_RUS_TITLE = findByKey(wordsList, 'DES_RUS_TITLE');
	const CODE_TITLE = findByKey(wordsList, 'CODE_TITLE');

	const actionTitle =
		currentLanguageId === 'en' ? actionTtle?.en_US : currentLanguageId === 'rus' ? actionTtle?.rus : 'Action';

	const codeTitle =
		currentLanguageId === 'en' ? CODE_TITLE?.en_US : currentLanguageId === 'rus' ? CODE_TITLE?.rus : 'Code';

	const desTitle =
		currentLanguageId === 'en'
			? currencyDescriptionTitle?.en_US
			: currentLanguageId === 'rus'
			? currencyDescriptionTitle?.rus
			: 'Description (Eng)';


	const rows = [
		{
			id: 'action',
			align: 'right',
			disablePadding: false,
			label: actionTitle,
			sort: false
		},
		{
			id: 'Code',
			align: 'left',
			disablePadding: false,
			label: codeTitle,
			sort: true
		},

		{
			id: 'nameEng',
			align: 'left',
			disablePadding: false,
			label: desTitle,
			sort: true
		},

		
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

export default IncortermTableHeader;
