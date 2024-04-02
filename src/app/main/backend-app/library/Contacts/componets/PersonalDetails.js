/* eslint-disable import/no-extraneous-dependencies */
import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/lab';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getMtOffices } from 'app/main/backend-app/MDL_Purchasing department/store/mtOfficeSlice';
import JwtService from "../../../../../services/jwtService";

function PersonalDetails(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const methods = useFormContext();
	const { control, formState, register } = methods;
	const { errors } = formState;

	const [MtOffices, setMtOffices] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(getMtOffices()).then(res => {
				setMtOffices(res?.payload?.data);
			});
		};
		fetchData();
	}, [dispatch]);

	const {
		fields: employeeFields,
		append: appendEmployee,
		remove: removeEmployee
	} = useFieldArray({
		control,
		name: 'employeeItems'
	});

	useEffect(()=>{
		//for refresh the token
		JwtService.signInWithToken();
	},[employeeFields])

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
	const personalDetailsTab = findByKey(wordsList, 'P_DETAILS_TAB');
	const eofficeText = findByKey(wordsList, 'EOFFICE_TEXT');
	const fNameText = findByKey(wordsList, 'FNAME_TEXT');
	const lNameText = findByKey(wordsList, 'LNAME_TEXT');
	const dobText = findByKey(wordsList, 'DOB_TEXT');
	const genderText = findByKey(wordsList, 'GENDER_TEXT');
	const femaleText = findByKey(wordsList, 'FEMALE_TEXT');
	const maleText = findByKey(wordsList, 'MALE_TEXT');
	const langText = findByKey(wordsList, 'LANG_TEXT');
	const livesText = findByKey(wordsList, 'LIVES_TEXT');
	const hschoolText = findByKey(wordsList, 'HSCHOOL_TEXT');
	const grSchoolText = findByKey(wordsList, 'GSCHOOL_TEXT');
	const extensionText = findByKey(wordsList, 'EXTEN_TEXT');
	const bioDataText = findByKey(wordsList, 'BIODATA_TEXT');
	const hobbiesText = findByKey(wordsList, 'HOBBIES_TEXT');
	const imageUploadText = findByKey(wordsList, 'EIMAGE_TEXT');

	return (
		<>
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{employeeFields.map((employeeItem, index) => (
					<Grid item xs={employeeFields.length === 1 ? 12 : 6} key={index}>
						<Card sx={{ minWidth: '100%' }} className="mb-24" key={employeeItem?.id}>
							<CardContent>
								<div className="flex">
									<Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary" gutterBottom>
										{currentLanguageId === 'en'
											? personalDetailsTab?.en_US
											: currentLanguageId === 'rus'
											? personalDetailsTab?.rus
											: 'Personal Details'}
									</Typography>
								</div>
								<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.employeeItems &&
												errors.employeeItems[index] &&
												errors.employeeItems[index]?.mtoffice
											}
										>
											<InputLabel id="mtoffice-label">
												{currentLanguageId === 'en'
													? eofficeText?.en_US
													: currentLanguageId === 'rus'
													? eofficeText?.rus
													: 'Employee Office'}
											</InputLabel>
											<Controller
												control={control}
												name={`employeeItems.${index}.mtoffice`}
												render={({ field }) => (
													<Select
														{...field}
														className="mb-24"
														labelId="mtoffice-label"
														id={`employeeItems.${index}.mtoffice`}
														label={
															currentLanguageId === 'en'
																? eofficeText?.en_US
																: currentLanguageId === 'rus'
																? eofficeText?.rus
																: 'Employee Office'
														}
														error={
															errors.employeeItems &&
															errors.employeeItems[index] &&
															!!errors.employeeItems[index].mtoffice
														}
														helperText={
															errors.employeeItems &&
															errors.employeeItems[index] &&
															errors.employeeItems[index].mtoffice?.message
														}
													>
														<MenuItem value="">None</MenuItem>
														{MtOffices?.map(ite => (
															<MenuItem value={ite?.CompanyID}>
																{`${ite?.Code} -${ite?.CompanyName}`}
															</MenuItem>
														))}
													</Select>
												)}
											/>
											<FormHelperText>
												{errors.employeeItems &&
													errors.employeeItems[index] &&
													errors.employeeItems[index].mtoffice?.message}
											</FormHelperText>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.fname`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? fNameText?.en_US
															: currentLanguageId === 'rus'
															? fNameText?.rus
															: 'First name'
													}
													className="mb-24"
													size="small"
													id={`employeeItems.${index}.fname`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.lname`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? lNameText?.en_US
															: currentLanguageId === 'rus'
															? lNameText?.rus
															: 'Last name'
													}
													className="mb-24"
													size="small"
													id={`employeeItems.${index}.lname`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<Controller
											name={`employeeItems.${index}.dob`}
											id={`employeeItems.${index}.dob`}
											control={control}
											render={({ field: { onChange, value } }) => (
												<DatePicker
													label={
														currentLanguageId === 'en'
															? dobText?.en_US
															: currentLanguageId === 'rus'
															? dobText?.rus
															: 'Date of Birth'
													}
													onChange={date => {
														const formattedDate = moment(date).format('YYYY-MM-DD');
														value = formattedDate;
														onChange(formattedDate);
													}}
													dateFormat="yyyy-MM-dd"
													inputFormat="yyyy-MM-dd"
													value={value}
													disableFuture
													renderInput={params => (
														<TextField
															{...params}
															className="mb-12"
															error={
																errors.employeeItems &&
																errors.employeeItems[index] &&
																!!errors.employeeItems[index].dob
															}
															helperText={
																errors.employeeItems &&
																errors.employeeItems[index] &&
																errors.employeeItems[index].dob?.message
															}
															variant="outlined"
															size="small"
															fullWidth
														/>
													)}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.employeeItems &&
												errors.employeeItems[index] &&
												errors.employeeItems[index]?.gender
											}
										>
											<InputLabel id="demo-simple-select-label">Gender</InputLabel>
											<Controller
												control={control}
												name={`employeeItems.${index}.gender`}
												render={({ field }) => (
													<Select
														{...field}
														className="mb-24"
														labelId="demo-simple-select-label"
														id={`employeeItems.${index}.gender`}
														label={
															currentLanguageId === 'en'
																? genderText?.en_US
																: currentLanguageId === 'rus'
																? genderText?.rus
																: 'Gender'
														}
														error={
															errors.employeeItems &&
															errors.employeeItems[index] &&
															!!errors.employeeItems[index].gender
														}
														helperText={
															errors.employeeItems &&
															errors.employeeItems[index] &&
															errors.employeeItems[index].gender?.message
														}
													>
														<MenuItem value="male">
															{currentLanguageId === 'en'
																? maleText?.en_US
																: currentLanguageId === 'rus'
																? maleText?.rus
																: 'Male'}
														</MenuItem>
														<MenuItem value="female">
															{currentLanguageId === 'en'
																? femaleText?.en_US
																: currentLanguageId === 'rus'
																? femaleText?.rus
																: 'Female'}
														</MenuItem>
													</Select>
												)}
											/>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.languages`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? langText?.en_US
															: currentLanguageId === 'rus'
															? langText?.rus
															: 'Languages'
													}
													className="mb-24"
													size="small"
													id={`employeeItems.${index}.languages`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.livesin`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? livesText?.en_US
															: currentLanguageId === 'rus'
															? livesText?.rus
															: 'Lives in'
													}
													className="mb-24"
													size="small"
													id={`employeeItems.${index}.livesin`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.highschool`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? hschoolText?.en_US
															: currentLanguageId === 'rus'
															? hschoolText?.rus
															: 'High School'
													}
													className="mb-24"
													size="small"
													id={`employeeItems.${index}.highschool`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.gschool`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? grSchoolText?.en_US
															: currentLanguageId === 'rus'
															? grSchoolText?.rus
															: 'Graduated School'
													}
													className="mb-24"
													size="small"
													id={`employeeItems.${index}.gschool`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={employeeFields.length === 1 ? 4 : 6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.ext`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? extensionText?.en_US
															: currentLanguageId === 'rus'
															? extensionText?.rus
															: 'Extension'
													}
													className="mb-24"
													size="small"
													id={`employeeItems.${index}.ext`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>
								</Grid>
								<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
									<Grid item xs={12} sm={6} md={6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.biodata`}
											render={({ field }) => (
												<TextField
													{...field}
													className="mb-12"
													label={
														currentLanguageId === 'en'
															? bioDataText?.en_US
															: currentLanguageId === 'rus'
															? bioDataText?.rus
															: 'Bio Data'
													}
													id={`employeeItems.${index}.biodata`}
													variant="outlined"
													multiline
													rows={5}
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={6}>
										<Controller
											control={control}
											name={`employeeItems.${index}.hobbies`}
											render={({ field }) => (
												<TextField
													{...field}
													className="mb-12"
													label={
														currentLanguageId === 'en'
															? hobbiesText?.en_US
															: currentLanguageId === 'rus'
															? hobbiesText?.rus
															: 'Hobbies/ Interests'
													}
													id={`employeeItems.${index}.hobbies`}
													variant="outlined"
													multiline
													rows={5}
													fullWidth
												/>
											)}
										/>
									</Grid>
								</Grid>
								<div className="flex">
									<InputLabel htmlFor="file-upload" style={{ marginTop: '10px' }}>
										{currentLanguageId === 'en'
											? imageUploadText?.en_US
											: currentLanguageId === 'rus'
											? imageUploadText?.rus
											: 'Upload Employee Picture'}
									</InputLabel>{' '}
									<br />
									<input
										accept="image/*"
										id="avatar"
										{...register(`employeeItems.${index}.avatar`)}
										type="file"
									/>
								</div>

								{/* <Button variant="outlined" fullWidth size="small" component="label">
									Upload Employee Picture
									<input
										hidden
										accept="image/*"
										id="avatar"
										{...register(`employeeItems.${index}.avatar`)}
										onChange={handleFileChange}
										type="file"
									/>
								</Button> */}
								{/* {selectedFile && (
									<Grid item xs={12}>
										<img src={URL.createObjectURL(selectedFile)} alt="Uploaded" width="200" />
										<Button variant="outlined" color="error" onClick={handleRemoveImage}>
											Remove
										</Button>
									</Grid>
								)} */}
								{errors.employeeItems && errors.employeeItems[index]?.avatar && (
									<Grid item xs={12}>
										<p>{errors.employeeItems[index].avatar.message}</p>
									</Grid>
								)}
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default PersonalDetails;
