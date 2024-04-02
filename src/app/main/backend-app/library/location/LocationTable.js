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
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
// import DeleteReasonDialog from './DeleteReasonDialog';
import LocationTableHeader from './LocationTableHeader';
import { selectLocations, getLocations, setSearchText } from './store/todosSlice';

function LocationTable(props) {
	const {
		isLoadingAnotherPage,
		openrouteorigin,
		openroutedestination,
		setSelectedLoactionKeyfordestination,
		setOpenLocationModel,
		setSelectedLoactionKey,
		setSelectedLoactionKeyfororigin,
		setHBLSettlementAt,
		setrouteorigin,
		setOpenLocationModelfororigin,
		openbasicinfolocation,
		setroutedestination,
		setOpenLocationModelfordestination,
		openCountryModel,
		showCountry,
		setSelectedCountry,
		setOpenCountryModel
	} = props;
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const allLocations = useSelector(({ todoApp }) => todoApp.todos.all);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.locationsWordsList);
	const notCurrentUrlWordsList = useSelector(({ words }) => words.preList); // not current url words
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const [loading, setLoading] = useState(true);

	const [data, setData] = useState(allLocations);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});

	// useEffect(() => {
	// 	if (searchText.length !== 0) {
	// 		setData(
	// 			_.filter(
	// 				data,
	// 				item =>
	// 					item.Country?.toLowerCase().includes(searchText.toLowerCase()) ||
	// 					item.Ports?.toLowerCase().includes(searchText.toLowerCase()) ||
	// 					item.City?.toLowerCase().includes(searchText.toLowerCase()) ||
	// 					item.Terminal?.toLowerCase().includes(searchText.toLowerCase())
	// 			)
	// 		);
	// 		setPage(0);
	// 	} else {
	// 		setData(allLocations);
	// 		setLoading(false);
	// 	}
	// }, [dispatch, setData, searchText, allLocations]);

	const filteredData = useMemo(() => {
		if (searchText.length !== 0) {
			return _.filter(
				data,
				item =>
					item.Country?.toLowerCase().includes(searchText.toLowerCase()) ||
					item.Ports?.toLowerCase().includes(searchText.toLowerCase()) ||
					item.City?.toLowerCase().includes(searchText.toLowerCase()) ||
					item.Terminal?.toLowerCase().includes(searchText.toLowerCase())
			);
		}
		return allLocations;
	}, [data, allLocations, searchText]);

	useEffect(() => {
		setData(filteredData);
		setPage(0);
		setLoading(false);
	}, [setData, setPage, filteredData]);

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

	// function splitLocationKey(locationKeyString) {
	// 	// Reverse the string and split it by underscores
	// 	const reversedParts = locationKeyString.split('_').reverse();

	// 	let result = '';
	// 	// Iterate through the parts to find the first non-zero part
	// 	for (const part of reversedParts) {
	// 		if (part !== '0') {
	// 			result = part;
	// 			break;
	// 		}
	// 	}
	// 	return result;
	// }
	/**
	 * when load another page then select location
	 * @param {*} locationInfo
	 */
	const handleSelectLocationItem = (event, locationInfo) => {
		event.preventDefault();
		if (openrouteorigin === true) {
			setSelectedLoactionKeyfororigin(locationInfo?.Key);

			if (locationInfo?.Terminal !== null) {
				// If Terminal is not null, set HBLSettlementAt to Terminal
				setrouteorigin(locationInfo?.Terminal);
			} else if (locationInfo?.Ports !== null) {
				// If Terminal is null but Ports is not null, set HBLSettlementAt to Ports
				setrouteorigin(locationInfo?.Ports);
			} else if (locationInfo?.City !== null) {
				// If Terminal and Ports are null but City is not null, set HBLSettlementAt to City
				setrouteorigin(locationInfo?.City);
			}
			setOpenLocationModelfororigin(false);
		} else if (openbasicinfolocation === true) {
			setSelectedLoactionKey(locationInfo?.Key);

			if (locationInfo?.Terminal !== null) {
				// If Terminal is not null, set HBLSettlementAt to Terminal
				setHBLSettlementAt(locationInfo?.Terminal);
			} else if (locationInfo?.Ports !== null) {
				// If Terminal is null but Ports is not null, set HBLSettlementAt to Ports
				setHBLSettlementAt(locationInfo?.Ports);
			} else if (locationInfo?.City !== null) {
				// If Terminal and Ports are null but City is not null, set HBLSettlementAt to City
				setHBLSettlementAt(locationInfo?.City);
			}
			setOpenLocationModel(false);
		} else if (openroutedestination === true) {
			setSelectedLoactionKeyfordestination(locationInfo?.Key);

			if (locationInfo?.Terminal !== null) {
				// If Terminal is not null, set HBLSettlementAt to Terminal
				setroutedestination(locationInfo?.Terminal);
			} else if (locationInfo?.Ports !== null) {
				// If Terminal is null but Ports is not null, set HBLSettlementAt to Ports
				setroutedestination(locationInfo?.Ports);
			} else if (locationInfo?.City !== null) {
				// If Terminal and Ports are null but City is not null, set HBLSettlementAt to City
				setroutedestination(locationInfo?.City);
			}
			setOpenLocationModelfordestination(false);
		} else if (openCountryModel === true && showCountry === true) {
			setSelectedLoactionKey(locationInfo?.Key);
			if (locationInfo?.Country !== null) {
				// If Country is not null, set setSelectedCountry to Country
				setSelectedCountry(locationInfo?.Country);
			}
			setOpenCountryModel(false);
		}
		dispatch(setSearchText(event));
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
	// current url words
	const errorMsgForEmptyResult = findByKey(wordsList || notCurrentUrlWordsList, 'ERROR_MSG_EMPTY_RESULT');
	const pageRowsTitle = findByKey(wordsList || notCurrentUrlWordsList, 'ROWP_TITLE');

	// const errorText = findByKey(wordsList, 'ERROR_MSG_EMPTY_RESULT');

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
					<LocationTableHeader order={order} onRequestSort={handleRequestSort} rowCount={data?.length} />

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.id) {
										case 'action': {
											return o.action;
										}
										case 'Country': {
											return o.Country;
										}
										case 'City': {
											return o.City;
										}
										case 'Port': {
											return o.Port;
										}
										case 'Terminal': {
											return o.Terminal;
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
									<TableRow className="h-24 cursor-pointer" hover role="checkbox" key={n?.Key}>
										<TableCell className="text-center" padding="none">
											{isLoadingAnotherPage === true && (
												<div className="flex items-center">
													<IconButton
														onClick={event => {
															event.stopPropagation();
															handleSelectLocationItem(event, n);
														}}
													>
														<PlaylistAddIcon />
													</IconButton>
												</div>
											)}
										</TableCell>
										<TableCell align="left">{n?.Country}</TableCell>

										<TableCell align="left">{n?.City}</TableCell>

										<TableCell align="left">{n?.Ports}</TableCell>

										<TableCell align="left">{n?.Terminal}</TableCell>
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

export default withRouter(LocationTable);
