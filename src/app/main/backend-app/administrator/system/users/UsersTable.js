/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { getUsers, selectUsers } from '../../store/systemUsersSlice';
import UsersTableHeader from './UsersTableHeader';

function UsersTable(props) {
	const dispatch = useDispatch();
	const users = useSelector(selectUsers);
	const searchText = useSelector(({ system }) => system.systemUsers.searchText);
	const authData = useSelector(({ auth }) => auth.user.data.userId);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(users);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		UserID: null
	});

	// useEffect(() => {
	// 	dispatch(getUsers()).then(() => setLoading(false));
	// }, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(users, item => item.FirstName.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(users);
		}
	}, [users, searchText]);

	function handleRequestSort(event, property) {
		const UserID = property;
		let direction = 'desc';

		if (order.UserID === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			UserID
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.UserID));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		props.navigate(`/administration/system/users/${item.UserID}`);
	}

	function handleCheck(event, UserID) {
		const selectedIndex = selected.indexOf(UserID);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, UserID);
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
		setPage(0)
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no users!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<UsersTableHeader
						selectedUsersIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order.UserID) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order.UserID];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.UserID) !== -1;
								return (
									<TableRow
										className="h-24 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.UserID}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										<TableCell className="w-40 md:w-64 text-center" padding="none">
											{authData !== n.UserID && (
												<Checkbox
													checked={isSelected}
													onClick={event => event.stopPropagation()}
													onChange={event => handleCheck(event, n.UserID)}
												/>
											)}
										</TableCell>

										<TableCell
											className="w-52 px-4 md:px-0"
											component="th"
											scope="row"
											padding="none"
										>
											{n.ProfilePicture ? (
												<img
													className="w-full block rounded"
													src={n.ProfilePicture}
													alt={n.FirstName}
												/>
											) : (
												<img
													className="w-full block rounded"
													src="assets/images/ecommerce/product-image-placeholder.png"
													alt={n.FirstName}
												/>
											)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.JobTitle}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{`${n?.FirstName}  ${n?.LastName}`}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n?.Email}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											{n?.Extention}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											{n.JoinDate !== null ? moment(n?.JoinDate).format('D-M-Y') : null}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
											{n.Availability === '1' ? (
												<Icon className="text-green text-20">check_circle</Icon>
											) : (
												<Icon className="text-red text-20">remove_circle</Icon>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="shrink-0 border-t-1"
				component="div"
				count={data.length}
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
			/>
		</div>
	);
}

export default withRouter(UsersTable);
