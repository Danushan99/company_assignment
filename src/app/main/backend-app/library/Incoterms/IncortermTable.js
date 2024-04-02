/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import incortermslibrary, { selectInterComs, getIntercomList, openEditIntercomeDialog } from './store/IncotermSlice';
import IncortermTableHeader from './IncortermTableHeader';

function IncortermTable(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const interComs = useSelector(selectInterComs);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const searchText = useSelector(({ IncortermApplibrary }) => IncortermApplibrary.incortermslibrary.searchText);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(interComs);
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	useEffect(() => {
		dispatch(getIntercomList()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(
				_.filter(interComs, item =>
					currentLanguageId === 'rus'
						? item.rus.toLowerCase().includes(searchText.toLowerCase())
						: item.en_US.toLowerCase().includes(searchText.toLowerCase())
				)
			);
			setPage(0);
		} else {
			setData(interComs);
		}
	}, [interComs, searchText]);

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

	/**
	 *  Open delete confimation Dialog
	 */
	const handleClickDeleteConfirmationOpen = (ev, key) => {
		ev.preventDefault();
		setOpenDeleteReasonDialog(true);
		setSelected(key);
	};

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
					<IncortermTableHeader
						selectedIds={selected}
						order={order}
						onRequestSort={handleRequestSort}
						rowCount={data?.length}
						setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
						openDeleteReasonDialog={openDeleteReasonDialog}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'Code': {
											return o.Code;
										}
										case 'nameEng': {
											return o.nameEng;
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
								return (
									<TableRow className="h-24 cursor-pointer" hover role="checkbox" key={n.IncoTermID}>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											{/* <IconButton*/}
											{/*	onClick={ev => {*/}
											{/*		ev.preventDefault();*/}
											{/*		dispatch(openEditIntercomeDialog(n));*/}
											{/*	}}*/}
											{/* >*/}
											{/*	<Icon>edit</Icon>*/}
											{/* </IconButton>*/}
										</TableCell>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											{/* <IconButton*/}
											{/*	aria-label="delete"*/}
											{/*	size="small"*/}
											{/*	onClick={event => {*/}
											{/*		event.stopPropagation();*/}
											{/*		handleClickDeleteConfirmationOpen(event, n?.IncoTermID);*/}
											{/*	}}*/}
											{/* >*/}
											{/*	<DeleteOutlineOutlinedIcon fontSize="small" />*/}
											{/* </IconButton>*/}
										</TableCell>

										<TableCell align="left">{n?.Code}</TableCell>
										{currentLanguageId === 'en' && <TableCell align="left">{n?.en_US}</TableCell>}
										{currentLanguageId === 'rus' && <TableCell align="left">{n?.rus}</TableCell>}
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

export default withRouter(IncortermTable);
