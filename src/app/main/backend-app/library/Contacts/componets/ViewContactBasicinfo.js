/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getAllCountries } from 'app/main/backend-app/MDL_Purchasing department/store/countrySlice';
import { getAllCities } from 'app/main/backend-app/MDL_Purchasing department/store/citySlice';
import { getCommonContactTypes } from '../store/commonContactTypeSlice';
import DeleteReasonDialog from '../DeleteReasonDialog';

function ViewContactBasicinfo(props) {
	const dispatch = useDispatch();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const viewContactDetail = useSelector(({ addressBookApp }) => addressBookApp.contact);
	const [contactTypesList, setContactTypes] = useState([]);
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);

	const [selected, setSelected] = useState(null);
	const [selectedKey, setSelectedKey] = useState('');
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);
	const [deleteSection, setDeleteSection] = useState('');

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

	return (
		<>
			<Grid container spacing={2} style={{ padding: 10 }}>
				<Grid item xs={4}>
					<div className="flex">
						<TextField
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
							variant="outlined"
							value={viewContactDetail?.code}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					</div>
					<div className="flex">
						<Grid container>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										value={viewContactDetail?.companyName}
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
										variant="outlined"
										fullWidth
										InputProps={{
											readOnly: true
										}}
									/>
								</Grid>
							</Grid>
							{viewContactDetail?.otherCompanyName?.length > 0 &&
								viewContactDetail?.otherCompanyName.map((itemV, index) => (
									<Grid container spacing={2} key={itemV?.id}>
										<Grid item xs={10}>
											<TextField
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
												variant="outlined"
												fullWidth
												value={itemV?.companyName}
											/>
										</Grid>
										<Grid item xs={2}>
											<IconButton
												aria-label="delete"
												onClick={event => {
													setDeleteSection('basicInfoOtherCompany');
													handleClickDeleteConfirmationOpen(itemV, viewContactDetail?.id);
												}}
											>
												<DeleteOutlineOutlinedIcon />
											</IconButton>
										</Grid>
									</Grid>
								))}
						</Grid>
					</div>

					{/* website */}
					<div className="flex">
						<TextField
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
							value={viewContactDetail?.webSite}
							fullWidth
							InputProps={{
								readOnly: true
							}}
						/>
					</div>
				</Grid>
				<Grid item xs={4}>
					<div className="flex">
						<FormControl fullWidth size="small">
							<InputLabel id="cityID-label">
								{currentLanguageId === 'en'
									? countryText?.en_US
									: currentLanguageId === 'rus'
									? countryText?.rus
									: 'Country'}
							</InputLabel>
							<Select
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
								readOnly
								value={viewContactDetail?.countryID}
							>
								{countries?.map(country => (
									<MenuItem
										value={country?.CountryID}
										selected={country?.CountryID === viewContactDetail?.countryID}
									>
										{currentLanguageId === 'rus' ? country?.rus : country?.en_US}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div className="flex">
						<Grid container>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										value={viewContactDetail?.email}
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
							{viewContactDetail?.otheremail?.length > 0 &&
								viewContactDetail?.otheremail.map((itemV, index) => (
									<Grid container spacing={2} key={itemV.id}>
										<Grid item xs={12}>
											<TextField
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
												value={itemV?.email}
											/>
										</Grid>
									</Grid>
								))}
						</Grid>
					</div>

					<div className="flex">
						<TextField
							value={viewContactDetail?.note}
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
							InputProps={{
								readOnly: true
							}}
						/>
					</div>
				</Grid>
				<Grid item xs={4}>
					<div className="flex">
						<FormControl fullWidth size="small">
							<InputLabel id="cityID-label">
								{currentLanguageId === 'en'
									? cityText?.en_US
									: currentLanguageId === 'rus'
									? cityText?.rus
									: 'City'}
							</InputLabel>

							<Select
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
								readOnly
								value={viewContactDetail?.cityID}
							>
								{cities?.map(city => (
									<MenuItem
										value={city?.CityID}
										selected={city?.CityID === viewContactDetail?.cityID}
									>
										{currentLanguageId === 'rus' ? city?.rus : city?.en_US}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<div className="flex">
						<Grid container>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										value={viewContactDetail?.telephone}
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
										variant="outlined"
										fullWidth
										InputProps={{
											readOnly: true
										}}
									/>
								</Grid>
							</Grid>
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
									<FormControlLabel
										type="checkbox"
										control={
											<Checkbox
												readOnly
												checked={viewContactDetail?.contactType.some(
													item => item?.type === val?.ContactTypeID
												)}
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
								</Grid>
							)
						)}
				</Grid>
			</div>

			<DeleteReasonDialog
				selectedIds={selected}
				openDeleteReasonDialog={openDeleteReasonDialog}
				setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
				deleteSection={deleteSection}
				selectedKey={selectedKey}
			/>
		</>
	);
}

export default ViewContactBasicinfo;
