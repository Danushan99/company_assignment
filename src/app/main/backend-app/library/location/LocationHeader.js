/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import IconButton from '@mui/material/IconButton';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import EditLocationAltOutlinedIcon from '@mui/icons-material/EditLocationAltOutlined';
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip';
import LocationEditeDialog from './LocationEditeDialog';
import LocationDeleteDialog from './LocationDeleteDialog';
import LocationDialog from './LocationDialog';
import { setSearchText, openNewTodoDialog } from './store/todosSlice';

function LocationHeader(props) {
	const { isLoadingAnotherPage } = props;
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.locationsWordsList);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);
	const mainTheme = useSelector(selectMainTheme);
	const [anchorEl, setAnchorEl] = useState(null);
	const [isDeleteClicked, setIsDeleteClicked] = useState(false);
	const [openadddialog, setOpenadddialog] = useState(false);
	const [opendeletedialog, setOpendeletedialog] = useState(false);

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
	const searchInputText = findByKey(commonTranslateWordsArray, 'SEARCH_TEXT');
	const addNewBtn = findByKey(commonTranslateWordsArray, 'ADD_NEW_BTN');

	// page words translater
	const pageHeader = findByKey(wordsList, 'PAGE_HEADER');

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleClickOpen = () => {
		setOpenadddialog(true);
	};

	const handleCloseadddialog = () => {
		setOpenadddialog(false);
	};

	const handleClickOpendelete = () => {
		setOpendeletedialog(true);
	};

	const handleClosedeleteialog = () => {
		setOpendeletedialog(false);
	};

	return (
		<>
			<div>
				<ThemeProvider theme={mainTheme}>
					<Dialog open={openadddialog} onClose={handleCloseadddialog} fullWidth maxWidth="sm" scroll="body">
						<AppBar position="static" elevation={0}>
							<Toolbar className="flex w-full">
								<Typography variant="subtitle1" color="inherit">
									Edit Location
								</Typography>
							</Toolbar>
						</AppBar>
						<DialogContent>
							<LocationEditeDialog closebuttonclicked={openadddialog} />
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseadddialog} autoFocus>
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</ThemeProvider>
			</div>

			<div>
				<ThemeProvider theme={mainTheme}>
					<Dialog
						open={opendeletedialog}
						onClose={handleClosedeleteialog}
						fullWidth
						maxWidth="sm"
						scroll="body"
					>
						<AppBar position="static" elevation={0}>
							<Toolbar className="flex w-full">
								<Typography variant="subtitle1" color="inherit">
									Delete Location
								</Typography>
							</Toolbar>
						</AppBar>
						<DialogContent sx={{ backgroundColor: 'white' }}>
							<LocationDeleteDialog />
						</DialogContent>
						<DialogActions sx={{ backgroundColor: 'white' }}>
							<Button onClick={handleClosedeleteialog} autoFocus>
								Close
							</Button>
						</DialogActions>
					</Dialog>
				</ThemeProvider>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<div className="flex items-center">
						<Typography
							// component={motion.span}
							initial={{ x: -20 }}
							animate={{ x: 0, transition: { delay: 0.2 } }}
							delay={300}
							className="hidden sm:flex text-12 md:text-16 mx-12 font-semibold"
							sx={{ marginTop: '10px' }}
						>
							{t('LOCATIONS')}
						</Typography>
					</div>
				</Grid>
				<Grid item xs={6}>
					<ThemeProvider theme={mainTheme}>
						<Paper
							// component={motion.div}
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
							className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
						>
							<Icon color="action">search</Icon>

							<Input
								placeholder={
									currentLanguageId === 'en'
										? searchInputText?.en_US
										: currentLanguageId === 'rus'
										? searchInputText?.rus
										: t('SEARCH_LABLE')
								}
								className="flex flex-1 px-16"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(setSearchText(ev))}
							/>
						</Paper>
					</ThemeProvider>
				</Grid>
				{isLoadingAnotherPage === false && (
					<Grid item xs={3}>
						<Tooltip title="Add Location">
							<IconButton
								onClick={() => {
									setIsDeleteClicked(true);
									dispatch(openNewTodoDialog());
								}}
							>
								<AddLocationAltOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Edite Location">
							<IconButton onClick={handleClickOpen}>
								<EditLocationAltOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Delete Location">
							<IconButton onClick={handleClickOpendelete}>
								<WrongLocationOutlinedIcon />
							</IconButton>
						</Tooltip>
					</Grid>
				)}
			</Grid>
		</>
	);
}

export default LocationHeader;
