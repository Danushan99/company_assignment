import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import _ from '@lodash';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { Alert } from '@mui/lab';
import { saveUser } from '../../administrator/store/systemUserSlice';
import { removeCoutry, saveCountry, updatecountry } from './store/addCountrySlice';
import { removeCity, saveCity, updatecity } from './store/addCitySlice';
import { removePort, saveport, updateport } from './store/addportSlice';
import { removeTerminal, saveterminal, updateTerminal } from './store/addterminal';
import { selectTerminal } from './store/loardTerminalSlice';
import { selectPorts } from './store/loardPortSlice';
import { selectCities } from './store/loardCitySlice';
import { selectCountries } from './store/loardCountrySlice';
import { removeTodo, addTodo, closeNewTodoDialog, closeEditTodoDialog } from './store/todosSlice';
import JwtService from '../../../../services/jwtService';

const defaultValues = {
	Key: '',
	countryID: '',
	City: '',
	Ports: '',
	Terminal: '',
	nameEng: '',
	code: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	// title: yup.string().required('You must enter a title'),
});

function LocationDialog(props) {
	const DeleteClicked = props.isDeleteClicked;
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.locationsWordsList);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);
	const countrys = useSelector(selectCountries);
	const cities = useSelector(selectCities);
	const ports = useSelector(selectPorts);
	const terminal = useSelector(selectTerminal);
	const [showAllCities, setShowAllCities] = useState(false);
	const [countryname, setcountryname] = useState('');
	const [isGridVisible, setIsGridVisible] = useState(false);
	const [isaddGridVisible, setIsaddGridVisible] = useState(false);
	const [cityvisible, setcityGridvisible] = useState(false);
	const [portvisible, setportvisible] = useState(false);
	const [terminalvisible, setterminalvisible] = useState(false);
	const [terminaleditevisible, setediteterminalvisible] = useState(false);
	const [selectedValue, setSelectedValue] = useState(false);
	const [selectedCity, setSelectedCity] = useState(false);
	const [selectedPort, setSelectedPort] = useState(false);
	const [selectedTerminal, setSelectedTerminal] = useState(false);
	const [selectedcityvisible, seteditCityVisible] = useState(false);
	const [porteditevisible, setporteditevisible] = useState(false);
	const [clickclosebutton, setclickclosebutton] = useState(false);
	const [opencity, setOpenCity] = React.useState(false);
	const [openport, setOpenPort] = React.useState(false);
	const [openterminal, setOpenTerminal] = React.useState(false);
	const [isconfirm, setIsConform] = useState(false);
	const [isconfirmcity, setIsConformCity] = React.useState(false);
	const [isconfirmport, setIsConformport] = React.useState(false);
	const [isconfirmterminal, setIsconformterminal] = React.useState(false);

	const countryRef = useRef();
	const russianNameRef = useRef();
	const codeRef = useRef();

	const { watch, handleSubmit, formState, reset, control, setValue, getValues } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { errors, isValid, dirtyFields } = formState;
	const Country = watch('Country');
	const City = watch('City');
	const Port = watch('port');
	const Terminal = watch('Terminal');

	function handleSaveCountry() {
		const countrydata = {
			nameEng: getValues('addcountry'),
			nameRus: getValues('countryrusname'),
			code: getValues('countrycode')
		};
		dispatch(saveCountry(countrydata));
		setIsaddGridVisible(false);
		setValue('addcountry', '');
		setValue('countryrusname', '');
		setValue('countrycode', '');
	}

	function handleSaveCity() {
		const citydata = {
			countryID: getValues('Country'),
			nameEng: getValues('addcity'),
			nameRus: getValues('addcitynamerus'),
			code: getValues('addcitycode')
		};
		dispatch(saveCity(citydata));
		setcityGridvisible(false);
		setValue('addcity', '');
		setValue('addcitynamerus', '');
		setValue('addcitycode', '');
	}

	function handleSavePort() {
		const portdata = {
			countryID: getValues('Country'),
			cityID: getValues('City'),
			nameEng: getValues('addport'),
			nameRus: getValues('addportrusname'),
			code: getValues('addportcode')
		};
		dispatch(saveport(portdata));
		setportvisible(false);

		setValue('addport', '');
		setValue('addportrusname', '');
		setValue('addportcode', '');
	}

	function handleSaveterminal() {
		const terminaldata = {
			countryID: getValues('Country'),
			cityID: getValues('City'),
			portID: getValues('Port'),
			nameEng: getValues('addterminal'),
			nameRus: getValues('addterminalrus'),
			code: getValues('addterminalcode')
		};
		dispatch(saveterminal(terminaldata));
		setterminalvisible(false);

		setValue('addterminal', '');
		setValue('addterminalrus', '');
		setValue('addterminalcode', '');
	}

	const fetchCountryData = async () => {
		try {
			const response = await axios.get(`https://dev.mtcs.online/api/glos/country/${Country}`);
			setValue('editecountry', response.data.datas[0].en_US);
			setValue('editecountrycode', response.data.datas[0].Code);
			setValue('editecountryrusname', response.data.datas[0].rus);
		} catch (error) {
			// Handle errors here
			console.error(error);
		}
	};

	useEffect(() => {
		if (Country !== undefined) {
			fetchCountryData();
		}
	}, [Country]);

	const fetchCityData = async () => {
		try {
			const response = await axios.get(`https://dev.mtcs.online/api/glos/city/${City}`);
			setValue('editecity', response.data.datas[0].en_US);
			setValue('editecitycode', response.data.datas[0].Code);
			setValue('editecityrusname', response.data.datas[0].rus);
		} catch (error) {
			// Handle errors here
			console.error(error);
		}
	};

	useEffect(() => {
		if (City !== undefined) {
			fetchCityData();
		}
	}, [City]);

	const fetchPortediteData = async () => {
		try {
			const response = await axios.get(`https://dev.mtcs.online/api/glos/port/${Port}`);
			setValue('editeport', response.data.datas[0].en_US);
			setValue('editeportcode', response.data.datas[0].Code);
			setValue('editeportrus', response.data.datas[0].rus);
		} catch (error) {
			// Handle errors here
			console.error(error);
		}
	};

	useEffect(() => {
		if (Port !== undefined) {
			fetchPortediteData();
		}
	}, [Port]);

	const fetchTerminalediteData = async () => {
		try {
			const response = await axios.get(`https://dev.mtcs.online/api/glos/terminal/${Terminal}`);
			setValue('editeterminal', response.data.datas[0].en_US);
			setValue('editeterminalcode', response.data.datas[0].Code);
			setValue('editeterminalrus', response.data.datas[0].rus);
		} catch (error) {
			// Handle errors here
			console.error(error);
		}
	};

	useEffect(() => {
		if (Terminal !== undefined) {
			fetchTerminalediteData();
		}
	}, [Terminal]);

	useEffect(() => {
		setValue('Country', Country);
		setValue('City', City);
		setValue('Port', Port);
		// setValue('addcountry',)
	}, [Country, City, Port]);

	// filter end city by country
	const filteredEndCitiesList = cities?.filter(startCity => {
		return startCity?.CountryID === Country;
	});

	// filter start port by city
	const filteredEndPortsList = ports?.filter(startPort => {
		return startPort?.CountryID === Country && startPort?.CityID === City;
	});

	// filter start port by city
	const filteredEndTerminalsList = terminal?.filter(startTerminal => {
		return startTerminal?.CountryID === Country && startTerminal?.CityID === City && startTerminal?.PortID === Port;
	});

	/**
	 * Initialize Dialog with Data
	 */
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (todoDialog.type === 'edit' && todoDialog.data) {
			reset({ ...todoDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (todoDialog.type === 'new') {
			reset({
				...defaultValues,
				...todoDialog.data
			});
		}
	}, [todoDialog.data, todoDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (todoDialog.props.open) {
			initDialog();
		}
		JwtService.signInWithToken();
	}, [todoDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeTodoDialog() {
		return todoDialog.type === 'edit' ? dispatch(closeEditTodoDialog()) : dispatch(closeNewTodoDialog());
	}

	/**
	 * Form Submit
	 */
	function onSubmit(data) {
		dispatch(addTodo(getValues()));
		closeTodoDialog();
	}

	function handleonclose() {
		setIsaddGridVisible(false);
		setcityGridvisible(false);
		setportvisible(false);
		setterminalvisible(false);
		setclickclosebutton(true);
		closeTodoDialog();
	}

	/**
	 * Remove Event
	 */
	function handleRemove() {
		dispatch(removeTodo(formId)).then(() => {
			closeTodoDialog();
		});
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

	// common words translater
	const addTitle = findByKey(commonTranslateWordsArray, 'ADD_NEW_TITLE');
	const editTitle = findByKey(commonTranslateWordsArray, 'EDIT_TITLE');
	const addBtn = findByKey(commonTranslateWordsArray, 'ADD_BTN');
	const closeBtn = findByKey(commonTranslateWordsArray, 'CLOSE_BTN');
	const saveBtn = findByKey(commonTranslateWordsArray, 'SAVE_BTN');
	// page words translater
	const countryText = findByKey(wordsList, 'COUNTRY_TEXT');
	const cityText = findByKey(wordsList, 'CITY_TEXT');
	const portText = findByKey(wordsList, 'PORT_TEXT');
	const terminalText = findByKey(wordsList, 'TERMINAL_TEXT');
	const rusNameText = findByKey(wordsList, 'RUS_NAME_TITLE');
	const codeText = findByKey(wordsList, 'CODE_TITLE');

	function handleaddcountryaddClick() {
		setIsaddGridVisible(!isaddGridVisible);
		setIsGridVisible(false);

		setcityGridvisible(false);
		setportvisible(false);
		setterminalvisible(false);
	}

	function handlecityaddClick() {
		if (Country === undefined || Country === '') {
			alert('Select Country For Add The City');
		} else {
			setcityGridvisible(!cityvisible);
			seteditCityVisible(false);

			setportvisible(false);
			setIsaddGridVisible(false);
			setterminalvisible(false);

			setValue('addcity', '');
			setValue('addcitynamerus', '');
			setValue('addcitycode', '');
		}
	}

	function handleportvisible() {
		if (Country === undefined || Country === '' || City === undefined || City === '') {
			alert('Select Country And City for Add the Port');
		} else {
			setportvisible(!portvisible);
			setporteditevisible(false);

			setcityGridvisible(false);
			setIsaddGridVisible(false);
			setterminalvisible(false);

			setValue('addport', '');
			setValue('addportrusname', '');
			setValue('addportcode', '');
		}
	}

	function handleaddterminal() {
		if (
			Country === undefined ||
			Country === '' ||
			City === undefined ||
			City === '' ||
			Port === undefined ||
			Port === ''
		) {
			alert('Select Country,City And Port for Add the Terminal');
		} else {
			setterminalvisible(!terminalvisible);
			setediteterminalvisible(false);

			setValue('addterminal', '');
			setValue('addterminalrus', '');
			setValue('addterminalcode', '');

			setcityGridvisible(false);
			setportvisible(false);
			setIsaddGridVisible(false);
		}
	}

	function handlecloseeditesaveconfimation() {
		setIsConform(false);
		// if(clickclosebutton === true){
		// 	closeTodoDialog();
		// }
		setValue('addcountry', '');
		setValue('countryrusname', '');
		setValue('countrycode', '');
	}

	function handlecloseconfirmationcity() {
		setIsConformCity(false);
		// if(clickclosebutton === true){
		// 	closeTodoDialog();
		// }
		setValue('addcity', '');
		setValue('addcitynamerus', '');
		setValue('addcitycode', '');
	}

	function handlecloseconfirmationport() {
		setIsConformport(false);
		// if(clickclosebutton === true){
		// 	closeTodoDialog();
		// }
		setValue('addport', '');
		setValue('addportrusname', '');
		setValue('addportcode', '');
	}

	function handlecloseconfirmationterminal() {
		setIsconformterminal(false);
		// if(clickclosebutton === true){
		// 	closeTodoDialog();
		// }
		setValue('addterminal', '');
		setValue('addterminalrus', '');
		setValue('addterminalcode', '');
	}

	function handleconfiramtionincountry() {
		handleSaveCountry();
		setIsConform(false);
	}

	function handleconfiramtionincity() {
		handleSaveCity();
		setIsConformCity(false);
	}

	function handleconfiramtioninport() {
		handleSavePort();
		setIsConformport(false);
	}
	function handleconfiramtioninterminal() {
		handleSaveterminal();
		setIsconformterminal(false);
	}

	useEffect(() => {
		const addcountryname = watch('addcountry');
		const addcountrynamerus = watch('countryrusname');
		const addcountrycode = watch('countrycode');

		const addcityname = watch('addcity');
		const addcitynamerus = watch('addcitynamerus');
		const addcitycode = watch('addcitycode');

		const addportname = watch('addport');
		const addportnamerus = watch('addportrusname');
		const addportcode = watch('addportcode');

		const addterminalname = watch('addterminal');
		const addterminalnamerus = watch('addterminalrus');
		const addterminalcode = watch('addterminalcode');

		if (addcountryname === undefined && addcountrynamerus === undefined && addcountrycode === undefined) {
			setIsConform(false);
		} else if (addcountryname === '' && addcountrynamerus === '' && addcountrycode === '') {
			setIsConform(false);
		} else {
			setIsConform(true);
		}

		if (addcityname === undefined && addcitynamerus === undefined && addcitycode === undefined) {
			setIsConformCity(false);
		} else if (addcityname === '' && addcitynamerus === '' && addcitycode === '') {
			setIsConformCity(false);
		} else {
			setIsConformCity(true);
		}

		if (addportname === undefined && addportnamerus === undefined && addportcode === undefined) {
			setIsConformport(false);
		} else if (addportname === '' && addportnamerus === '' && addportcode === '') {
			setIsConformport(false);
		} else {
			setIsConformport(true);
		}

		if (addterminalname === undefined && addterminalnamerus === undefined && addterminalcode === undefined) {
			setIsconformterminal(false);
		} else if (addterminalname === '' && addterminalnamerus === '' && addterminalcode === '') {
			setIsconformterminal(false);
		} else {
			setIsconformterminal(true);
		}
	}, [
		selectedValue,
		selectedCity,
		selectedPort,
		selectedTerminal,
		isaddGridVisible,
		cityvisible,
		portvisible,
		terminalvisible
	]);

	return (
		<>
			<div>
				<Dialog
					open={isconfirm}
					// onClose={handlecloseeditesaveconfimation}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<Alert severity="warning">You typed Country is not Saved !You want to save it ?</Alert>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlecloseeditesaveconfimation}>Cancel</Button>
						<Button onClick={handleconfiramtionincountry} autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={isconfirmcity}
					// onClose={handlecloseeditesaveconfimation}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<Alert severity="warning">You typed City is not Saved !You want to save it ?</Alert>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlecloseconfirmationcity}>Cancel</Button>
						<Button onClick={handleconfiramtionincity} autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={isconfirmport}
					// onClose={handlecloseeditesaveconfimation}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<Alert severity="warning">You typed Port is not Saved !You want to save it ?</Alert>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlecloseconfirmationport}>Cancel</Button>
						<Button onClick={handleconfiramtioninport} autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={isconfirmterminal}
					// onClose={handlecloseeditesaveconfimation}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<Alert severity="warning">You typed Terminal is not Saved !You want to save it ?</Alert>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlecloseconfirmationterminal}>Cancel</Button>
						<Button onClick={handleconfiramtioninterminal} autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			{/* <Dialog {...todoDialog.props} onClose={closeTodoDialog} fullWidth maxWidth="sm" scroll="body">*/}
			<Dialog {...todoDialog.props} fullWidth maxWidth="sm" scroll="body">
				<AppBar position="static" elevation={0}>
					<Toolbar className="flex w-full">
						<Typography variant="subtitle1" color="inherit">
							{/* {todoDialog.type === 'new'*/}
							{/*	? currentLanguageId === 'en'*/}
							{/*		? addTitle?.en_US*/}
							{/*		: currentLanguageId === 'rus'*/}
							{/*		? addTitle?.rus*/}
							{/*		: t('ADD_NEW')*/}
							{/*	: currentLanguageId === 'en'*/}
							{/*	? editTitle?.en_US*/}
							{/*	: currentLanguageId === 'rus'*/}
							{/*	? editTitle?.rus*/}
							{/*	: t('EDIT')}*/}
							Add Location
						</Typography>
					</Toolbar>
				</AppBar>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<Grid sx={{ marginLeft: '60px' }}>
							<Grid container spacing={2}>
								<Grid item xs={10}>
									<FormControl fullWidth size="small" error={errors?.serviceEndCountry}>
										<InputLabel id="serviceEndCountry-label">
											{/* {currentLanguageId === 'en'*/}
											{/*	? countryText?.en_US*/}
											{/*	: currentLanguageId === 'rus'*/}
											{/*		? countryText?.rus*/}
											{/*		: 'Country'}*/}
											Select Country Frist
										</InputLabel>
										<Controller
											control={control}
											name="Country"
											defaultValue={countryname}
											render={({ field }) => (
												<Select
													{...field}
													labelId="serviceEndCountry-label"
													id="serviceEndCountry-select"
													// value={selectedValue}
													label={
														// currentLanguageId === 'en'
														// 	? countryText?.en_US
														// 	: currentLanguageId === 'rus'
														// 		? countryText?.rus
														// 		: 'Country'
														'Select Country Frist'
													}
													error={!!errors.serviceEndCountry}
													helperText={errors?.serviceEndCountry?.message}
													onChange={event => {
														setSelectedValue(event.target.value);
														setSelectedCity(false);
														setSelectedPort(false);
														setSelectedTerminal(false);

														// setValue("addcountry","");
														// setValue("countryrusname","");
														// setValue("countrycode","")

														setIsaddGridVisible(false);
														setcityGridvisible(false);
														setportvisible(false);
														setterminalvisible(false);

														field.onChange(event);
													}}
													// onChange={handleDropdownChange}
												>
													{countrys?.map(country => (
														<MenuItem value={country?.CountryID}>{country.en_US}</MenuItem>
													))}
												</Select>
											)}
										/>
									</FormControl>
									{isaddGridVisible && (
										<Grid container spacing={2}>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addcountry"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															inputRef={countryRef}
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Country'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '15px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Controller
													control={control}
													name="countryrusname"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															inputRef={russianNameRef}
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Russian Name'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '20px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Controller
													control={control}
													name="countrycode"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															inputRef={codeRef}
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Code'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '25px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Button
													variant="outlined"
													startIcon={<SaveIcon />}
													sx={{ marginTop: '33px', marginLeft: '30px' }}
													onClick={handleSaveCountry}
													size="small"
												>
													Save
												</Button>
											</Grid>
										</Grid>
									)}
								</Grid>
								<Grid item xs={2}>
									{isaddGridVisible ? (
										<IconButton aria-label="removeButton" onClick={handleaddcountryaddClick}>
											<RemoveCircleOutlineIcon />
										</IconButton>
									) : (
										<IconButton aria-label="addButton" onClick={handleaddcountryaddClick}>
											<AddCircleOutlineIcon />
										</IconButton>
									)}
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={10}>
									<FormControl
										fullWidth
										size="small"
										sx={{ marginTop: '10px' }}
										error={errors?.serviceEndCity}
									>
										<InputLabel id="serviceEndCity-label">
											{/* {currentLanguageId === 'en'*/}
											{/*	? cityText?.en_US*/}
											{/*	: currentLanguageId === 'rus'*/}
											{/*		? cityText?.rus*/}
											{/*		: 'City'}*/}
											City
										</InputLabel>
										<Controller
											control={control}
											name="City"
											render={({ field }) => (
												<Select
													{...field}
													labelId="serviceEndCity-label"
													id="serviceEndCity-select"
													label={
														// currentLanguageId === 'en'
														// 	? cityText?.en_US
														// 	: currentLanguageId === 'rus'
														// 		? cityText?.rus
														// 		: 'City'
														'City'
													}
													error={!!errors.serviceEndCity}
													helperText={errors?.serviceEndCity?.message}
													// onClick={() => setShowAllCities(true)}
													onChange={event => {
														setSelectedCity(event.target.value);
														setSelectedValue(false);
														setSelectedPort(false);
														setSelectedTerminal(false);

														// setValue("addcity","");
														// setValue("addcitynamerus","");
														// setValue("addcitycode","")

														setIsaddGridVisible(false);
														setcityGridvisible(false);
														setportvisible(false);
														setterminalvisible(false);
														field.onChange(event);
													}}
												>
													{showAllCities
														? cities?.map(city => (
																<MenuItem value={city?.CityID}>{city?.en_US}</MenuItem>
														  ))
														: filteredEndCitiesList?.map(city => (
																<MenuItem value={city?.CityID}>{city?.en_US}</MenuItem>
														  ))}
												</Select>
											)}
										/>
									</FormControl>

									{cityvisible && (
										<Grid container spacing={2}>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addcity"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'city'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '15px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addcitynamerus"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Russian Name'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '20px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addcitycode"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Code'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '25px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Button
													variant="outlined"
													startIcon={<SaveIcon />}
													sx={{ marginTop: '33px', marginLeft: '30px' }}
													onClick={handleSaveCity}
													size="small"
												>
													Save
												</Button>
											</Grid>
										</Grid>
									)}
								</Grid>
								<Grid item xs={2}>
									<Grid item xs={2}>
										{cityvisible ? (
											<IconButton
												aria-label="removeButton"
												onClick={handlecityaddClick}
												sx={{ marginTop: '10px' }}
											>
												<RemoveCircleOutlineIcon />
											</IconButton>
										) : (
											<IconButton
												aria-label="addButton"
												onClick={handlecityaddClick}
												sx={{ marginTop: '10px' }}
											>
												<AddCircleOutlineIcon />
											</IconButton>
										)}
									</Grid>
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={10}>
									<FormControl
										fullWidth
										size="small"
										sx={{ marginTop: '10px' }}
										error={errors?.serviceEndPort}
									>
										<InputLabel id="serviceEndPort-label">
											{/* {currentLanguageId === 'en'*/}
											{/*	? portext?.en_US*/}
											{/*	: currentLanguageId === 'rus'*/}
											{/*		? portext?.rus*/}
											{/*		: 'Port'}*/}
											Port
										</InputLabel>
										<Controller
											control={control}
											name="port"
											render={({ field }) => (
												<Select
													{...field}
													labelId="serviceEndPort-label"
													id="serviceEndPort-select"
													label={
														// currentLanguageId === 'en'
														// 	? terminaltext?.en_US
														// 	: currentLanguageId === 'rus'
														// 		? terminaltext?.rus
														// 		: 'Terminal'
														Port
													}
													error={!!errors.serviceEndPort}
													helperText={errors?.serviceEndPort?.message}
													//	onClick={() => 	setSelectedPort(true)}
													onChange={event => {
														setSelectedPort(event.target.value);

														setIsaddGridVisible(false);
														setcityGridvisible(false);
														setportvisible(false);
														setterminalvisible(false);

														// setValue("addport","");
														// setValue("addportrusname","");
														// setValue("addportcode","")

														field.onChange(event);
														setSelectedCity(false);
													}}
												>
													{filteredEndPortsList?.map(port => (
														<MenuItem value={port?.PortID}>{port?.en_US}</MenuItem>
													))}
												</Select>
											)}
										/>
										{/* <FormHelperText>{errors?.serviceEndPort?.message}</FormHelperText>*/}
									</FormControl>
									{portvisible && (
										<Grid container spacing={2}>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addport"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Port'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '15px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addportrusname"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Russian Name'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '20px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addportcode"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Code'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '25px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Button
													variant="outlined"
													startIcon={<SaveIcon />}
													sx={{ marginTop: '33px', marginLeft: '30px' }}
													onClick={handleSavePort}
													size="small"
												>
													Save
												</Button>
											</Grid>
										</Grid>
									)}
								</Grid>
								<Grid item xs={2}>
									{portvisible ? (
										<IconButton
											aria-label="removeButton"
											onClick={handleportvisible}
											sx={{ marginTop: '10px' }}
										>
											<RemoveCircleOutlineIcon />
										</IconButton>
									) : (
										<IconButton
											aria-label="addButton"
											onClick={handleportvisible}
											sx={{ marginTop: '10px' }}
										>
											<AddCircleOutlineIcon />
										</IconButton>
									)}
								</Grid>
							</Grid>

							<Grid container spacing={2}>
								<Grid item xs={10}>
									<FormControl
										fullWidth
										size="small"
										sx={{ marginTop: '7px' }}
										error={errors?.serviceEndTerminal}
									>
										<InputLabel id="serviceEndTerminal-label">
											{/* {currentLanguageId === 'en'*/}
											{/*	? terminaltext?.en_US*/}
											{/*	: currentLanguageId === 'rus'*/}
											{/*		? terminaltext?.rus*/}
											{/*		: 'Terminal'}*/}
											Terminal
										</InputLabel>
										<Controller
											control={control}
											name="Terminal"
											render={({ field }) => (
												<Select
													{...field}
													labelId="serviceEndTerminal-label"
													id="serviceEndTerminal-select"
													label={
														// currentLanguageId === 'en'
														// 	? portext?.en_US
														// 	: currentLanguageId === 'rus'
														// 		? portext?.rus
														// 		: 'Port'
														Terminal
													}
													error={!!errors.serviceEndTerminal}
													helperText={errors?.serviceEndTerminal?.message}
													onChange={event => {
														setSelectedTerminal(event.target.value);
														field.onChange(event);
														setSelectedCity(false);
														setSelectedValue(false);
														setSelectedPort(false);

														// setValue("addterminal","");
														// setValue("addterminalrus","");
														// setValue("addterminalcode","")

														setIsaddGridVisible(false);
														setcityGridvisible(false);
														setportvisible(false);
														setterminalvisible(false);
													}}
												>
													{filteredEndTerminalsList?.map(terminal => (
														<MenuItem value={terminal?.TerminalID}>
															{terminal?.en_US}
														</MenuItem>
													))}
												</Select>
											)}
										/>
										{/* <FormHelperText>{errors?.serviceEndTerminal?.message}</FormHelperText>*/}
									</FormControl>

									{terminalvisible && (
										<Grid container spacing={2}>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addterminal"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Terminal'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '15px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addterminalrus"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Russian Name'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '20px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Controller
													control={control}
													name="addterminalcode"
													render={({ field }) => (
														<TextField
															{...field}
															id="serviceStartZipCode"
															label={
																// currentLanguageId === 'en'
																// 	? zipCodeText?.en_US
																// 	: currentLanguageId === 'rus'
																// 		? zipCodeText?.rus
																// 		: 'Zip Code'
																'Code'
															}
															variant="outlined"
															size="small"
															fullWidth
															error={!!errors.serviceStartZipCode}
															helperText={errors?.serviceStartZipCode?.message}
															sx={{ marginTop: '30px', marginLeft: '25px' }}
														/>
													)}
												/>
											</Grid>
											<Grid xs={3}>
												<Button
													variant="outlined"
													startIcon={<SaveIcon />}
													sx={{ marginTop: '33px', marginLeft: '30px' }}
													onClick={handleSaveterminal}
													size="small"
												>
													Save
												</Button>
											</Grid>
										</Grid>
									)}
								</Grid>
								<Grid item xs={2}>
									{terminalvisible ? (
										<IconButton
											aria-label="removeButton"
											onClick={handleaddterminal}
											sx={{ marginTop: '10px' }}
										>
											<RemoveCircleOutlineIcon />
										</IconButton>
									) : (
										<IconButton
											aria-label="addButton"
											onClick={handleaddterminal}
											sx={{ marginTop: '10px' }}
										>
											<AddCircleOutlineIcon />
										</IconButton>
									)}
								</Grid>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						{/* <Button onClick={handlesaveall}>Save All</Button>*/}
						<Button onClick={handleonclose}>Close</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
}

export default LocationDialog;
