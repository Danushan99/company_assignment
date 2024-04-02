/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select, FormControlLabel, Checkbox } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getAllCountries } from 'app/main/backend-app/MDL_Purchasing department/store/countrySlice';
import { getAllCities } from 'app/main/backend-app/MDL_Purchasing department/store/citySlice';
import { getCommonContactTypes } from '../store/commonContactTypeSlice';

function ContactBasicinfo(props) {
	const dispatch = useDispatch();
	const contact = useSelector(({ contactApp }) => contactApp.contact);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);

	const methods = useFormContext();
	const { control, formState, setValue, watch, getValues } = methods;
	const { errors, dirtyFields } = formState;

	const [contactTypesList, setContactTypes] = useState([]);
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			// let isMounted = true; // Flag to track component mount status

			dispatch(getCommonContactTypes()).then(res => {
				setContactTypes(res?.payload?.data);
			});

			dispatch(getAllCountries()).then(response => {
				setCountries(response?.payload?.data);
			});
			dispatch(getAllCities()).then(response => {
				setCities(response?.payload?.data);
			});
		};
		fetchData();
	}, []);

	//  selected country
	const selectedCountry = watch('countryID');
	const selectedCity = watch('cityID');

	useEffect(() => {
		setValue('countryID', selectedCountry);
		setValue('cityID', selectedCity);
	}, [selectedCountry, selectedCity]);

	// filter end city by country
	const filteredCitiesList = cities?.filter(city => {
		return city?.CountryID === selectedCountry;
	});

	const {
		fields: emailFields,
		append: appendEmail,
		remove: removeEmail
	} = useFieldArray({
		control,
		name: 'emailItems'
	});

	const {
		fields: companyNameFields,
		append: appendCompanyName,
		remove: removeCompanyName
	} = useFieldArray({
		control,
		name: 'companyNameItems'
	});

	const {
		fields: telephoneFields,
		append: appendTelephone,
		remove: removeTelephone
	} = useFieldArray({
		control,
		name: 'telephoneItems'
	});

	/**
	 * Translate section
	 */
	function findByKey(arr, findVal) {
		if (arr?.length > 0) {
			const found = arr?.find(obj => {
				return obj.headerKey === findVal;
			});
			return found;
		}
		return '';
	}
	const codeText = findByKey(wordsList, 'CODE_TEXT');
	const companyNameText = findByKey(wordsList, 'COMPANY_NAME_TEXT');
	const otherCompanyNameText = findByKey(wordsList, 'OCNAME_TEXT');
	const emailText = findByKey(wordsList, 'EMAIL_TEXT');
	const otherEmailText = findByKey(wordsList, 'OEMAIL_TEXT');
	const otherPhoneText = findByKey(wordsList, 'OPHONE_TEXT');
	const phoneText = findByKey(wordsList, 'PHONE_TEXT');
	const bNoteText = findByKey(wordsList, 'BNOTE_TEXT');
	const websiteText = findByKey(wordsList, 'WEBSITE_TEXT');
	const countryText = findByKey(wordsList, 'COUNTRY_TEXT');
	const cityText = findByKey(wordsList, 'CITY_TEXT');

	const noFileText = findByKey(wordsList, 'NO_FILE_TEXT');

	return (
		<>
			<Grid container spacing={2} style={{ padding: 10 }}>
				<Grid item xs={4}>
					<div className="flex">
						<Controller
							control={control}
							name="code"
							rules={{ required: 'This field is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label={
										currentLanguageId === 'en'
											? codeText?.en_US
											: currentLanguageId === 'rus'
											? codeText?.rus
											: 'code'
									}
									id="code"
									size="small"
									error={!!errors.code}
									helperText={errors?.code?.message}
									variant="outlined"
									required
									fullWidth
									autoFocus
								/>
							)}
						/>
					</div>
					<div className="flex">
						<Grid container>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Controller
										control={control}
										name="companyName"
										render={({ field }) => (
											<TextField
												{...field}
												required
												label={
													currentLanguageId === 'en'
														? companyNameText?.en_US
														: currentLanguageId === 'rus'
														? companyNameText?.rus
														: 'Company Name'
												}
												className="mb-24"
												size="small"
												id="companyName"
												error={!!errors.companyName}
												helperText={errors?.companyName?.message}
												variant="outlined"
												fullWidth
											/>
										)}
									/>
								</Grid>
							</Grid>
							{companyNameFields.map((itemV, index) => (
								<Grid container spacing={2} key={itemV?.id}>
									<Grid item xs={2}>
										{index === 0 && (
											<IconButton
												aria-label="add"
												onClick={() => appendCompanyName({ companyName: '' })}
											>
												<AddCircleOutlineIcon />
											</IconButton>
										)}

										{index > 0 && (
											<IconButton aria-label="delete" onClick={() => removeCompanyName(index)}>
												<DeleteOutlineOutlinedIcon />
											</IconButton>
										)}
									</Grid>
									<Grid item xs={10}>
										<Controller
											control={control}
											name={`companyNameItems.${index}.companyName`}
											render={({ field }) => (
												<TextField
													{...field}
													className="mb-24"
													label={
														currentLanguageId === 'en'
															? otherCompanyNameText?.en_US
															: currentLanguageId === 'rus'
															? otherCompanyNameText?.rus
															: 'Other Company Name'
													}
													size="small"
													id={`companyNameItems.${index}.companyName`}
													error={
														errors.companyNameItems &&
														errors.companyNameItems[index] &&
														!!errors.companyNameItems[index].companyName
													}
													helperText={
														errors.companyNameItems &&
														errors.companyNameItems[index] &&
														errors.companyNameItems[index].companyName?.message
													}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>
								</Grid>
							))}
						</Grid>
					</div>

					{/* website */}
					<div className="flex">
						<Controller
							control={control}
							name="webSite"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label={
										currentLanguageId === 'en'
											? websiteText?.en_US
											: currentLanguageId === 'rus'
											? websiteText?.rus
											: 'WebSite'
									}
									size="small"
									id="website"
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>
					</div>
				</Grid>
				<Grid item xs={4}>
					<div className="flex">
						<FormControl fullWidth size="small" error={errors?.countryID}>
							<InputLabel id="serviceStartCountry-label">
								{currentLanguageId === 'en'
									? countryText?.en_US
									: currentLanguageId === 'rus'
									? countryText?.rus
									: 'Country'}
							</InputLabel>
							<Controller
								control={control}
								name="countryID"
								rules={{ required: 'Country is required' }}
								render={({ field }) => (
									<Select
										{...field}
										required
										className="mb-24"
										labelId="countryID-label"
										id="countryID-select"
										label={
											currentLanguageId === 'en'
												? countryText?.en_US
												: currentLanguageId === 'rus'
												? countryText?.rus
												: 'Country'
										}
										error={!!errors.countryID}
										helperText={errors?.countryID?.message}
									>
										<MenuItem value="">None</MenuItem>
										{countries?.map(country => (
											<MenuItem value={country?.CountryID}>
												{currentLanguageId === 'rus' ? country?.rus : country?.en_US}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							<FormHelperText>{errors?.countryID?.message}</FormHelperText>
						</FormControl>
					</div>

					<div className="flex">
						<Grid container>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Controller
										control={control}
										name="email"
										render={({ field }) => (
											<TextField
												{...field}
												required
												type="email"
												label={
													currentLanguageId === 'en'
														? emailText?.en_US
														: currentLanguageId === 'rus'
														? emailText?.rus
														: 'Email'
												}
												className="mb-24"
												size="small"
												id="email"
												error={!!errors.email}
												helperText={errors?.email?.message}
												variant="outlined"
												fullWidth
											/>
										)}
									/>
								</Grid>
							</Grid>
							{emailFields.map((itemV, index) => (
								<Grid container spacing={2} key={itemV.id}>
									<Grid item xs={2}>
										{index === 0 && (
											<IconButton aria-label="add" onClick={() => appendEmail({ email: '' })}>
												<AddCircleOutlineIcon />
											</IconButton>
										)}

										{index > 0 && (
											<IconButton aria-label="delete" onClick={() => removeEmail(index)}>
												<DeleteOutlineOutlinedIcon />
											</IconButton>
										)}
									</Grid>
									<Grid item xs={10}>
										<Controller
											control={control}
											name={`emailItems.${index}.email`}
											render={({ field }) => (
												<TextField
													{...field}
													type="email"
													className="mb-24"
													label={
														currentLanguageId === 'en'
															? otherEmailText?.en_US
															: currentLanguageId === 'rus'
															? otherEmailText?.rus
															: 'Other Email'
													}
													size="small"
													id={`emailItems.${index}.email`}
													variant="outlined"
													fullWidth
													error={
														errors.emailItems &&
														errors.emailItems[index] &&
														!!errors.emailItems[index].email
													}
													helperText={
														errors.emailItems &&
														errors.emailItems[index] &&
														errors.emailItems[index].email?.message
													}
												/>
											)}
										/>
									</Grid>
								</Grid>
							))}
						</Grid>
					</div>

					<div className="flex">
						<Controller
							control={control}
							name="note"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label={
										currentLanguageId === 'en'
											? bNoteText?.en_US
											: currentLanguageId === 'rus'
											? bNoteText?.rus
											: 'Note / FIRU / CONTRACT '
									}
									size="small"
									id="note"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
				</Grid>
				<Grid item xs={4}>
					<div className="flex">
						<FormControl fullWidth size="small" error={errors?.cityID}>
							<InputLabel id="cityID-label">
								{currentLanguageId === 'en'
									? cityText?.en_US
									: currentLanguageId === 'rus'
									? cityText?.rus
									: 'City'}
							</InputLabel>
							<Controller
								control={control}
								name="cityID"
								rules={{ required: 'City is required' }}
								render={({ field }) => (
									<Select
										{...field}
										required
										labelId="cityID-label"
										id="cityID-select"
										className="mb-24"
										label={
											currentLanguageId === 'en'
												? cityText?.en_US
												: currentLanguageId === 'rus'
												? cityText?.rus
												: 'City'
										}
										error={!!errors.cityID}
										helperText={errors?.cityID?.message}
									>
										<MenuItem value="">None</MenuItem>
										{filteredCitiesList?.map(city => (
											<MenuItem value={city?.CityID}>
												{currentLanguageId === 'rus' ? city?.rus : city?.en_US}
											</MenuItem>
										))}
									</Select>
								)}
							/>
							<FormHelperText>{errors?.cityID?.message}</FormHelperText>
						</FormControl>
					</div>

					<div className="flex">
						<Grid container>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Controller
										control={control}
										name="tpno"
										render={({ field }) => (
											<TextField
												{...field}
												required
												label={
													currentLanguageId === 'en'
														? phoneText?.en_US
														: currentLanguageId === 'rus'
														? phoneText?.rus
														: 'Phone'
												}
												className="mb-24"
												size="small"
												id="tpno"
												error={!!errors.tpno}
												helperText={errors?.tpno?.message}
												variant="outlined"
												fullWidth
											/>
										)}
									/>
								</Grid>
							</Grid>
							{telephoneFields.map((itemV, index) => (
								<Grid container spacing={2} key={itemV?.id}>
									<Grid item xs={2}>
										{index === 0 && (
											<IconButton aria-label="add" onClick={() => appendTelephone({ tpno: '' })}>
												<AddCircleOutlineIcon />
											</IconButton>
										)}

										{index > 0 && (
											<IconButton aria-label="delete" onClick={() => removeTelephone(index)}>
												<DeleteOutlineOutlinedIcon />
											</IconButton>
										)}
									</Grid>
									<Grid item xs={10}>
										<Controller
											control={control}
											name={`telephoneItems.${index}.tpno`}
											render={({ field }) => (
												<TextField
													{...field}
													className="mb-24"
													label={
														currentLanguageId === 'en'
															? otherPhoneText?.en_US
															: currentLanguageId === 'rus'
															? otherPhoneText?.rus
															: 'Other Phone'
													}
													size="small"
													id={`telephoneItems.${index}.tpno`}
													variant="outlined"
													fullWidth
													error={
														errors.telephoneItems &&
														errors.telephoneItems[index] &&
														!!errors.telephoneItems[index].tpno
													}
													helperText={
														errors.telephoneItems &&
														errors.telephoneItems[index] &&
														errors.telephoneItems[index].tpno?.message
													}
												/>
											)}
										/>
									</Grid>
								</Grid>
							))}
						</Grid>
					</div>
				</Grid>
			</Grid>

			<div className="flex" style={{ marginLeft: '15px' }}>
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					{contactTypesList &&
						contactTypesList.length > 0 &&
						contactTypesList.map(
							(
								val,
								index // Swap the positions of val and index
							) => (
								<Grid item xs={3} key={index}>
									<Controller
										name="contacttype"
										control={control}
										defaultValue={[]}
										rules={{ required: true }}
										render={({ field }) => (
											<FormControlLabel
												type="checkbox"
												control={
													<Checkbox
														{...field}
														checked={field.value.includes(val?.ContactTypeID)}
														onChange={e => {
															if (e.target.checked) {
																field.onChange([...field.value, val?.ContactTypeID]);
															} else {
																const updatedValue = field.value.filter(
																	id => id !== val?.ContactTypeID
																);
																field.onChange(updatedValue);
															}
														}}
													/>
												}
												label={
													currentLanguageId === 'en'
														? val?.en_US
														: currentLanguageId === 'rus'
														? val?.rus
														: val?.en_US
												}
											/>
										)}
									/>

									{errors.contacttype && (
										<span style={{ color: 'red' }}>{errors.contacttype.message}</span>
									)}
								</Grid>
							)
						)}
				</Grid>
			</div>
		</>
	);
}

export default ContactBasicinfo;
