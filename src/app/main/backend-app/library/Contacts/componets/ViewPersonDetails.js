/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DatePicker } from '@mui/lab';
import { getMtOffices } from 'app/main/backend-app/MDL_Purchasing department/store/mtOfficeSlice';
import IImageWithZoomDialog from './IImageWithZoomDialog';
import DeleteReasonDialog from '../DeleteReasonDialog';

function ViewPersonDetails(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const viewContactDetail = useSelector(({ addressBookApp }) => addressBookApp.contact);

	const [MtOffices, setMtOffices] = useState([]);

	const [openZoomDialog, setOpenZoomDialog] = useState(false);
	const [selectedZoomImage, setSelectedZoomImage] = useState('');
	const [selected, setSelected] = useState(null);
	const [selectedKey, setSelectedKey] = useState('');
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(getMtOffices()).then(res => {
				setMtOffices(res?.payload?.data);
			});
		};
		fetchData();
	}, [dispatch]);

	/**
	 * Zoom image
	 */
	const hanldeOpenZoomImage = imgUrl => {
		setSelectedZoomImage(imgUrl);
		setOpenZoomDialog(true);
	};

	const handleCloseZoomImage = () => {
		setSelectedZoomImage('');
		setOpenZoomDialog(false);
	};

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
				{viewContactDetail?.personalDetails &&
					viewContactDetail.personalDetails.length > 0 &&
					viewContactDetail?.personalDetails.map((employeeItem, index) => (
						<Grid item xs={viewContactDetail?.personalDetails.length === 1 ? 12 : 6} key={index}>
							<Card sx={{ minWidth: '100%' }} className="mb-24" key={index}>
								<CardContent>
									<div className="flex">
										{employeeItem?.key !== '' && (
											<IconButton
												aria-label="delete"
												onClick={event => {
													handleClickDeleteConfirmationOpen(
														employeeItem,
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
												? personalDetailsTab?.en_US
												: currentLanguageId === 'rus'
												? personalDetailsTab?.rus
												: 'Personal Details'}
										</Typography>
									</div>
									<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<FormControl fullWidth size="small">
												<InputLabel id="mtoffice-label">
													{currentLanguageId === 'en'
														? eofficeText?.en_US
														: currentLanguageId === 'rus'
														? eofficeText?.rus
														: 'Employee Office'}
												</InputLabel>

												<Select
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
													readOnly
													value={employeeItem?.mtOffice}
												>
													{MtOffices?.map(ite => (
														<MenuItem
															value={ite?.CompanyID}
															selected={employeeItem?.mtOffice === ite?.CompanyID}
														>
															{`${ite?.Code} -${ite?.CompanyName}`}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>

										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? fNameText?.en_US
														: currentLanguageId === 'rus'
														? fNameText?.rus
														: 'First name'
												}
												className="mb-24"
												size="small"
												value={employeeItem?.fname}
												id={`employeeItems.${index}.fname`}
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
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? lNameText?.en_US
														: currentLanguageId === 'rus'
														? lNameText?.rus
														: 'Last name'
												}
												value={employeeItem?.lname}
												className="mb-24"
												size="small"
												id={`employeeItems.${index}.lname`}
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
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<DatePicker
												label={
													currentLanguageId === 'en'
														? dobText?.en_US
														: currentLanguageId === 'rus'
														? dobText?.rus
														: 'Date of Birth'
												}
												dateFormat="yyyy-MM-dd"
												inputFormat="yyyy-MM-dd"
												value={employeeItem?.dob}
												disableFuture
												renderInput={params => (
													<TextField
														{...params}
														className="mb-12"
														variant="outlined"
														size="small"
														fullWidth
														InputProps={{
															readOnly: true
														}}
													/>
												)}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<FormControl fullWidth size="small">
												<InputLabel id="demo-simple-select-label">Gender</InputLabel>

												<Select
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
												>
													<MenuItem value={employeeItem?.gender} selected>
														{employeeItem?.gender}
													</MenuItem>
												</Select>
											</FormControl>
										</Grid>
										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? langText?.en_US
														: currentLanguageId === 'rus'
														? langText?.rus
														: 'Languages'
												}
												className="mb-24"
												value={employeeItem?.languages}
												size="small"
												id={`employeeItems.${index}.languages`}
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
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? livesText?.en_US
														: currentLanguageId === 'rus'
														? livesText?.rus
														: 'Lives in'
												}
												value={employeeItem?.living}
												className="mb-24"
												size="small"
												id={`employeeItems.${index}.livesin`}
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
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? hschoolText?.en_US
														: currentLanguageId === 'rus'
														? hschoolText?.rus
														: 'High School'
												}
												value={employeeItem?.highSchool}
												className="mb-24"
												size="small"
												id={`employeeItems.${index}.highschool`}
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
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? grSchoolText?.en_US
														: currentLanguageId === 'rus'
														? grSchoolText?.rus
														: 'Graduated School'
												}
												value={employeeItem?.graduatedSchool}
												className="mb-24"
												size="small"
												id={`employeeItems.${index}.gschool`}
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
											md={viewContactDetail?.personalDetails.length === 1 ? 4 : 6}
										>
											<TextField
												label={
													currentLanguageId === 'en'
														? extensionText?.en_US
														: currentLanguageId === 'rus'
														? extensionText?.rus
														: 'Extension'
												}
												value={employeeItem?.extention}
												className="mb-24"
												size="small"
												id={`employeeItems.${index}.ext`}
												variant="outlined"
												fullWidth
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>
									<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
										<Grid item xs={12} sm={6} md={6}>
											<TextField
												className="mb-12"
												label={
													currentLanguageId === 'en'
														? bioDataText?.en_US
														: currentLanguageId === 'rus'
														? bioDataText?.rus
														: 'Bio Data'
												}
												value={employeeItem?.biodata}
												id={`employeeItems.${index}.biodata`}
												variant="outlined"
												multiline
												rows={5}
												fullWidth
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>

										<Grid item xs={12} sm={6} md={6}>
											<TextField
												className="mb-12"
												label={
													currentLanguageId === 'en'
														? hobbiesText?.en_US
														: currentLanguageId === 'rus'
														? hobbiesText?.rus
														: 'Hobbies/ Interests'
												}
												value={employeeItem?.hobbies}
												id={`employeeItems.${index}.hobbies`}
												variant="outlined"
												multiline
												rows={5}
												fullWidth
												InputProps={{
													readOnly: true
												}}
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
										<div>
											<Card sx={{ minWidth: 100, maxHeight: 70 }}>
												<CardContent>
													<img
														src={employeeItem?.ProfilePicture}
														onClick={() =>
															hanldeOpenZoomImage(employeeItem?.ProfilePicture)
														}
														alt="logo"
													/>
												</CardContent>
											</Card>
										</div>
									</div>
								</CardContent>
							</Card>
						</Grid>
					))}

				<IImageWithZoomDialog
					openZoomDialog={openZoomDialog}
					handleCloseZoomImage={handleCloseZoomImage}
					imageUrl={selectedZoomImage}
				/>

				<DeleteReasonDialog
					selectedIds={selected}
					openDeleteReasonDialog={openDeleteReasonDialog}
					setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
					deleteSection="personalDetails"
					selectedKey={selectedKey}
				/>
			</Grid>
		</>
	);
}

export default ViewPersonDetails;
