/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-sequences */
/* eslint-disable react-hooks/exhaustive-deps */
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import DeleteReasonDialog from './DeleteReasonDialog';
import JwtService from "../../../../../services/jwtService";

function FileUploadTypeTableHeader(props) {
	const { selectedIds } = props;
	const numSelected = selectedIds.length;

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const [selectedUsersMenu, setSelectedUsersMenu] = useState(null);
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);
	const [selectedIdsArray, setSelectedIdsArray] = useState(selectedIds);

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
	const deleteBtn = findByKey(commonTranslateWordsArray, 'DELETE_BTN');
	// common words translater
	const descriptionTitle = findByKey(wordsList, 'DES_TITLE');
	const fileuploadTypeTitle = findByKey(wordsList, 'FUT_TITLE');

	const removeBtn =
		currentLanguageId === 'en' ? deleteBtn?.en_US : currentLanguageId === 'rus' ? deleteBtn?.rus : 'Remove';

	const actionTitle =
		currentLanguageId === 'en' ? actionTtle?.en_US : currentLanguageId === 'rus' ? actionTtle?.rus : 'Action';

	const desTitle =
		currentLanguageId === 'en'
			? descriptionTitle?.en_US
			: currentLanguageId === 'rus'
			? descriptionTitle?.rus
			: 'Description';

	const fTypeTitle =
		currentLanguageId === 'en'
			? fileuploadTypeTitle?.en_US
			: currentLanguageId === 'rus'
			? fileuploadTypeTitle?.rus
			: 'File Upload Type';

	const rows = [
		{
			id: 'action',
			align: 'right',
			disablePadding: false,
			label: actionTitle,
			sort: true
		},
		{
			id: 'fileUploadType',
			align: 'left',
			disablePadding: false,
			label: fTypeTitle,
			sort: true
		},

		{
			id: 'description',
			align: 'left',
			disablePadding: false,
			label: desTitle,
			sort: true
		}
	];

	useEffect(() => {
		setSelectedIdsArray(selectedIds);
	}),
		[selectedIds];

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openSelectedUsersMenu(event) {
		setSelectedUsersMenu(event.currentTarget);
	}

	function closeSelectedUsersMenu() {
		setSelectedUsersMenu(null);
	}

	/**
	 *  Open  Dialog
	 */
	const handleClickOpen = () => {
		setOpenDeleteReasonDialog(true);
		//for refresh the token
		JwtService.signInWithToken();
	};

	return (
		<TableHead>
			<TableRow className="h-32 sm:h-32">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99">
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < props.rowCount}
						checked={props.rowCount !== 0 && numSelected === props.rowCount}
						onChange={props.onSelectAllClick}
					/>
					{numSelected > 0 && (
						<Box
							className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-32 z-10 border-b-1"
							sx={{
								background: theme => theme.palette.background.paper
							}}
						>
							<IconButton
								aria-owns={selectedUsersMenu ? 'selectedUsersMenu' : null}
								aria-haspopup="true"
								onClick={openSelectedUsersMenu}
								size="large"
							>
								<Icon>more_horiz</Icon>
							</IconButton>
							<Menu
								id="selectedUsersMenu"
								anchorEl={selectedUsersMenu}
								open={Boolean(selectedUsersMenu)}
								onClose={closeSelectedUsersMenu}
							>
								<MenuList>
									<MenuItem
										onClick={() => {
											setSelectedIdsArray(selectedIds);
											handleClickOpen();
										}}
									>
										<ListItemIcon className="min-w-40">
											<Icon>delete</Icon>
										</ListItemIcon>
										<ListItemText primary={removeBtn} />
									</MenuItem>
								</MenuList>
							</Menu>
							<DeleteReasonDialog
								selectedIds={selectedIds}
								openDeleteReasonDialog={openDeleteReasonDialog}
								setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
								closeSelectedUsersMenu={closeSelectedUsersMenu}
								onMenuItemClickHandle={props.onMenuItemClick}
							/>
						</Box>
					)}
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

export default FileUploadTypeTableHeader;
