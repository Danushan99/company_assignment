/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFieldArray, Controller, useFormContext } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import FormHelperText from '@mui/material/FormHelperText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/lab';
import moment from 'moment';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getCurrencyTypeList } from 'app/main/backend-app/administrator/system/CurrencyType/store/currencyTypeSlice';
import { getAgreementTypes } from '../store/agreementTypeSlice';
import { getPayTypes } from '../store/payTypeSlice';
import JwtService from "../../../../../services/jwtService";

function AgreementContactinfo(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);

	const methods = useFormContext();
	const { control, formState, register, setValue, watch, getValues } = methods;
	const { errors } = formState;

	const [currencyList, setCurrencyList] = useState([]);
	const [agreementTypes, setAgreementTypes] = useState([]);
	const [payTypes, setPayTypes] = useState([]);

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

	const {
		fields: contactagreementFields,
		append: appendAgreement,
		remove: removeAgreement
	} = useFieldArray({
		control,
		name: 'contactagreementItems'
	});

	useEffect(()=>{
		//for refresh the token
		JwtService.signInWithToken();
	},[contactagreementFields])

	const currentDate = moment().format('YYYY-MM-DD');
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
				{contactagreementFields.map((agreementItem, index) => (
					<Grid item xs={contactagreementFields.length === 1 ? 12 : 6} key={index}>
						<Card sx={{ minWidth: '100%' }} className="mb-24" key={agreementItem?.id}>
							<CardContent>
								<div className="flex">
									{index === 0 && (
										<IconButton
											aria-label="add"
											onClick={() =>
												appendAgreement({
													agretype: '',
													refNo: '',
													discription: '',
													tarifCcy: '',
													invoCcy: '',
													setleCcy: '',
													payment: '',
													paytype: '',
													bankDtl: '',
													signNo: '',
													expire: '',
													agrementFile: null
												})
											}
										>
											<AddCircleOutlineIcon />
										</IconButton>
									)}

									{index > 0 && (
										<IconButton aria-label="delete" onClick={() => removeAgreement(index)}>
											<DeleteOutlineOutlinedIcon />
										</IconButton>
									)}
									<Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary" gutterBottom>
										{currentLanguageId === 'en'
											? agreementTab?.en_US
											: currentLanguageId === 'rus'
											? agreementTab?.rus
											: 'Agreement/ Contract'}{' '}
										- ({index + 1})
									</Typography>
								</div>

								<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
									<Grid item xs={12} sm={6} md={contactagreementFields.length === 1 ? 4 : 6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.contactagreementItems &&
												errors.contactagreementItems[index] &&
												errors.contactagreementItems[index]?.agretype
											}
										>
											<InputLabel id="agretype-label">
												{currentLanguageId === 'en'
													? agreeTypeText?.en_US
													: currentLanguageId === 'rus'
													? agreeTypeText?.rus
													: 'Agreement Type'}
											</InputLabel>
											<Controller
												control={control}
												name={`contactagreementItems.${index}.agretype`}
												render={({ field }) => (
													<Select
														{...field}
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
														error={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															!!errors.contactagreementItems[index].agretype
														}
														helperText={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															errors.contactagreementItems[index].agretype?.message
														}
													>
														<MenuItem value="">None</MenuItem>
														{agreementTypes?.map(ite => (
															<MenuItem value={ite?.TypeID}>
																{currentLanguageId === 'rus'
																	? ite?.Type_rus
																	: ite?.Type_en_US}
															</MenuItem>
														))}
													</Select>
												)}
											/>
											<FormHelperText>
												{errors.contactagreementItems &&
													errors.contactagreementItems[index] &&
													errors.contactagreementItems[index].agretype?.message}
											</FormHelperText>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6} md={6}>
										<Controller
											control={control}
											name={`contactagreementItems.${index}.refNo`}
											render={({ field }) => (
												<TextField
													{...field}
													label={
														currentLanguageId === 'en'
															? refNumberText?.en_US
															: currentLanguageId === 'rus'
															? refNumberText?.rus
															: 'Reference Number'
													}
													required
													className="mb-24"
													size="small"
													id={`contactagreementItems.${index}.refNo`}
													variant="outlined"
													fullWidth
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={6}>
										<Controller
											control={control}
											name={`contactagreementItems.${index}.discription`}
											render={({ field }) => (
												<TextField
													{...field}
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
												/>
											)}
										/>
									</Grid>
								</Grid>

								<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
									<Grid item xs={12} sm={6} md={contactagreementFields.length === 1 ? 4 : 6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.contactagreementItems &&
												errors.contactagreementItems[index] &&
												errors.contactagreementItems[index]?.tarifCcy
											}
										>
											<InputLabel id="tariffCurrency-label">
												{currentLanguageId === 'en'
													? taCurrencyText?.en_US
													: currentLanguageId === 'rus'
													? taCurrencyText?.rus
													: 'Tarrif Currency'}
											</InputLabel>
											<Controller
												control={control}
												name={`contactagreementItems.${index}.tarifCcy`}
												render={({ field }) => (
													<Select
														{...field}
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
														error={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															!!errors.contactagreementItems[index].tarifCcy
														}
														helperText={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															errors.contactagreementItems[index].tarifCcy?.message
														}
													>
														<MenuItem value="">None</MenuItem>
														{currencyList?.map(ite => (
															<MenuItem value={ite?.currency}>{ite?.currency}</MenuItem>
														))}
													</Select>
												)}
											/>
											<FormHelperText>
												{errors.contactagreementItems &&
													errors.contactagreementItems[index] &&
													errors.contactagreementItems[index].tarifCcy?.message}
											</FormHelperText>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6} md={contactagreementFields.length === 1 ? 4 : 6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.contactagreementItems &&
												errors.contactagreementItems[index] &&
												errors.contactagreementItems[index]?.invoCcy
											}
										>
											<InputLabel id="invoCcy-label">
												{currentLanguageId === 'en'
													? inCurrencyText?.en_US
													: currentLanguageId === 'rus'
													? inCurrencyText?.rus
													: 'Invoice Currency'}
											</InputLabel>
											<Controller
												control={control}
												name={`contactagreementItems.${index}.invoCcy`}
												render={({ field }) => (
													<Select
														{...field}
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
														error={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															!!errors.contactagreementItems[index].invoCcy
														}
														helperText={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															errors.contactagreementItems[index].invoCcy?.message
														}
													>
														<MenuItem value="">None</MenuItem>
														{currencyList?.map(ite => (
															<MenuItem value={ite?.currency}>{ite?.currency}</MenuItem>
														))}
													</Select>
												)}
											/>
											<FormHelperText>
												{errors.contactagreementItems &&
													errors.contactagreementItems[index] &&
													errors.contactagreementItems[index].invoCcy?.message}
											</FormHelperText>
										</FormControl>
									</Grid>
									<Grid item xs={12} sm={6} md={contactagreementFields.length === 1 ? 4 : 6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.contactagreementItems &&
												errors.contactagreementItems[index] &&
												errors.contactagreementItems[index]?.setleCcy
											}
										>
											<InputLabel id="setleCcy-label">
												{currentLanguageId === 'en'
													? settCurrencyText?.en_US
													: currentLanguageId === 'rus'
													? settCurrencyText?.rus
													: 'Settlement Currency'}
											</InputLabel>
											<Controller
												control={control}
												name={`contactagreementItems.${index}.setleCcy`}
												render={({ field }) => (
													<Select
														{...field}
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
														error={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															!!errors.contactagreementItems[index].setleCcy
														}
														helperText={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															errors.contactagreementItems[index].setleCcy?.message
														}
													>
														<MenuItem value="">None</MenuItem>
														{currencyList?.map(ite => (
															<MenuItem value={ite?.currency}>{ite?.currency}</MenuItem>
														))}
													</Select>
												)}
											/>
											<FormHelperText>
												{errors.contactagreementItems &&
													errors.contactagreementItems[index] &&
													errors.contactagreementItems[index].setleCcy?.message}
											</FormHelperText>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6} md={6}>
										<Controller
											control={control}
											name={`contactagreementItems.${index}.payment`}
											render={({ field }) => (
												<TextField
													{...field}
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
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={6}>
										<FormControl
											fullWidth
											size="small"
											error={
												errors.contactagreementItems &&
												errors.contactagreementItems[index] &&
												errors.contactagreementItems[index]?.paytype
											}
										>
											<InputLabel id="paytype-label">
												{currentLanguageId === 'en'
													? daysText?.en_US
													: currentLanguageId === 'rus'
													? daysText?.rus
													: 'Days'}
											</InputLabel>
											<Controller
												control={control}
												name={`contactagreementItems.${index}.paytype`}
												render={({ field }) => (
													<Select
														{...field}
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
														error={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															!!errors.contactagreementItems[index].paytype
														}
														helperText={
															errors.contactagreementItems &&
															errors.contactagreementItems[index] &&
															errors.contactagreementItems[index].paytype?.message
														}
													>
														<MenuItem value="">None</MenuItem>
														{payTypes?.map(ite => (
															<MenuItem value={ite?.TypeID}>
																{currentLanguageId === 'en'
																	? ite?.Type_en_US
																	: currentLanguageId === 'rus'
																	? ite?.Type_rus
																	: ite?.Type_en_US}
															</MenuItem>
														))}
													</Select>
												)}
											/>
											<FormHelperText>
												{errors.contactagreementItems &&
													errors.contactagreementItems[index] &&
													errors.contactagreementItems[index].paytype?.message}
											</FormHelperText>
										</FormControl>
									</Grid>

									<Grid item xs={12} sm={6} md={6}>
										<Controller
											control={control}
											name={`contactagreementItems.${index}.bankDtl`}
											render={({ field }) => (
												<TextField
													{...field}
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
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} sm={6} md={6}>
										<Controller
											name={`contactagreementItems.${index}.signNo`}
											id={`contactagreementItems.${index}.signNo`}
											control={control}
											render={({ field: { onChange, value } }) => (
												<DatePicker
													label={
														currentLanguageId === 'en'
															? signOnText?.en_US
															: currentLanguageId === 'rus'
															? signOnText?.rus
															: 'Sign On'
													}
													onChange={date => {
														const formattedDate = moment(date).format('YYYY-MM-DD');
														value = formattedDate;
														onChange(formattedDate);
													}}
													dateFormat="yyyy-MM-dd"
													inputFormat="yyyy-MM-dd"
													value={value}
													renderInput={params => (
														<TextField
															{...params}
															className="mt-4 mb-8"
															error={
																errors.contactagreementItems &&
																errors.contactagreementItems[index] &&
																!!errors.contactagreementItems[index].signNo
															}
															helperText={
																errors.contactagreementItems &&
																errors.contactagreementItems[index] &&
																errors.contactagreementItems[index].signNo?.message
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
									<Grid item xs={12} sm={6} md={6}>
										<Controller
											name={`contactagreementItems.${index}.expire`}
											id={`contactagreementItems.${index}.expire`}
											control={control}
											render={({ field: { onChange, value } }) => (
												<DatePicker
													label={
														currentLanguageId === 'en'
															? expireOnText?.en_US
															: currentLanguageId === 'rus'
															? expireOnText?.rus
															: 'Expire On'
													}
													onChange={date => {
														const formattedDate = moment(date).format('YYYY-MM-DD');
														value = formattedDate;
														onChange(formattedDate);
													}}
													dateFormat="yyyy-MM-dd"
													inputFormat="yyyy-MM-dd"
													value={value}
													renderInput={params => (
														<TextField
															{...params}
															className="mt-4 mb-8"
															error={
																errors.contactagreementItems &&
																errors.contactagreementItems[index] &&
																!!errors.contactagreementItems[index].expire
															}
															helperText={
																errors.contactagreementItems &&
																errors.contactagreementItems[index] &&
																errors.contactagreementItems[index].expire?.message
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
									<input
										id="agrementFile"
										{...register(`contactagreementItems.${index}.agrementFile`)}
										type="file"
									/>
								</div>

								{/* <Button variant="outlined" fullWidth size="small">
									Browse
								</Button> */}
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default AgreementContactinfo;
