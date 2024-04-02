/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-bind */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
// import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Alert } from '@mui/lab';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteReasonDialog from './DeleteReasonDialog';
import AgrementTableHeader from './AgrementTableHeader';
import { getAgreementList } from './store/agrementSlice';

function AgrementTable(props) {
	const { agrimentfiledclick, subvendorcode, setSelectedAgreementItem, setOpenAgreement, dataList } = props;

	const { t } = useTranslation();
	const dispatch = useDispatch();
	const allAgreementsList = useSelector(({ agreementApp }) => agreementApp.agreements.all);
	const totalRowCount = useSelector(({ agreementApp }) => agreementApp.agreements.count);
	// const exchangeRates = useSelector(selectExchangeRates);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const searchText = useSelector(({ agreementApp }) => agreementApp.agreements.searchText);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);
	const [data, setData] = useState(dataList);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [open, setOpen] = useState(false);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);

	const [totalCount, setTotalCount] = useState(totalRowCount);
	const [pageCount, setPageCount] = useState(100);
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		const paramsData = {
			limits: pageCount,
			offsets: pageNumber
		};
		setLoading(true);
		dispatch(getAgreementList({ params: paramsData }))
			.then(res => {
				setData(res?.payload?.data?.rows);
				setTotalCount(res?.payload?.data?.count);
				setLoading(false);
			})
			.catch(error => {
				// Handle error
				setLoading(false);
			});
	}, [pageNumber, pageCount]);

	useEffect(() => {
		if (searchText.length !== 0 && data?.length > 0) {
			setData(
				_.filter(
					dataList,
					item =>
						item?.ContactCode?.toLowerCase().includes(searchText.toLowerCase()) ||
						item?.Type?.toLowerCase().includes(searchText.toLowerCase()) ||
						item?.CompanyName?.toLowerCase().includes(searchText.toLowerCase())
				)
			);

			setPage(0);
		} else {
			setData(dataList);
			setLoading(false);
		}
	}, [dispatch, setData, dataList, searchText]);

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
	};

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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSelectAgreementItem = agreementid => () => {
		setSelectedAgreementItem(agreementid);
		// addBuyItem(itemName);
		setOpenAgreement(false);
	};

	/**
	 * pagination
	 * @param {*} event
	 * @param {*} newPageNumber
	 */
	const handlePageChange = (event, newPageNumber) => {
		setPageNumber(newPageNumber);
	};

	return (
		<>
			<div className="w-full flex flex-col">
				{!loading && data?.length > 0 && agrimentfiledclick !== true && (
					<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
						<Pagination
							count={Math.ceil(totalCount / pageCount)}
							page={pageNumber}
							onChange={handlePageChange}
						/>
					</Stack>
				)}
				<FuseScrollbars className="grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
						<AgrementTableHeader
							selectedIds={selected}
							order={order}
							onRequestSort={handleRequestSort}
							rowCount={data?.length}
						/>

						<TableBody>
							{_.orderBy(
								agrimentfiledclick ? data.filter(item => item.ContactCode === subvendorcode) : data,
								[
									o => {
										switch (order.id) {
											case 'ID': {
												return o.AgreementID;
											}
											case 'Code': {
												return o.ContactCode;
											}
											case 'AgID': {
												return o.AgreementNo;
											}
											case 'Company': {
												return o.CompanyName;
											}
											case 'AgType': {
												return o.Type;
											}
											case 'TCurrency': {
												return o.TariffCcy;
											}
											case 'ICurrency': {
												return o.InvoiceCcy;
											}
											case 'SCurrency': {
												return o.SettlementCcy;
											}
											case 'SignOn': {
												return o.SignDate;
											}
											case 'ExpireOn': {
												return o.ExpireDate;
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
											key={n.AgreementID}
										>
											<TableCell className="w-40 md:w-64 text-center" padding="none">
												{agrimentfiledclick === true && (
													<div className="flex items-center">
														<IconButton onClick={handleSelectAgreementItem(n?.AgreementNo)}>
															<PlaylistAddIcon />
														</IconButton>
													</div>
												)}
											</TableCell>

											<TableCell align="left">{n.AgreementID}</TableCell>

											<TableCell
												align="left"
												// onClick={handleClickOpen}
											>
												{n?.ContactCode}
											</TableCell>

											<TableCell align="left" style={{ width: '120px' }}>
												{n?.AgreementNo}
											</TableCell>

											<TableCell align="left">{n?.CompanyName}</TableCell>
											<TableCell align="left">{n?.Type}</TableCell>

											<TableCell align="left">{n?.TariffCcy}</TableCell>
											<TableCell align="left">{n?.InvoiceCcy}</TableCell>
											<TableCell align="left">{n?.SettlementCcy}</TableCell>
											<TableCell align="left" style={{ width: '120px' }}>
												{n?.SignDate}
											</TableCell>
											<TableCell align="left" style={{ width: '120px' }}>
												{n?.ExpireDate}
											</TableCell>
										</TableRow>
									);
								})}
							{agrimentfiledclick === true &&
								agrimentfiledclick &&
								data.filter(item => item.ContactCode === subvendorcode).length === 0 && (
									<TableRow>
										<TableCell colSpan={11}>
											<Alert severity="error">No Agreement Found !</Alert>
										</TableCell>
									</TableRow>
								)}

							{agrimentfiledclick === true &&
								data.filter(item => item.ContactCode === subvendorcode).length === 0 &&
								setSelectedAgreementItem('')}
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
		</>
	);
}

export default withRouter(AgrementTable);
