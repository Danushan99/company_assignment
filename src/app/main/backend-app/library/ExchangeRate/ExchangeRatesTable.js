/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eqeqeq */
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
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { findByKey } from 'app/main/utils/utils';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getExchangeRateList, openEditExchangeRateDialog } from './store/exchangeRateSlice';
import ExchangeRateTableHeader from './ExchangeRateTableHeader';
import DeleteReasonDialog from './DeleteReasonDialog';
import JwtService from "../../../../services/jwtService";

function ExchangeRatesTable(props) {
	const { data, setData } = props;
	const { t } = useTranslation();
	const dispatch = useDispatch();

	// const exchangeRates = useSelector(selectExchangeRates);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const searchText = useSelector(({ exchangeRateApp }) => exchangeRateApp.rates.searchText);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);
	// const [data, setData] = useState(props.data);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);

	// useEffect(() => {
	// 	dispatch(getExchangeRateList()).then(response => {
	// 		setData(response?.payload?.data);
	// 		setLoading(false);
	// 	});
	// }, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(data, item => item.Date.includes(searchText)));
			setPage(0);
		} else {
			dispatch(getExchangeRateList()).then(response => {
				setData(response?.payload?.data);
				setLoading(false);
			});
		}
	}, [dispatch, setData, searchText]);

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

	function handleChangePage(event, value) {
		setPage(value);
	}

	/**
	 *  Open delete confimation Dialog
	 */
	const handleClickDeleteConfirmationOpen = (ev, Date) => {
		ev.preventDefault();
		setOpenDeleteReasonDialog(true);
		setSelected(Date);

		JwtService.signInWithToken();
	};

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
		setPage(0);
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
					<ExchangeRateTableHeader
						selectedIds={selected}
						order={order}
						onRequestSort={handleRequestSort}
						rowCount={data?.length}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'Date': {
											return o.Date;
										}
										case 'USD': {
											return o.USD;
										}
										case 'LKR': {
											return o.LKR;
										}
										case 'RUB': {
											return o.RUB;
										}
										case 'EUR': {
											return o.EUR;
										}
										case 'INR': {
											return o.INR;
										}
										case 'CNY': {
											return o.CNY;
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
								// const isSelected = selected.indexOf(n.Date) !== -1;
								return (
									<TableRow
										className="h-24 cursor-pointer"
										hover
										role="checkbox"
										// aria-checked={isSelected}
										// tabIndex={-1}
										key={n.Date}
									>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											{n?.BlockDelete == 0 && (
												<IconButton
													aria-label="delete"
													size="small"
													onClick={event => {
														event.stopPropagation();
														handleClickDeleteConfirmationOpen(event, n.Date);
													}}
												>
													<DeleteOutlineOutlinedIcon fontSize="small" />
												</IconButton>
											)}
											{n?.BlockEdit == 0 && (
												<IconButton
													onClick={ev => {
														ev.preventDefault();
														dispatch(openEditExchangeRateDialog(n));
													}}
												>
													<Icon>edit</Icon>
												</IconButton>
											)}
										</TableCell>

										<TableCell align="left">{n.Date}</TableCell>

										<TableCell align="left">{n?.USD}</TableCell>

										<TableCell align="left">{n?.LKR}</TableCell>

										<TableCell align="left">{n?.RUB}</TableCell>

										<TableCell align="left">{n?.EUR}</TableCell>
										<TableCell align="left">{n?.INR}</TableCell>
										<TableCell align="left">{n?.CNY}</TableCell>
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

			<DeleteReasonDialog
				selectedIds={selected}
				openDeleteReasonDialog={openDeleteReasonDialog}
				setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
				setData={setData}
				data={data}
			/>
		</div>
	);
}

export default withRouter(ExchangeRatesTable);
