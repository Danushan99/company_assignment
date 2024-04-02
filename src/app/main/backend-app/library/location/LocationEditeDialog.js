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
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/lab';
import { removeTodo, addTodo, closeNewTodoDialog, closeEditTodoDialog } from './store/todosSlice';
import { selectCountries } from './store/loardCountrySlice';
import { selectCities } from './store/loardCitySlice';
import { selectPorts } from './store/loardPortSlice';
import { selectTerminal } from './store/loardTerminalSlice';
import { removeCoutry, saveCountry, updatecountry } from './store/addCountrySlice';
import { removeCity, saveCity, updatecity } from './store/addCitySlice';
import { removePort, saveport, updateport } from './store/addportSlice';
import { removeTerminal, saveterminal, updateTerminal } from './store/addterminal';
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

function LocationEditeDialog(props) {
	const closeClicked = props.closebuttonclicked;

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
	const [opencountry, setOpenCountry] = React.useState(false);
	const [opencity, setOpenCity] = React.useState(false);
	const [openport, setOpenPort] = React.useState(false);
	const [openterminal, setOpenTerminal] = React.useState(false);
	const [isconfirm, setIsConform] = React.useState(false);
	const [cancelconformcountry, setcancelConformcountry] = useState(false);
	const [isconfirmcity, setIsConformCity] = React.useState(false);
	const [isconfirmport, setIsConformport] = React.useState(false);
	const [isconfirmterminal, setIsconformterminal] = React.useState(false);

	const [counrywarning, setwarningcountry] = React.useState(false);

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

	function handleUpdateCountry() {
		const countrydata = {
			countryId: getValues('Country'),
			nameEng: getValues('editecountry'),
			nameRus: getValues('editecountryrusname'),
			code: getValues('editecountrycode')
		};
		dispatch(updatecountry(countrydata));
		setIsGridVisible(false);
		setIsConform(false);

		// setValue("editecountry","");
		// setValue("editecountryrusname","");
		// setValue("editecountrycode","")
	}

	function handleupdateCity() {
		const citydata = {
			cityid: getValues('City'),
			countryID: getValues('Country'),
			nameEng: getValues('editecity'),
			nameRus: getValues('editecityrusname'),
			code: getValues('editecitycode')
		};
		dispatch(updatecity(citydata));
		seteditCityVisible(false);
		setIsConformCity(false);

		// setValue("editecity","");
		// setValue("editecityrusname","");
		// setValue("editecitycode","")
	}

	function handleEditePort() {
		const portdata = {
			portID: getValues('Port'),
			countryID: getValues('Country'),
			cityID: getValues('City'),
			nameEng: getValues('editeport'),
			nameRus: getValues('editeportrus'),
			code: getValues('editeportcode')
		};
		dispatch(updateport(portdata));
		setporteditevisible(false);
		setIsConformport(false);

		// setValue("editeport","");
		// setValue("editeportrus","");
		// setValue("editeportcode","")
	}

	function handleEditeterminal() {
		const terminaldata = {
			terminalID: getValues('Terminal'),
			countryID: getValues('Country'),
			cityID: getValues('City'),
			portID: getValues('Port'),
			nameEng: getValues('editeterminal'),
			nameRus: getValues('editeterminalrus'),
			code: getValues('editeterminalcode')
		};
		dispatch(updateTerminal(terminaldata));
		setediteterminalvisible(false);
		setIsconformterminal(false);

		// setValue("editeterminal","");
		// setValue("editeterminalrus","");
		// setValue("editeterminalcode","")
	}

	const fetchCountryData = async () => {
		try {
			const response = await axios.get(`https://dev.mtcs.online/api/glos/country/${Country}`);
			setValue('editecountry', response.data.datas[0].en_US);
			setValue('editecountrycode', response.data.datas[0].Code);
			if (response.data.datas[0].rus !== null) {
				setValue('editecountryrusname', response.data.datas[0].rus);
			} else {
				// Handle the case when the value is null (optional)
				setValue('editecountryrusname', '');
			}
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
			if (response.data.datas[0].rus !== null) {
				setValue('editecityrusname', response.data.datas[0].rus);
			} else {
				// Handle the case when the value is null (optional)
				setValue('editecityrusname', '');
			}
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

			if (response.data.datas[0].rus !== null) {
				setValue('editeportrus', response.data.datas[0].rus);
			} else {
				// Handle the case when the value is null (optional)
				setValue('editeportrus', '');
			}
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

			if (response.data.datas[0].rus !== null) {
				setValue('editeterminalrus', response.data.datas[0].rus);
			} else {
				// Handle the case when the value is null (optional)
				setValue('editeterminalrus', '');
			}
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

	function handlecityaddClick() {
		setcityGridvisible(!cityvisible);
		seteditCityVisible(false);
	}

	function handleportvisible() {
		setportvisible(!portvisible);
		setporteditevisible(false);
	}

	function handleaddterminal() {
		setterminalvisible(!terminalvisible);
		setediteterminalvisible(false);
	}

	function handleDropdownChange() {
		setSelectedValue(true);
	}

	function handleeditesaveconfimation() {
		setIsConform(true);
	}

	function handlecloseeditesaveconfimation() {
		setIsConform(false);
	}

	function handleeditecityconfimation() {
		setIsConformCity(true);
	}

	function handleclosecityconfimation() {
		setIsConformCity(false);
	}

	function handlecloseportconfimation() {
		setIsConformport(false);
	}

	function handleopenportconfimation() {
		setIsConformport(true);
	}

	function handleopenterminalconfirmation() {
		setIsconformterminal(true);
	}

	function handlecloseterminalconfirmation() {
		setIsconformterminal(false);
	}

	function handleeditecountryClick() {
		if (Country === undefined || Country === '') {
			alert('Select Country For Edite');
		} else {
			setIsGridVisible(!isGridVisible);

			seteditCityVisible(false);
			setporteditevisible(false);
			setediteterminalvisible(false);
		}
	}

	function handleditecity() {
		if (City === undefined || City === '') {
			alert('Select City For Edite');
		} else {
			seteditCityVisible(!selectedcityvisible);

			setIsGridVisible(false);
			setporteditevisible(false);
			setediteterminalvisible(false);
		}
	}

	function handleediteport() {
		if (Port === undefined || Port === '') {
			alert('Select Port For Edite');
		} else {
			setporteditevisible(!porteditevisible);
			setportvisible(false);
			seteditCityVisible(false);
			setediteterminalvisible(false);
			setIsGridVisible(false);
		}
	}

	function handleediteterminal() {
		if (Terminal === undefined || Terminal === '') {
			alert('Select Terminal For Edite');
		} else {
			setediteterminalvisible(!terminaleditevisible);
			setterminalvisible(false);
			seteditCityVisible(false);
			setporteditevisible(false);
			setIsGridVisible(false);
		}
	}

	const handleCloseCountry = () => {
		setOpenCountry(false);
	};

	const handleCloseCity = () => {
		setOpenCity(false);
	};

	const handleClosePort = () => {
		setOpenPort(false);
	};

	const handleCloseTerminal = () => {
		setOpenTerminal(false);
	};

	function handledeleteCountrySave() {
		const deleteData = {
			countryid: getValues('Country'),
			reason: getValues('deletereson')
		};
		dispatch(removeCoutry(deleteData));
		setOpenCountry(false);
	}

	function handledeleteCitySave() {
		const deleteData = {
			cityid: getValues('City'),
			reason: getValues('deletereson')
		};
		dispatch(removeCity(deleteData));
		setOpenCity(false);
	}

	function handledeletePortSave() {
		const deleteData = {
			portid: getValues('Port'),
			reason: getValues('deletereson')
		};
		dispatch(removePort(deleteData));
		setOpenPort(false);
	}

	function handledeleteTerminalSave() {
		const deleteData = {
			terminalid: getValues('Terminal'),
			reason: getValues('deletereson')
		};
		dispatch(removeTerminal(deleteData));
		setOpenTerminal(false);
	}

	return (
		<>
			<div>
				<Dialog
					open={opencountry}
					onClose={handleCloseCountry}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<AppBar position="static" elevation={0}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								DELETE REASON
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent>
						<Controller
							control={control}
							name="deletereson"
							render={({ field }) => (
								<TextField
									{...field}
									id="deletereson"
									label="Enter Reason Here"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseCountry}>Cancel</Button>
						<Button onClick={handledeleteCountrySave} autoFocus>
							Save
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={opencity}
					onClose={handleCloseCity}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<AppBar position="static" elevation={0}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								DELETE REASON
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent>
						<Controller
							control={control}
							name="deletereson"
							render={({ field }) => (
								<TextField
									{...field}
									id="deletereson"
									label="Enter Reason Here"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseCity}>Cancel</Button>
						<Button onClick={handledeleteCitySave} autoFocus>
							Save
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={openport}
					onClose={handleClosePort}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<AppBar position="static" elevation={0}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								DELETE REASON
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent>
						<Controller
							control={control}
							name="deletereson"
							render={({ field }) => (
								<TextField
									{...field}
									id="deletereson"
									label="Enter Reason Here"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClosePort}>Cancel</Button>
						<Button onClick={handledeletePortSave} autoFocus>
							Save
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={openterminal}
					onClose={handleCloseTerminal}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<AppBar position="static" elevation={0}>
						<Toolbar className="flex w-full">
							<Typography variant="subtitle1" color="inherit">
								DELETE REASON
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent>
						<Controller
							control={control}
							name="deletereson"
							render={({ field }) => (
								<TextField
									{...field}
									id="deletereson"
									label="Enter Reason Here"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseTerminal}>Cancel</Button>
						<Button onClick={handledeleteTerminalSave} autoFocus>
							Save
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={isconfirm}
					onClose={handlecloseeditesaveconfimation}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<Alert severity="warning">Are You Sure Edit this Country!</Alert>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlecloseeditesaveconfimation}>Cancel</Button>
						<Button onClick={handleUpdateCountry} autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={isconfirmcity}
					onClose={handleclosecityconfimation}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<Alert severity="warning">Are You Sure Edit this City!</Alert>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleclosecityconfimation}>Cancel</Button>
						<Button onClick={handleupdateCity} autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={isconfirmport}
					onClose={handlecloseportconfimation}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<Alert severity="warning">Are You Sure Edit this Port!</Alert>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlecloseportconfimation}>Cancel</Button>
						<Button onClick={handleEditePort} autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={isconfirmterminal}
					onClose={handlecloseterminalconfirmation}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<Alert severity="warning">Are You Sure Edit this Terminal!</Alert>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlecloseterminalconfirmation}>Cancel</Button>
						<Button onClick={handleEditeterminal} autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>

				{/* <Dialog*/}
				{/*    open={counrywarning}*/}
				{/*    onClose={handlecloseterminalconfirmation}*/}
				{/*    aria-labelledby="alert-dialog-title"*/}
				{/*    aria-describedby="alert-dialog-description"*/}
				{/* >*/}

				{/*    <DialogContent>*/}
				{/*        <Alert severity="warning">You typed Country is not Update!You want to Update it ?</Alert>*/}
				{/*    </DialogContent>*/}
				{/*    <DialogActions>*/}
				{/*        <Button onClick={handlecloseterminalconfirmation}>Cancel</Button>*/}
				{/*        <Button onClick={handleEditeterminal} autoFocus>*/}
				{/*            Ok*/}
				{/*        </Button>*/}
				{/*    </DialogActions>*/}
				{/* </Dialog>*/}
			</div>
			<Grid sx={{ marginLeft: '60px' }}>
				<Grid container spacing={2}>
					<Grid item xs={10}>
						<FormControl fullWidth size="small" error={errors?.serviceEndCountry}>
							<InputLabel id="serviceEndCountry-label">Select Country Frist</InputLabel>
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
										label="Select Country Frist"
										error={!!errors.serviceEndCountry}
										helperText={errors?.serviceEndCountry?.message}
										onChange={event => {
											setSelectedValue(event.target.value);
											setSelectedCity(false);
											setSelectedPort(false);
											setSelectedTerminal(false);

											setIsGridVisible(false);
											seteditCityVisible(false);
											setporteditevisible(false);
											setediteterminalvisible(false);

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

						{isGridVisible && (
							<Grid container spacing={2}>
								<Grid xs={3}>
									<Controller
										control={control}
										name="editecountry"
										render={({ field }) => (
											<TextField
												{...field}
												id="serviceStartZipCode"
												label="Country"
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
										name="editecountryrusname"
										render={({ field }) => (
											<TextField
												{...field}
												id="serviceStartZipCode"
												label="Russian Name"
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
										name="editecountrycode"
										render={({ field }) => (
											<TextField
												{...field}
												id="serviceStartZipCode"
												label="Code"
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
										startIcon={<SaveAsIcon />}
										sx={{ marginTop: '33px', marginLeft: '30px' }}
										onClick={handleeditesaveconfimation}
										size="small"
									>
										Update
									</Button>
								</Grid>
							</Grid>
						)}
					</Grid>
					<Grid item xs={2}>
						{/* {selectedValue && (*/}
						<IconButton aria-label="addcountry" onClick={handleeditecountryClick}>
							<EditIcon />
						</IconButton>
						{/* )}*/}
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<Grid item xs={10}>
						<FormControl fullWidth size="small" sx={{ marginTop: '10px' }} error={errors?.serviceEndCity}>
							<InputLabel id="serviceEndCity-label">City</InputLabel>
							<Controller
								control={control}
								name="City"
								render={({ field }) => (
									<Select
										{...field}
										labelId="serviceEndCity-label"
										id="serviceEndCity-select"
										label="City"
										error={!!errors.serviceEndCity}
										helperText={errors?.serviceEndCity?.message}
										// onClick={() => setShowAllCities(true)}
										onChange={event => {
											setSelectedCity(event.target.value);
											setSelectedValue(false);
											setSelectedPort(false);
											setSelectedTerminal(false);

											setIsGridVisible(false);
											seteditCityVisible(false);
											setporteditevisible(false);
											setediteterminalvisible(false);

											field.onChange(event);
										}}
									>
										{filteredEndCitiesList?.map(city => (
											<MenuItem value={city?.CityID}>{city?.en_US}</MenuItem>
										))}
									</Select>
								)}
							/>
						</FormControl>
						{selectedcityvisible && (
							<Grid container spacing={2}>
								<Grid xs={3}>
									<Controller
										control={control}
										name="editecity"
										render={({ field }) => (
											<TextField
												{...field}
												id="serviceStartZipCode"
												label="City"
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
										name="editecityrusname"
										render={({ field }) => (
											<TextField
												{...field}
												id="serviceStartZipCode"
												label="Russian Name"
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
										name="editecitycode"
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
										startIcon={<SaveAsIcon />}
										sx={{ marginTop: '33px', marginLeft: '30px' }}
										onClick={handleeditecityconfimation}
										size="small"
									>
										Update
									</Button>
								</Grid>
							</Grid>
						)}
					</Grid>
					<Grid item xs={2}>
						{/* {selectedCity && (*/}
						<IconButton aria-label="addcountry" onClick={handleditecity} sx={{ marginTop: '5px' }}>
							<EditIcon />
						</IconButton>
						{/* )}*/}
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<Grid item xs={10}>
						<FormControl fullWidth size="small" sx={{ marginTop: '10px' }} error={errors?.serviceEndPort}>
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

											setIsGridVisible(false);
											seteditCityVisible(false);
											setporteditevisible(false);
											setediteterminalvisible(false);

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
							{porteditevisible && (
								<Grid container spacing={2}>
									<Grid xs={3}>
										<Controller
											control={control}
											name="editeport"
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
											name="editeportrus"
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
											name="editeportcode"
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
											startIcon={<SaveAsIcon />}
											sx={{ marginTop: '33px', marginLeft: '30px' }}
											onClick={handleopenportconfimation}
											size="small"
										>
											Update
										</Button>
									</Grid>
								</Grid>
							)}
						</FormControl>
					</Grid>
					<Grid item xs={2}>
						{/* {selectedPort && (*/}
						<IconButton aria-label="addcountry" onClick={handleediteport} sx={{ marginTop: '5px' }}>
							<EditIcon />
						</IconButton>
						{/* )}*/}
					</Grid>
				</Grid>

				<Grid container spacing={2}>
					<Grid item xs={10}>
						<FormControl
							fullWidth
							size="small"
							sx={{ marginTop: '10px' }}
							error={errors?.serviceEndTerminal}
						>
							<InputLabel id="serviceEndTerminal-label">Terminal</InputLabel>
							<Controller
								control={control}
								name="Terminal"
								render={({ field }) => (
									<Select
										{...field}
										labelId="serviceEndTerminal-label"
										id="serviceEndTerminal-select"
										label="Terminal"
										error={!!errors.serviceEndTerminal}
										helperText={errors?.serviceEndTerminal?.message}
										onChange={event => {
											setSelectedTerminal(event.target.value);
											field.onChange(event);
											setSelectedCity(false);
											setSelectedValue(false);
											setSelectedPort(false);

											setIsGridVisible(false);
											seteditCityVisible(false);
											setporteditevisible(false);
											setediteterminalvisible(false);
										}}
									>
										{filteredEndTerminalsList?.map(terminal => (
											<MenuItem value={terminal?.TerminalID}>{terminal?.en_US}</MenuItem>
										))}
									</Select>
								)}
							/>
						</FormControl>

						{terminaleditevisible && (
							<Grid container spacing={2}>
								<Grid xs={3}>
									<Controller
										control={control}
										name="editeterminal"
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
										name="editeterminalrus"
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
										name="editeterminalcode"
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
										startIcon={<SaveAsIcon />}
										sx={{ marginTop: '33px', marginLeft: '30px' }}
										onClick={handleopenterminalconfirmation}
										size="small"
									>
										Update
									</Button>
								</Grid>
							</Grid>
						)}
					</Grid>
					<Grid item xs={2}>
						{/* {selectedTerminal && (*/}
						<IconButton aria-label="addcountry" onClick={handleediteterminal} sx={{ marginTop: '5px' }}>
							<EditIcon />
						</IconButton>
						{/* )}*/}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
}

export default LocationEditeDialog;
