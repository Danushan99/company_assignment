/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/lab';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getCurrencyTypeList } from 'app/main/backend-app/administrator/system/CurrencyType/store/currencyTypeSlice';
import { getAgreementTypes } from '../store/agreementTypeSlice';
import { getPayTypes } from '../store/payTypeSlice';
import IImageWithZoomDialog from './IImageWithZoomDialog';
import DeleteReasonDialog from '../DeleteReasonDialog';

function ViewAgreementContact(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const viewContactDetail = useSelector(({ addressBookApp }) => addressBookApp.contact);

	const [currencyList, setCurrencyList] = useState([]);
	const [agreementTypes, setAgreementTypes] = useState([]);
	const [payTypes, setPayTypes] = useState([]);

	const [openZoomDialog, setOpenZoomDialog] = useState(false);
	const [selectedZoomImage, setSelectedZoomImage] = useState('');
	const [selected, setSelected] = useState('');
	const [selectedKey, setSelectedKey] = useState('');
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(getAgreementTypes()).then(res => {
				setAgreementTypes(res?.payload);
			});

			dispatch(getCurrencyTypeList()).then(res => {
				setCurrencyList(res?.payload?.data);
			});

			dispatch(getPayTypes()).then(res => {
				setPayTypes(res?.payload);
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
	const handleClickDeleteConfirmationOpen = (data, id) => {
		setOpenDeleteReasonDialog(true);
		setSelected(id);
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
	const agreementTab = findByKey(wordsList, 'AGREEMENT_TAB');
	const agreeTypeText = findByKey(wordsList, 'AG_TYPE_TEXT');
	const refNumberText = findByKey(wordsList, 'REF_NUM_TEXT');
	const descriptionText = findByKey(wordsList, 'DESC_TEXT');
	const taCurrencyText = findByKey(wordsList, 'TA_CURRENCY_TEXT');
	const inCurrencyText = findByKey(wordsList, 'IN_CURRENCY_TEXT');
	const settCurrencyText = findByKey(wordsList, 'SET_CURRENCY_TEXT');
	const paymentText = findByKey(wordsList, 'PAYMENT_TEXT');
	const daysText = findByKey(wordsList, 'DAYS_TEXT');
	const bankDetailsText = findByKey(wordsList, 'BANK_DET_TEXT');
	const signOnText = findByKey(wordsList, 'SIGN_ON_TEXT');
	const expireOnText = findByKey(wordsList, 'EXPIRE_ON_TEXT');
	const uploadText = findByKey(wordsList, 'UP_AGREE_TEXT');

	return (
		<>
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{viewContactDetail?.agreements &&
					viewContactDetail.agreements.length > 0 &&
					viewContactDetail?.agreements.map((agreementItem, index) => (
						<Grid item xs={viewContactDetail?.agreements.length === 1 ? 12 : 6} key={index}>
							<Card sx={{ minWidth: '100%' }} className="mb-24" key={index}>
								<CardContent>
									<div className="flex">
										{agreementItem?.key !== '' && (
											<IconButton
												aria-label="delete"
												onClick={event => {
													handleClickDeleteConfirmationOpen(
														agreementItem,
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
												? agreementTab?.en_US
												: currentLanguageId === 'rus'
												? agreementTab?.rus
												: 'Agreement/ Contract'}{' '}
											- ({index + 1})
										</Typography>
									</div>

									<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.agreements.length === 1 ? 4 : 6}
										>
											<FormControl fullWidth size="small">
												<InputLabel id="agretype-label">
													{currentLanguageId === 'en'
														? agreeTypeText?.en_US
														: currentLanguageId === 'rus'
														? agreeTypeText?.rus
														: 'Agreement Type'}
												</InputLabel>

												<Select
													className="mb-24"
													labelId="agretype-label"
													id={`contactagreementItems.${index}.agretype`}
													label={
														currentLanguageId === 'en'
															? agreeTypeText?.en_US
															: currentLanguageId === 'rus'
															? agreeTypeText?.rus
															: 'Agreement Type'
													}
													readOnly
													value={agreementItem?.agreementType}
												>
													{agreementTypes?.map(ite => (
														<MenuItem
															value={ite?.TypeID}
															selected={ite?.TypeID === agreementItem?.agreementType}
														>
															{currentLanguageId === 'rus'
																? ite?.Type_rus
																: ite?.Type_en_US}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>

										<Grid item xs={12} sm={6} md={6}>
											<TextField
												label={
													currentLanguageId === 'en'
														? refNumberText?.en_US
														: currentLanguageId === 'rus'
														? refNumberText?.rus
														: 'Reference Number'
												}
												value={agreementItem?.agreNo}
												className="mb-24"
												size="small"
												id={`contactagreementItems.${index}.refNo`}
												variant="outlined"
												fullWidth
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>

										<Grid item xs={12} sm={6} md={6}>
											<TextField
												value={agreementItem?.description}
												label={
													currentLanguageId === 'en'
														? descriptionText?.en_US
														: currentLanguageId === 'rus'
														? descriptionText?.rus
														: 'Description'
												}
												className="mb-12"
												id={`contactagreementItems.${index}.discription`}
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

									<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.agreements.length === 1 ? 4 : 6}
										>
											<FormControl fullWidth size="small">
												<InputLabel id="tariffCurrency-label">
													{currentLanguageId === 'en'
														? taCurrencyText?.en_US
														: currentLanguageId === 'rus'
														? taCurrencyText?.rus
														: 'Tarrif Currency'}
												</InputLabel>
												<Select
													className="mb-24"
													labelId="tariffCurrency-label"
													id={`contactagreementItems.${index}.tarifCcy`}
													label={
														currentLanguageId === 'en'
															? taCurrencyText?.en_US
															: currentLanguageId === 'rus'
															? taCurrencyText?.rus
															: 'Tarrif Currency'
													}
													readOnly
													value={agreementItem?.tariffCcy}
												>
													{currencyList?.map(ite => (
														<MenuItem
															value={ite?.currency}
															selected={agreementItem?.tariffCcy === ite?.currency}
														>
															{ite?.currency}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.agreements.length === 1 ? 4 : 6}
										>
											<FormControl fullWidth size="small">
												<InputLabel id="invoCcy-label">
													{currentLanguageId === 'en'
														? inCurrencyText?.en_US
														: currentLanguageId === 'rus'
														? inCurrencyText?.rus
														: 'Invoice Currency'}
												</InputLabel>

												<Select
													className="mb-24"
													labelId="invoCcy-label"
													id={`contactagreementItems.${index}.invoCcy`}
													label={
														currentLanguageId === 'en'
															? inCurrencyText?.en_US
															: currentLanguageId === 'rus'
															? inCurrencyText?.rus
															: 'Invoice Currency'
													}
													readOnly
													value={agreementItem?.invoiceCcy}
												>
													{currencyList?.map(ite => (
														<MenuItem
															value={ite?.currency}
															selected={agreementItem?.invoiceCcy === ite?.currency}
														>
															{ite?.currency}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>
										<Grid
											item
											xs={12}
											sm={6}
											md={viewContactDetail?.agreements.length === 1 ? 4 : 6}
										>
											<FormControl fullWidth size="small">
												<InputLabel id="setleCcy-label">
													{currentLanguageId === 'en'
														? settCurrencyText?.en_US
														: currentLanguageId === 'rus'
														? settCurrencyText?.rus
														: 'Settlement Currency'}
												</InputLabel>

												<Select
													className="mb-24"
													labelId="setleCcy-label"
													id={`contactagreementItems.${index}.setleCcy`}
													label={
														currentLanguageId === 'en'
															? settCurrencyText?.en_US
															: currentLanguageId === 'rus'
															? settCurrencyText?.rus
															: 'Settlement Currency'
													}
													readOnly
													value={agreementItem?.setlementCcy}
												>
													{currencyList?.map(ite => (
														<MenuItem
															value={ite?.currency}
															selected={agreementItem?.setlementCcy === ite?.currency}
														>
															{ite?.currency}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>

										<Grid item xs={12} sm={6} md={6}>
											<TextField
												value={agreementItem?.paymentTerms}
												label={
													currentLanguageId === 'en'
														? paymentText?.en_US
														: currentLanguageId === 'rus'
														? paymentText?.rus
														: 'Payment'
												}
												className="mb-24"
												size="small"
												id={`contactagreementItems.${index}.payment`}
												variant="outlined"
												fullWidth
												InputProps={{
													readOnly: true
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={6} md={6}>
											<FormControl fullWidth size="small">
												<InputLabel id="paytype-label">
													{currentLanguageId === 'en'
														? daysText?.en_US
														: currentLanguageId === 'rus'
														? daysText?.rus
														: 'Days'}
												</InputLabel>

												<Select
													className="mb-24"
													labelId="paytype-label"
													id={`contactagreementItems.${index}.paytype`}
													label={
														currentLanguageId === 'en'
															? daysText?.en_US
															: currentLanguageId === 'rus'
															? daysText?.rus
															: 'Days'
													}
													readOnly
													value={agreementItem?.payDate}
												>
													{payTypes?.map(ite => (
														<MenuItem
															value={ite?.TypeID}
															selected={agreementItem?.payDate === ite?.TypeID}
														>
															{currentLanguageId === 'en'
																? ite?.Type_en_US
																: currentLanguageId === 'rus'
																? ite?.Type_rus
																: ite?.Type_en_US}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</Grid>

										<Grid item xs={12} sm={6} md={6}>
											<TextField
												value={agreementItem?.BankDetails}
												label={
													currentLanguageId === 'en'
														? bankDetailsText?.en_US
														: currentLanguageId === 'rus'
														? bankDetailsText?.rus
														: 'Bank Details'
												}
												className="mb-12"
												id={`contactagreementItems.${index}.bankDtl`}
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
											<DatePicker
												label={
													currentLanguageId === 'en'
														? signOnText?.en_US
														: currentLanguageId === 'rus'
														? signOnText?.rus
														: 'Sign On'
												}
												dateFormat="yyyy-MM-dd"
												inputFormat="yyyy-MM-dd"
												value={agreementItem?.signOn}
												renderInput={params => (
													<TextField
														{...params}
														className="mt-4 mb-8"
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
										<Grid item xs={12} sm={6} md={6}>
											<DatePicker
												label={
													currentLanguageId === 'en'
														? expireOnText?.en_US
														: currentLanguageId === 'rus'
														? expireOnText?.rus
														: 'Expire On'
												}
												dateFormat="yyyy-MM-dd"
												inputFormat="yyyy-MM-dd"
												value={agreementItem?.expOn}
												renderInput={params => (
													<TextField
														{...params}
														className="mt-4 mb-8"
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
									</Grid>

									<div className="flex">
										<InputLabel htmlFor="file-upload" style={{ marginTop: '10px' }}>
											{currentLanguageId === 'en'
												? uploadText?.en_US
												: currentLanguageId === 'rus'
												? uploadText?.rus
												: 'Upload Agreement'}
										</InputLabel>{' '}
										<br />
										<div>
											<Card sx={{ minWidth: 100, maxHeight: 70 }}>
												<CardContent>
													<img
														src={agreementItem?.fileName}
														onClick={() => hanldeOpenZoomImage(agreementItem?.fileName)}
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
					deleteSection="contactAgreement"
					selectedKey={selectedKey}
				/>
			</Grid>
		</>
	);
}

export default ViewAgreementContact;
