/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-bind */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Icon from '@mui/material/Icon';
import { Link } from 'react-router-dom';
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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteReasonDialog from './DeleteReasonDialog';
import ContactsHeader from './ContactsTableHeader';
import {
	updateStarredContact,
	selectContacts,
	OpenViewContactDetailDialog,
	setContactsSearchText
} from './store/contactsSlice';
import { viewContact } from './store/singleContactSlice';

function ContactsTable(props) {
	const {
		isloardingcontactontarrif,
		isLoadingContacts,
		setOpenContacts,
		setOpenImp1,
		setCustomerID,
		setSelectedVendorItem,
		setSelectedVendorNameImp1,
		addBuyItem,
		setSelectedVendorItemId,
		openCustomer,
		setOpenCustomer,
		openexp1,
		setOpenexp1,
		setSelectedVendorNameExp1,
		openNotify1,
		setOpenNotify1,
		setSelectedNameNotify1,
		openShipingLine,
		setSelectedNameShipinline,
		openexp2,
		setOpenexp2,
		setSelectedopenexp2,
		setSelectedopenexp3,
		openexp3,
		setOpenexp3,
		openimoorter2,
		openimoorter3,
		openNotify2,
		setSelectedopenimporter2,
		setSelectedopenimporter3,
		setSelectedopennotify2,
		setSelectedopennotify3,
		openNotify3,
		openNotify4,
		setSelectedopennotify4,
		openNotify5,
		setSelectedopennotify5,
		setOpenShipingLine,
		openvendorbuy,
		opensubvendorbuy,
		setSelectedsubVendorItem,
		openvendorsell,
		setSelectedVendorSellItem,
		setSelectedVendorSellItemID,
		setSelectedsubVendorItemId
	} = props;
	const { t } = useTranslation();
	const dispatch = useDispatch();

	// const contacts = useSelector(selectContacts);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.contactwordsList);
	const notCurrentUrlWordsList = useSelector(({ words }) => words.preList); // not current url words
	const searchText = useSelector(({ addressBookApp }) => addressBookApp.contacts.searchText);
	const allContactsList = useSelector(({ addressBookApp }) => addressBookApp.contacts.all);
	const filteredContactList = useSelector(({ addressBookApp }) => addressBookApp.contacts.rows);
	const filterType = useSelector(({ addressBookApp }) => addressBookApp.contacts.type);
	const [loading, setLoading] = useState(isLoadingContacts);
	const [selected, setSelected] = useState(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	useEffect(() => {
		setLoading(isLoadingContacts);
	}, [isLoadingContacts]);

	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);
	const [data, setData] = useState(allContactsList);

	// Memoize the filtered data to improve performance

	const filteredContacts = useMemo(() => {
		setLoading(true);
		const lowerSearchText = searchText.toLowerCase();
		if (filterType && filterType === 'filterd') {
			if (searchText) {
				const fliterdData = filteredContactList?.filter(
					item =>
						item.ContactID === Number(searchText) ||
						item.ContactCode.toLowerCase().includes(lowerSearchText) ||
						item.Email.toLowerCase().includes(lowerSearchText) ||
						item.Telephone.toLowerCase().includes(lowerSearchText) ||
						item.CompanyName.toLowerCase().includes(lowerSearchText)
				);
				setLoading(false);
				setData(fliterdData);
				return fliterdData;
			}
			setLoading(false);
			setData(filteredContactList);
			return filteredContactList;
		}
		setLoading(true);
		if (searchText) {
			const fliterdData = allContactsList.filter(
				item =>
					item.ContactID === Number(searchText) ||
					item.ContactCode.toLowerCase().includes(lowerSearchText) ||
					item.Email.toLowerCase().includes(lowerSearchText) ||
					item.Telephone.toLowerCase().includes(lowerSearchText) ||
					item.CompanyName.toLowerCase().includes(lowerSearchText)
			);
			setLoading(false);
			setData(fliterdData);
			return fliterdData;
		}
		setLoading(false);
		setData(allContactsList);
		return allContactsList;
	}, [allContactsList, filteredContactList, filterType, searchText]);

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
	 * marked start contact
	 * @param {*} event
	 * @param {*} contactID
	 */
	const handleStarClick = (event, contactID) => {
		event.stopPropagation();
		dispatch(updateStarredContact({ conid: contactID }));
	};

	/**
	 *  Open delete confimation Dialog
	 */
	const handleClickDeleteConfirmationOpen = (ev, ID) => {
		ev.preventDefault();
		setOpenDeleteReasonDialog(true);
		setSelected(ID);
	};

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
		setPage(0);
	}

	/**
	 * selected vendor id on insert tariff section
	 * @param {*} itemId
	 * @param {*} itemName
	 * @returns
	 */
	const handleSelectContactItem = (event, contactInfo) => {
		event.preventDefault();
		console.log('check contact information======', contactInfo);
		console.log('check is true', openvendorbuy);
		if (setOpenImp1 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedVendorNameImp1(contactInfo);
			setOpenContacts(false);
		} else if (openCustomer === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedVendorItem(contactInfo?.ContactCode);
			setCustomerID(contactInfo);
			setOpenContacts(false);
			setOpenCustomer(false);
		} else if (openexp1 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedVendorNameExp1(contactInfo);
			setOpenContacts(false);
			setOpenexp1(false);
		} else if (openNotify1 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedNameNotify1(contactInfo);
			setOpenContacts(false);
			setOpenNotify1(false);
		} else if (openShipingLine === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedNameShipinline(contactInfo);
			setOpenContacts(false);
			setOpenShipingLine(false);
		} else if (openexp2 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedopenexp2(contactInfo);
			setOpenContacts(false);
			setOpenexp2(false);
		} else if (openexp3 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedopenexp3(contactInfo);
			setOpenContacts(false);
			setOpenexp3(false);
		} else if (openimoorter2 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedopenimporter2(contactInfo);
			setOpenContacts(false);
		} else if (openimoorter3 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedopenimporter3(contactInfo);
			setOpenContacts(false);
		} else if (openNotify2 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedopennotify2(contactInfo);
			setOpenContacts(false);
		} else if (openNotify3 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedopennotify3(contactInfo);
			setOpenContacts(false);
		} else if (openNotify4 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedopennotify4(contactInfo);
			setOpenContacts(false);
		} else if (openNotify5 === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedopennotify5(contactInfo);
			setOpenContacts(false);
		} else if (openvendorbuy === true) {
			setSelectedVendorItemId(contactInfo?.ContactID);
			setSelectedVendorItem(contactInfo?.ContactCode);
			setOpenContacts(false);
		} else if (opensubvendorbuy === true) {
			setSelectedsubVendorItem(contactInfo?.ContactCode);
			setSelectedsubVendorItemId(contactInfo?.ContactID);
			// setSelectedVendorItemId(contactInfo?.ContactID);
			// setSelectedVendorItem(contactInfo?.ContactCode);
			setOpenContacts(false);
		} else if (openvendorsell == true) {
			setSelectedVendorSellItemID(contactInfo?.ContactID);
			setSelectedVendorSellItem(contactInfo?.ContactCode);
			setOpenContacts(false);
		}

		dispatch(setContactsSearchText(event));
	};

	function findByKey(arr, findVal) {
		if (arr?.length > 0) {
			const found = arr?.find(obj => {
				return obj.headerKey === findVal;
			});
			return found;
		}
		return '';
	}
	// current url words
	const errorMsgForEmptyResult = findByKey(wordsList || notCurrentUrlWordsList, 'ERROR_MSG_EMPTY_RESULT');
	const pageRowsTitle = findByKey(wordsList || notCurrentUrlWordsList, 'ROWP_TITLE');

	// const errorText = findByKey(wordsList, 'ERROR_MSG_EMPTY_RESULT');

	if (loading && filteredContacts?.length === 0) {
		return <FuseLoading />;
	}
	if (!loading && filteredContacts?.length === 0) {
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
					<ContactsHeader
						selectedIds={selected}
						order={order}
						onRequestSort={handleRequestSort}
						rowCount={filteredContacts?.length}
					/>

					<TableBody>
						{_.orderBy(
							filteredContacts,
							[
								o => {
									switch (order.id) {
										case 'ID': {
											return o.ContactID;
										}
										case 'Code': {
											return o.ContactCode;
										}
										case 'Company': {
											return o.CompanyName;
										}
										case 'Email': {
											return o.Email;
										}
										case 'Phone': {
											return o.Telephone;
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
									<TableRow className="h-24 cursor-pointer" hover role="checkbox" key={n?.ContactID}>
										<TableCell className="text-center" padding="none">
											{isloardingcontactontarrif === false && (
												<div className="flex items-center">
													<IconButton
														onClick={ev => handleStarClick(ev, n?.ContactID)}
														size="small"
													>
														{n?.Starred && n?.Starred == 1 ? (
															<Icon className="text-yellow-700">star</Icon>
														) : (
															<Icon>star_border</Icon>
														)}
													</IconButton>
													{n?.BlockDelete == 0 && (
														<IconButton
															aria-label="delete"
															size="small"
															onClick={event => {
																event.stopPropagation();
																handleClickDeleteConfirmationOpen(event, n?.ContactID);
															}}
														>
															<DeleteOutlineOutlinedIcon fontSize="small" />
														</IconButton>
													)}
													{n?.BlockEdite == 0 && (
														<IconButton
															component={Link}
															to={`/library/contacts/${n?.ContactID}`}
														>
															<Icon>edit</Icon>
														</IconButton>
													)}

													<IconButton aria-label="view" className="p-1">
														<ContentPasteSearchOutlinedIcon
															className="p-1"
															onClick={event => {
																dispatch(OpenViewContactDetailDialog(n?.ContactID));
																dispatch(viewContact(n?.ContactID));
															}}
														/>
													</IconButton>
												</div>
											)}
											{isloardingcontactontarrif === true && (
												<div className="flex items-center">
													<IconButton
														onClick={event => {
															event.stopPropagation();
															handleSelectContactItem(event, n);
														}}
													>
														<PlaylistAddIcon />
													</IconButton>
												</div>
											)}
										</TableCell>

										<TableCell align="left">{n?.ContactID}</TableCell>
										<TableCell align="left">{n?.ContactCode}</TableCell>
										<TableCell align="left">{n?.CompanyName}</TableCell>
										<TableCell align="left">{n?.Email}</TableCell>
										<TableCell align="left">{n?.Telephone}</TableCell>
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
				deleteSection=""
				selectedKey=""
			/>
		</div>
	);
}

export default withRouter(ContactsTable);
