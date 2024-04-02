/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getCommonJobTitles } from '../store/commonJobTitleSlice';
import { getAllTitles } from '../store/titleSlice';
import JwtService from "../../../../../services/jwtService";

function ContactPerson(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	const [jobTitles, setJobTitles] = useState([]);
	const [titles, setTitles] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(getCommonJobTitles()).then(res => {
				setJobTitles(res?.payload?.data);
			});

			dispatch(getAllTitles()).then(res => {
				setTitles(res?.payload?.data);
			});
		};
		fetchData();
	}, [dispatch]);

	const {
		fields: contactPersonFields,
		append: appendContactPerson,
		remove: removeContactPerson
	} = useFieldArray({
		control,
		name: 'contactPersonItems'
	});

	useEffect(()=>{
		//for refresh the token
		JwtService.signInWithToken();
	},[contactPersonFields])


	const {
		fields: emailsFields,
		append: appendEmail,
		remove: removeEmail
	} = useFieldArray({
		control,
		name: 'otheremail'
	});

	const {
		fields: telephonesFields,
		append: appendTelephone,
		remove: removeTelephone
	} = useFieldArray({
		control,
		name: 'othertpno'
	});

	const {
		fields: mobilesFields,
		append: appendMobile,
		remove: removeMobile
	} = useFieldArray({
		control,
		name: 'othermobile'
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
	const contactPersonTab = findByKey(wordsList, 'CON_PERSON_TAB');
	const jobTitleText = findByKey(wordsList, 'JTITLE_TEXT');
	const titleText = findByKey(wordsList, 'TITLE_TEXT');
	const fnameText = findByKey(wordsList, 'FNAME_TEXT');
	const lnameText = findByKey(wordsList, 'LNAME_TEXT');
	const emailText = findByKey(wordsList, 'EMAIL_TEXT');
	const otherEmailText = findByKey(wordsList, 'OEMAIL_TEXT');
	const telephoneText = findByKey(wordsList, 'TELEPHONE_TEXT');
	const extensionText = findByKey(wordsList, 'EXTEN_TEXT');
	const otherPhoneText = findByKey(wordsList, 'OPHONE_TEXT');
	const mobileText = findByKey(wordsList, 'MOB_TEXT');
	const skypeText = findByKey(wordsList, 'SKYPE_TEXT');

	return (
		<>
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{contactPersonFields.map((contactPerson, index) => (
					<Grid item xs={contactPersonFields.length === 1 ? 12 : 6} key={index}>
						<Card sx={{ minWidth: '100%' }} className="mb-24" key={contactPerson?.id}>
							<CardContent>
								<div className="flex">
									{index === 0 && (
										<IconButton
											aria-label="add"
											onClick={() =>
												appendContactPerson({
													jobtle: '',
													title: '',
													fname: '',
													lname: '',
													email: '',
													tpno: '',
													ext: '',
													mobiles: '',
													skype: ''
												})
											}
										>
											<AddCircleOutlineIcon />
										</IconButton>
									)}
									{index > 0 && (
										<IconButton aria-label="delete" onClick={() => removeContactPerson(index)}>
											<DeleteOutlineOutlinedIcon />
										</IconButton>
									)}
									<Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary" gutterBottom>
										{currentLanguageId === 'en'
											? contactPersonTab?.en_US
											: currentLanguageId === 'rus'
											? contactPersonTab?.rus
											: 'Contact Person '}
										- ({index + 1})
									</Typography>
								</div>

								<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
									<Grid item xs={12} sm={6} md={contactPersonFields.length === 1 ? 3 : 6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.contactPersonItems &&
												errors.contactPersonItems[index] &&
												errors.contactPersonItems[index].jobtle?.message
											}
										>
											<InputLabel id="jobTitle-label">
												{currentLanguageId === 'en'
													? jobTitleText?.en_US
													: currentLanguageId === 'rus'
													? jobTitleText?.rus
													: 'Job Title'}
											</InputLabel>
											<Controller
												control={control}
												name={`contactPersonItems.${index}..jobtle`}
												render={({ field }) => (
													<Select
														{...field}
														className="mb-24"
														labelId="jobTitle-label"
														id={`contactPersonItems.${index}.jobtle`}
														label={
															currentLanguageId === 'en'
																? jobTitleText?.en_US
																: currentLanguageId === 'rus'
																? jobTitleText?.rus
																: 'Job Title'
														}
														error={
															errors.contactPersonItems &&
															errors.contactPersonItems[index] &&
															!!errors.contactPersonItems[index].jobtle
														}
														helperText={
															errors.contactPersonItems &&
															errors.contactPersonItems[index] &&
															errors.contactPersonItems[index].jobtle?.message
														}
													>
														<MenuItem value="">None</MenuItem>
														{jobTitles?.map(jobTitle => (
															<MenuItem value={jobTitle?.JobTitleID}>
																{currentLanguageId === 'rus'
																	? jobTitle?.rus
																	: jobTitle?.en_US}
															</MenuItem>
														))}
													</Select>
												)}
											/>
											<FormHelperText>
												{errors.contactPersonItems &&
													errors.contactPersonItems[index] &&
													errors.contactPersonItems[index].jobtle?.message}
											</FormHelperText>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6} md={contactPersonFields.length === 1 ? 3 : 6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.contactPersonItems &&
												errors.contactPersonItems[index] &&
												errors.contactPersonItems[index].title?.message
											}
										>
											<InputLabel id="title-label">
												{currentLanguageId === 'en'
													? titleText?.en_US
													: currentLanguageId === 'rus'
													? titleText?.rus
													: 'Title'}
											</InputLabel>
											<Controller
												control={control}
												name={`contactPersonItems.${index}.title`}
												render={({ field }) => (
													<Select
														{...field}
														className="mb-24"
														labelId="title-label"
														id={`contactPersonItems.${index}.title`}
														label={
															currentLanguageId === 'en'
																? titleText?.en_US
																: currentLanguageId === 'rus'
																? titleText?.rus
																: 'Title'
														}
														error={
															errors.contactPersonItems &&
															errors.contactPersonItems[index] &&
															!!errors.contactPersonItems[index].title
														}
														helperText={
															errors.contactPersonItems &&
															errors.contactPersonItems[index] &&
															errors.contactPersonItems[index].title?.message
														}
													>
														<MenuItem value="">None</MenuItem>
														{titles?.map(title => (
															<MenuItem value={title?.titles}>{title?.titles}</MenuItem>
														))}
													</Select>
												)}
											/>
											<FormHelperText>
												{errors.contactPersonItems &&
													errors.contactPersonItems[index] &&
													errors.contactPersonItems[index].title?.message}
											</FormHelperText>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6} md={contactPersonFields.length === 1 ? 3 : 6}>
										<Controller
											control={control}
											name={`contactPersonItems.${index}.fname`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? fnameText?.en_US
															: currentLanguageId === 'rus'
															? fnameText?.rus
															: 'First Name'
													}
													required
													className="mb-24"
													size="small"
													id={`contactPersonItems.${index}.fname`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={contactPersonFields.length === 1 ? 3 : 6}>
										<Controller
											control={control}
											name={`contactPersonItems.${index}.lname`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? lnameText?.en_US
															: currentLanguageId === 'rus'
															? lnameText?.rus
															: 'Last Name'
													}
													required
													className="mb-24"
													size="small"
													id={`contactPersonItems.${index}.lname`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={contactPersonFields.length === 1 ? 4 : 6}>
										<Grid container>
											<Grid container spacing={2}>
												<Grid item xs={12}>
													<Controller
														control={control}
														name={`contactPersonItems.${index}.email`}
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
																id={`contactPersonItems.${index}.email`}
																error={
																	errors.contactPersonItems &&
																	errors.contactPersonItems[index] &&
																	!!errors.contactPersonItems[index].email
																}
																helperText={
																	errors.contactPersonItems &&
																	errors.contactPersonItems[index] &&
																	errors.contactPersonItems[index].email?.message
																}
																variant="outlined"
																fullWidth
															/>
														)}
													/>
												</Grid>
											</Grid>

											{emailsFields.map((emailField, emailIndex) => (
												<Grid container spacing={2} key={emailField.id}>
													<Grid item xs={2}>
														{/* Add or remove email */}
														{emailIndex === 0 && (
															<IconButton
																aria-label="add"
																onClick={() =>
																	appendEmail({ email: '', contactPersonKey: index })
																}
															>
																<AddCircleOutlineIcon />
															</IconButton>
														)}
														{emailIndex > 0 && (
															<IconButton
																aria-label="delete"
																onClick={() => removeEmail(emailIndex)}
															>
																<DeleteOutlineOutlinedIcon />
															</IconButton>
														)}
													</Grid>
													<Grid item xs={10}>
														{/* Render email input */}
														<Controller
															control={control}
															name={`contactPersonItems.${index}.otheremail.${emailIndex}.email`}
															rules={{ required: 'This field is required' }}
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
																	variant="outlined"
																	fullWidth
																/>
															)}
														/>
													</Grid>
												</Grid>
											))}
										</Grid>
									</Grid>

									<Grid item xs={12} sm={6} md={contactPersonFields.length === 1 ? 4 : 6}>
										<Grid container>
											<Grid container spacing={2}>
												<Grid item xs={6}>
													<Controller
														control={control}
														name={`contactPersonItems.${index}.tpno`}
														render={({ field }) => (
															<TextField
																{...field}
																required
																label={
																	currentLanguageId === 'en'
																		? telephoneText?.en_US
																		: currentLanguageId === 'rus'
																		? telephoneText?.rus
																		: 'Telephone'
																}
																className="mb-24"
																size="small"
																id={`contactPersonItems.${index}.tpno`}
																error={
																	errors.contactPersonItems &&
																	errors.contactPersonItems[index] &&
																	!!errors.contactPersonItems[index].tpno
																}
																helperText={
																	errors.contactPersonItems &&
																	errors.contactPersonItems[index] &&
																	errors.contactPersonItems[index].tpno?.message
																}
																variant="outlined"
																fullWidth
															/>
														)}
													/>
												</Grid>
												<Grid item xs={6}>
													<Controller
														control={control}
														name={`contactPersonItems.${index}.ext`}
														render={({ field }) => (
															<TextField
																{...field}
																label={
																	currentLanguageId === 'en'
																		? extensionText?.en_US
																		: currentLanguageId === 'rus'
																		? extensionText?.rus
																		: 'Extention'
																}
																className="mb-24"
																size="small"
																id={`contactPersonItems.${index}.ext`}
																error={
																	errors.contactPersonItems &&
																	errors.contactPersonItems[index] &&
																	!!errors.contactPersonItems[index].ext
																}
																helperText={
																	errors.contactPersonItems &&
																	errors.contactPersonItems[index] &&
																	errors.contactPersonItems[index].ext?.message
																}
																variant="outlined"
																fullWidth
															/>
														)}
													/>
												</Grid>
											</Grid>
											{telephonesFields.map((itemE, indexE) => (
												<Grid container spacing={2} key={itemE?.id}>
													<Grid item xs={2}>
														{indexE === 0 && (
															<IconButton
																aria-label="add"
																onClick={() =>
																	appendTelephone({
																		tpno: '',
																		contactPersonKey: index
																	})
																}
															>
																<AddCircleOutlineIcon />
															</IconButton>
														)}

														{indexE > 0 && (
															<IconButton
																aria-label="delete"
																onClick={() => removeTelephone(indexE)}
															>
																<DeleteOutlineOutlinedIcon />
															</IconButton>
														)}
													</Grid>
													<Grid item xs={10}>
														<Controller
															control={control}
															name={`contactPersonItems.${index}.othertpno.${indexE}.tpno`}
															rules={{ required: 'This field is required' }}
															render={({ field }) => (
																<TextField
																	{...field}
																	className="mb-24"
																	label={
																		currentLanguageId === 'en'
																			? otherPhoneText?.en_US
																			: currentLanguageId === 'rus'
																			? otherPhoneText?.rus
																			: 'Telephone'
																	}
																	size="small"
																	id={`contactPersonItems.${index}.othertpno.${indexE}.tpno`}
																	// error={
																	// 	errors.contactPersonItems &&
																	// 	errors.contactPersonItems[index]?.othertpno &&
																	// 	errors.contactPersonItems[index]?.othertpno[indexE]
																	// 		?.tpno
																	// }
																	// helperText={
																	// 	errors.contactPersonItems &&
																	// 	errors.contactPersonItems[index]?.othertpno &&
																	// 	errors.contactPersonItems[index]?.othertpno[indexE]
																	// 		?.tpno?.message
																	// }
																	variant="outlined"
																	fullWidth
																/>
															)}
														/>
													</Grid>

													{/* <Grid item xs={5}>
														<Controller
															control={control}
															name={`contactPersonItems.${index}.othertpno.${indexE}.ext`}
															rules={{ required: 'This field is required' }}
															render={({ field }) => (
																<TextField
																	{...field}
																	className="mb-24"
																	label="Extention"
																	size="small"
																	id={`contactPersonItems.${index}.othertpno.${indexE}.ext`}
																	error={
																		errors.contactPersonItems &&
																		errors.contactPersonItems[index]?.othertpno &&
																		errors.contactPersonItems[index]?.othertpno[
																			indexE
																		]?.ext
																	}
																	helperText={
																		errors.contactPersonItems &&
																		errors.contactPersonItems[index]?.othertpno &&
																		errors.contactPersonItems[index]?.othertpno[
																			indexE
																		]?.ext?.message
																	}
																	variant="outlined"
																	fullWidth
																/>
															)}
														/>
													</Grid> */}
												</Grid>
											))}
										</Grid>
									</Grid>

									<Grid item xs={12} sm={6} md={contactPersonFields.length === 1 ? 4 : 6}>
										<Grid container>
											<Grid container spacing={2}>
												{/* <Grid item xs={2}></Grid> */}
												<Grid item xs={12}>
													<Controller
														control={control}
														name={`contactPersonItems.${index}.mobiles`}
														render={({ field }) => (
															<TextField
																{...field}
																required
																label={
																	currentLanguageId === 'en'
																		? mobileText?.en_US
																		: currentLanguageId === 'rus'
																		? mobileText?.rus
																		: 'Mobile'
																}
																className="mb-24"
																size="small"
																id={`contactPersonItems.${index}.mobiles`}
																error={
																	errors.contactPersonItems &&
																	errors.contactPersonItems[index] &&
																	!!errors.contactPersonItems[index].mobiles
																}
																helperText={
																	errors.contactPersonItems &&
																	errors.contactPersonItems[index] &&
																	errors.contactPersonItems[index].mobiles?.message
																}
																variant="outlined"
																fullWidth
															/>
														)}
													/>
												</Grid>
											</Grid>
											{mobilesFields.map((itemE, indexE) => (
												<Grid container spacing={2} key={itemE?.id}>
													<Grid item xs={2}>
														{indexE === 0 && (
															<IconButton
																aria-label="add"
																onClick={() =>
																	appendMobile({
																		mobile: '',
																		contactPersonKey: index
																	})
																}
															>
																<AddCircleOutlineIcon />
															</IconButton>
														)}

														{indexE > 0 && (
															<IconButton
																aria-label="delete"
																onClick={() => removeMobile(indexE)}
															>
																<DeleteOutlineOutlinedIcon />
															</IconButton>
														)}
													</Grid>
													<Grid item xs={10}>
														<Controller
															control={control}
															name={`contactPersonItems.${index}.othermobile.${indexE}.mobile`}
															render={({ field }) => (
																<TextField
																	{...field}
																	className="mb-24"
																	label={
																		currentLanguageId === 'en'
																			? mobileText?.en_US
																			: currentLanguageId === 'rus'
																			? mobileText?.rus
																			: 'Mobile'
																	}
																	size="small"
																	id={`contactPersonItems.${index}.othermobile.${indexE}.mobile`}
																	// error={
																	// 	errors.contactPersonItems &&
																	// 	errors.contactPersonItems[index]?.othermobile &&
																	// 	errors.contactPersonItems[index]?.othermobile[indexE]
																	// 		?.mobile
																	// }
																	// helperText={
																	// 	errors.contactPersonItems &&
																	// 	errors.contactPersonItems[index]?.othermobile &&
																	// 	errors.contactPersonItems[index]?.othermobile[indexE]
																	// 		?.mobile?.message
																	// }
																	variant="outlined"
																	fullWidth
																/>
															)}
														/>
													</Grid>
												</Grid>
											))}
										</Grid>
									</Grid>

									<Grid item xs={12} sm={6} md={contactPersonFields.length === 1 ? 4 : 6}>
										<Controller
											control={control}
											name={`contactPersonItems.${index}.skype`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? skypeText?.en_US
															: currentLanguageId === 'rus'
															? skypeText?.rus
															: 'Skype - Any Other'
													}
													className="mb-24"
													size="small"
													id={`contactPersonItems.${index}.skype`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default ContactPerson;
