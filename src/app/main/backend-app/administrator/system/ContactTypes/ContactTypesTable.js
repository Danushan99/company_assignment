/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { getContainerTypes, selectContainerTypes, openEditContainerTypeDialog } from './store/ContactTypesSlice';
import ContactTypeTableHeader from './ContactTypeTableHeader';

function ContactTypesTable(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const containerTyes = useSelector(selectContainerTypes);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const searchText = useSelector(({ contactTypeApp }) => contactTypeApp.contactTypes.searchText);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(containerTyes);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getContainerTypes()).then(response => {
			setLoading(false);
		});
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(
				_.filter(containerTyes, item =>
					currentLanguageId === 'rus'
						? item.rus?.toLowerCase().includes(searchText?.toLowerCase())
						: item.en_US?.toLowerCase().includes(searchText?.toLowerCase())
				)
			);
			setPage(0);
		} else {
			setData(containerTyes);
		}
	}, [containerTyes, searchText, currentLanguageId]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.ContactTypeID));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleCheck(event, ContactTypeID) {
		const selectedIndex = selected.indexOf(ContactTypeID);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, ContactTypeID);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
		setPage(0);
	}

	function findByKey(arr, findVal) {
		if (arr?.length > 0) {
			const found = arr?.find(obj => {
				return obj.headerKey === findVal;
			});
			return found;
		}
		return '';
	}
	const errorMsgForEmptyResult = findByKey(wordsList, 'ERROR_MSG_EMPTY_RESULT');
	const pageRowsTitle = findByKey(wordsList, 'ROWP_TITLE');

	if (loading) {
		return <FuseLoading />;
	}

	if (data?.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					{currentLanguageId === 'en'
						? errorMsgForEmptyResult?.en_US
						: currentLanguageId === 'rus'
						? errorMsgForEmptyResult?.rus
						: t('ERROR_MSG_EMPTY_RESULT')}
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<ContactTypeTableHeader
						selectedIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data?.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'Name': {
											return o.Name;
										}
										case 'Weight': {
											return o.Weight;
										}
										case 'Height': {
											return o.Height;
										}
										case 'Length': {
											return o.Length;
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.ContactTypeID) !== -1;
								return (
									<TableRow
										className="h-24 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.ContactTypeID}
										selected={isSelected}
									>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.ContactTypeID)}
											/>
										</TableCell>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											<IconButton
												onClick={ev => {
													ev.preventDefault();
													dispatch(openEditContainerTypeDialog(n));
												}}
											>
												<Icon>edit</Icon>
											</IconButton>
										</TableCell>

										<TableCell align="left">
											{currentLanguageId === 'en' ? n?.en_US : n?.rus}
										</TableCell>

										<TableCell align="left">{n?.Weight}</TableCell>

										<TableCell align="left">{n?.Height}</TableCell>

										<TableCell align="left">{n?.Length}</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="shrink-0 border-t-1"
				component="div"
				count={data?.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelRowsPerPage={
					currentLanguageId === 'en'
						? pageRowsTitle?.en_US
						: currentLanguageId === 'rus'
						? pageRowsTitle?.rus
						: 'Rows per page'
				}
			/>
		</div>
	);
}

export default withRouter(ContactTypesTable);
