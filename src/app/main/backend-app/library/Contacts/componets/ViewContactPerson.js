/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getCommonJobTitles } from '../store/commonJobTitleSlice';
import { getAllTitles } from '../store/titleSlice';
import DeleteReasonDialog from '../DeleteReasonDialog';

function ViewContactPerson(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const viewContactDetail = useSelector(({ addressBookApp }) => addressBookApp.contact);

	const [jobTitles, setJobTitles] = useState([]);
	const [titles, setTitles] = useState([]);
	const [selected, setSelected] = useState(null);
	const [selectedKey, setSelectedKey] = useState('');
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);

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

	/**
	 *  Open delete confimation Dialog
	 */
	const handleClickDeleteConfirmationOpen = (data, ID) => {
		setOpenDeleteReasonDialog(true);
		setSelected(ID);
		setSelectedKey(data?.key);
	};

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
				{viewContactDetail?.contactPerson &&
					viewContactDetail.contactPerson.length > 0 &&
					viewContactDetail?.contactPerson.map((contactPerson, index) => (
						<Grid item xs={viewContactDetail?.contactPerson.length === 1 ? 12 : 6} key={index}>
							<Card sx={{ minWidth: '100%' }} className="mb-24" key={contactPerson?.id}>
								<CardContent>
									<div className="flex">
										{contactPerson?.key !== '' && (
											<IconButton
												aria-label="delete"
												onClick={event => {
													handleClickDeleteConfirmationOpen(
														contactPerson,
														viewContactDetail?.id
													);
												}}
											>
												<DeleteOutlineOutlinedIcon />
											</IconButton>
										)}
										<Typography
											sx={{ fontSize: 14, marginTop: 1 }}
											color="text.secondary"
											gutterBottom
										>
											{currentLanguageId === 'en'
												? contactPersonTab?.en_US
												: currentLanguageId === 'rus'
												? contactPersonTab?.rus
												: 'Contact Person '}{' '}
											- ({index + 1})
										</Typography>
									</div>

									<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.contactPerson.length === 1 ? 3 : 6}
										>
											<FormControl fullWidth size="small">
												<InputLabel id="jobTitle-label">
													{currentLanguageId === 'en'
														? jobTitleText?.en_US
														: currentLanguageId === 'rus'
														? jobTitleText?.rus
														: 'Job Title'}
												</InputLabel>

												<Select
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
													readOnly
													value={contactPerson?.jobTitle}
												>
													{jobTitles?.map(jobTitle => (
														<MenuItem value={jobTitle?.JobTitleID}>
															{currentLanguageId === 'rus'
																? jobTitle?.rus
																: jobTitle?.en_US}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>

										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.contactPerson.length === 1 ? 3 : 6}
										>
											<FormControl fullWidth size="small">
												<InputLabel id="title-label">
													{currentLanguageId === 'en'
														? titleText?.en_US
														: currentLanguageId === 'rus'
														? titleText?.rus
														: 'Title'}
												</InputLabel>
												<Select
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
													readOnly
													value={contactPerson?.title}
												>
													{titles?.map(title => (
														<MenuItem
															value={title?.titles}
															selected={contactPerson?.title === title?.titles}
														>
															{title?.titles}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>

										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.contactPerson.length === 1 ? 3 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? fnameText?.en_US
														: currentLanguageId === 'rus'
														? fnameText?.rus
														: 'First Name'
												}
												value={contactPerson?.firstName}
												className="mb-24"
												size="small"
												id={`contactPersonItems.${index}.fname`}
												variant="outlined"
												fullWidth
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>

										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.contactPerson.length === 1 ? 3 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? lnameText?.en_US
														: currentLanguageId === 'rus'
														? lnameText?.rus
														: 'Last Name'
												}
												value={contactPerson?.lastName}
												className="mb-24"
												size="small"
												id={`contactPersonItems.${index}.lname`}
												variant="outlined"
												fullWidth
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>

										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.contactPerson.length === 1 ? 4 : 6}
										>
											<Grid container spacing={2}>
												<Grid item xs={12}>
													<TextField
														value={contactPerson?.email}
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
														variant="outlined"
														fullWidth
														InputProps={{
															readOnly: true
														}}
													/>
												</Grid>
											</Grid>
											<Grid container>
												{contactPerson?.otheremail?.length > 0 &&
													contactPerson?.otheremail.map((emailField, emailIndex) => (
														<Grid container spacing={2} key={emailIndex}>
															<Grid item xs={12}>
																<TextField
																	value={emailField?.email}
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
																	InputProps={{
																		readOnly: true
																	}}
																/>
															</Grid>
														</Grid>
													))}
											</Grid>
										</Grid>

										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.contactPerson.length === 1 ? 4 : 6}
										>
											<Grid container spacing={2}>
												<Grid item xs={6}>
													<TextField
														value={contactPerson?.telephones}
														label={
															currentLanguageId === 'en'
																? telephoneText?.en_US
																: currentLanguageId === 'rus'
																? telephoneText?.rus
																: 'Telephone'
														}
														className="mb-24"
														size="small"
														variant="outlined"
														fullWidth
														InputProps={{
															readOnly: true
														}}
													/>
												</Grid>
												<Grid item xs={6}>
													<TextField
														value={contactPerson?.extectionCode}
														label={
															currentLanguageId === 'en'
																? extensionText?.en_US
																: currentLanguageId === 'rus'
																? extensionText?.rus
																: 'Extention'
														}
														className="mb-24"
														size="small"
														variant="outlined"
														fullWidth
														InputProps={{
															readOnly: true
														}}
													/>
												</Grid>
											</Grid>
											<Grid container>
												{contactPerson?.othertpno?.length > 0 &&
													contactPerson?.othertpno?.map((itemE, indexE) => (
														<Grid container spacing={2} key={indexE}>
															<Grid item xs={10}>
																<TextField
																	value={itemE?.telephone}
																	label={
																		currentLanguageId === 'en'
																			? otherPhoneText?.en_US
																			: currentLanguageId === 'rus'
																			? otherPhoneText?.rus
																			: 'Telephone'
																	}
																	className="mb-24"
																	size="small"
																	id={`contactPersonItems.${index}.othertpno.${indexE}.tpno`}
																	variant="outlined"
																	fullWidth
																	InputProps={{
																		readOnly: true
																	}}
																/>
															</Grid>
															{/* <Grid item xs={2}>
																{itemE?.key !== '' && (
																	<IconButton aria-label="delete">
																		<DeleteOutlineOutlinedIcon />
																	</IconButton>
																)}
															</Grid> */}
														</Grid>
													))}
											</Grid>
										</Grid>

										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.contactPerson.length === 1 ? 4 : 6}
										>
											<Grid container>
												<Grid item xs={12}>
													<TextField
														value={contactPerson?.mobile}
														className="mb-24"
														label={
															currentLanguageId === 'en'
																? mobileText?.en_US
																: currentLanguageId === 'rus'
																? mobileText?.rus
																: 'Mobile'
														}
														size="small"
														variant="outlined"
														fullWidth
														InputProps={{
															readOnly: true
														}}
													/>
												</Grid>
											</Grid>
											<Grid container>
												{contactPerson?.othermobile?.length > 0 &&
													contactPerson?.othermobile?.map((itemE, indexE) => (
														<Grid container spacing={2} key={indexE}>
															<Grid item xs={10}>
																<TextField
																	value={itemE?.mobile}
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
																	variant="outlined"
																	fullWidth
																	InputProps={{
																		readOnly: true
																	}}
																/>
															</Grid>
															{/* <Grid item xs={2}>
																{itemE?.key !== '' && (
																	<IconButton aria-label="delete">
																		<DeleteOutlineOutlinedIcon />
																	</IconButton>
																)}
															</Grid> */}
														</Grid>
													))}
											</Grid>
										</Grid>

										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.contactPerson.length === 1 ? 4 : 6}
										>
											<TextField
												value={contactPerson?.Skype}
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
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					))}
			</Grid>

			<DeleteReasonDialog
				selectedIds={selected}
				openDeleteReasonDialog={openDeleteReasonDialog}
				setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
				deleteSection="contactPerson"
				selectedKey={selectedKey}
			/>
		</>
	);
}

export default ViewContactPerson;
