/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { DatePicker } from '@mui/lab';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { findByKey } from 'app/main/utils/utils';
import { toast } from 'react-toastify';
import {
	addExchangeRate,
	closeEditExchangeRateDialog,
	closeNewExchangeRateDialog,
	updateExchangeRate,
	getExchangeRateList
} from './store/exchangeRateSlice';
import JwtService from "../../../../services/jwtService";

const defaultValues = {
	Date: '',
	USD: '1',
	LKR: '',
	RUB: '',
	EUR: '',
	INR: '',
	CNY: ''
};
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	Date: yup.string().trim().required('Date is required'),
	USD: yup.number().required('USD is required'),
	LKR: yup
		.string()
		.trim()
		.matches(
			/^\d+(\.\d{0,4})?$/,
			'Must be only digits and the amount should be a decimal with maximum 4 digits after `.`'
		)
		// .matches(/^[0-9.]+$/, 'Must be only digits')
		.required('LKR is required'),
	RUB: yup
		.string()
		.trim()
		.matches(
			/^\d+(\.\d{0,4})?$/,
			'Must be only digits and the amount should be a decimal with maximum 4 digits after `.`'
		)
		// .matches(/^[0-9.]+$/, 'Must be only digits')
		.required('RUB is required'),
	EUR: yup
		.string()
		.trim()
		.matches(
			/^\d+(\.\d{0,4})?$/,
			'Must be only digits and the amount should be a decimal with maximum 4 digits after `.`'
		)
		// .matches(/^[0-9.]+$/, 'Must be only digits')
		.required('EUR is required'),
	INR: yup
		.string()
		.trim()
		.matches(
			/^\d+(\.\d{0,4})?$/,
			'Must be only digits and the amount should be a decimal with maximum 4 digits after `.`'
		)
		// .matches(/^[0-9.]+$/, 'Must be only digits')
		.required('INR is required'),
	CNY: yup
		.string()
		.trim()
		.matches(
			/^\d+(\.\d{0,4})?$/,
			'Must be only digits and the amount should be a decimal with maximum 4 digits after `.`'
		)
		// .matches(/^[0-9.]+$/, 'Must be only digits')
		.required('CNY is required')
});

function ExchangeRateDialog(props) {
	const { data, setData } = props;
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const routeParams = useParams();

	const currentDate = moment().format('YYYY-MM-DD');
	const exchangeRateDialog = useSelector(({ exchangeRateApp }) => exchangeRateApp.rates.exchangeRateDialog);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const { handleSubmit, formState, reset, control } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { errors, isValid, dirtyFields } = formState;

	/**
	 * Initialize Dialog with Data
	 */
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (exchangeRateDialog.type === 'edit' && exchangeRateDialog.data) {
			reset({ ...exchangeRateDialog.data, ...exchangeRateDialog.selectedId });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (exchangeRateDialog.type === 'new') {
			reset({
				...defaultValues,
				...exchangeRateDialog.data,
				...exchangeRateDialog.selectedId
			});
		}
	}, [exchangeRateDialog.data, exchangeRateDialog.type, exchangeRateDialog.selectedId, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (exchangeRateDialog.props.open) {
			initDialog();
		}
		JwtService.signInWithToken();
	}, [exchangeRateDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeDialog() {
		return exchangeRateDialog.type === 'edit'
			? dispatch(closeEditExchangeRateDialog())
			: dispatch(closeNewExchangeRateDialog());
	}

	/**
	 * Form Submit
	 */
	function onSubmit(formdata) {
		const formdate = moment(formdata?.Date).format('YYYY-MM-DD');
		const isAddedCurrentDate = data?.find(obj => {
			return obj?.Date === formdate;
		});

		if (isAddedCurrentDate && exchangeRateDialog.type === 'new') {
			toast.error('Already added current date. please select another date', {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 4000
			});
		} else {
			// data?.find((item) => { item?.Date  })
			const submitData = {
				Date: formdate.toString(),
				USD: formdata?.USD.toString(),
				LKR: formdata?.LKR.toString(),
				RUB: formdata?.RUB.toString(),
				EUR: formdata?.EUR.toString(),
				INR: formdata?.INR.toString(),
				CNY: formdata?.CNY.toString()
			};
			if (exchangeRateDialog.type === 'new') {
				dispatch(addExchangeRate(submitData)).then(response => {
					dispatch(getExchangeRateList(routeParams)).then(responseall => {
						setData(responseall?.payload?.data);
					});
				});
			} else {
				dispatch(updateExchangeRate({ ...exchangeRateDialog.data, ...submitData })).then(response => {
					dispatch(getExchangeRateList(routeParams)).then(responseall => {
						setData(responseall?.payload?.data);
					});
				});
			}
		}
		closeDialog();
	}

	// common words translater
	const addTitle = findByKey(commonTranslateWordsArray, 'ADD_NEW_TITLE');
	const editTitle = findByKey(commonTranslateWordsArray, 'EDIT_TITLE');
	const addBtn = findByKey(commonTranslateWordsArray, 'ADD_BTN');
	const closeBtn = findByKey(commonTranslateWordsArray, 'CLOSE_BTN');
	const saveBtn = findByKey(commonTranslateWordsArray, 'SAVE_BTN');
	// page words translater
	const usdText = findByKey(wordsList, 'USD_TITLE');
	const lkrText = findByKey(wordsList, 'LKR_TITLE');
	const rusText = findByKey(wordsList, 'RUS_TITLE');
	const eurText = findByKey(wordsList, 'EUR_TITLE');
	const inrText = findByKey(wordsList, 'INR_TITLE');
	const cnyText = findByKey(wordsList, 'CNY_TITLE');
	return (
		<Dialog {...exchangeRateDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{exchangeRateDialog.type === 'new'
							? currentLanguageId === 'en'
								? addTitle?.en_US
								: currentLanguageId === 'rus'
								? addTitle?.rus
								: t('ADD_NEW')
							: currentLanguageId === 'en'
							? editTitle?.en_US
							: currentLanguageId === 'rus'
							? editTitle?.rus
							: t('EDIT')}
					</Typography>
				</Toolbar>
			</AppBar>

			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent classes={{ root: 'p-0' }}>
					<div className="px-16 sm:px-24">
						<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<Grid item xs={4} sx={{ marginTop: '12px' }}>
								{exchangeRateDialog.type === 'edit' && (
									<Controller
										name="Date"
										id="Date"
										control={control}
										render={({ field: { onChange, value } }) => (
											<DatePicker
												label="Date"
												inputFormat="yyyy-MM-dd"
												defaultValue={currentDate}
												value={value}
												onChange={onChange}
												disableFuture
												readOnly
												renderInput={params => (
													<TextField
														{...params}
														className="mt-4 mb-8"
														error={!!errors.Date}
														helperText={errors?.Date?.message}
														variant="outlined"
														size="small"
														fullWidth
													/>
												)}
											/>
										)}
									/>
									// <Controller
									// 	name="Date"
									// 	control={control}
									// 	render={({ field }) => (
									// 		<TextField
									// 			{...field}
									// 			type="date"
									// 			error={!!errors.Date}
									// 			helperText={errors?.Date?.message}
									// 			required
									// 			variant="outlined"
									// 			size="small"
									// 			fullWidth
									// 			InputProps={{
									// 				readOnly: true
									// 			}}
									// 		/>
									// 	)}
									// />
								)}

								{exchangeRateDialog.type === 'new' && (
									<Controller
										name="Date"
										id="Date"
										control={control}
										render={({ field: { onChange, value } }) => (
											<DatePicker
												label="Date"
												inputFormat="yyyy-MM-dd"
												defaultValue={currentDate}
												value={value}
												onChange={onChange}
												disableFuture
												required
												renderInput={params => (
													<TextField
														{...params}
														className="mt-4 mb-8"
														error={!!errors.Date}
														helperText={errors?.Date?.message}
														variant="outlined"
														size="small"
														fullWidth
													/>
												)}
											/>
										)}
									/>
								)}
							</Grid>

							<Grid item xs={4} sx={{ marginTop: '12px' }}>
								<Controller
									name="USD"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? usdText?.en_US
													: currentLanguageId === 'rus'
													? usdText?.rus
													: 'USD'
											}
											error={!!errors.USD}
											helperText={errors?.USD?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
										/>
									)}
								/>
							</Grid>

							<Grid item xs={4} sx={{ marginTop: '12px' }}>
								<Controller
									name="LKR"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? lkrText?.en_US
													: currentLanguageId === 'rus'
													? lkrText?.rus
													: 'LKR'
											}
											error={!!errors.LKR}
											helperText={errors?.LKR?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
										/>
									)}
								/>
							</Grid>

							<Grid item xs={4} sx={{ marginTop: '12px' }}>
								<Controller
									name="RUB"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? rusText?.en_US
													: currentLanguageId === 'rus'
													? rusText?.rus
													: 'RUB'
											}
											error={!!errors.RUB}
											helperText={errors?.RUB?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
										/>
									)}
								/>
							</Grid>

							<Grid item xs={4} sx={{ marginTop: '12px' }}>
								<Controller
									name="EUR"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? eurText?.en_US
													: currentLanguageId === 'rus'
													? eurText?.rus
													: 'EUR'
											}
											error={!!errors.EUR}
											helperText={errors?.EUR?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
										/>
									)}
								/>
							</Grid>

							<Grid item xs={4} sx={{ marginTop: '12px' }}>
								<Controller
									name="INR"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? inrText?.en_US
													: currentLanguageId === 'rus'
													? inrText?.rus
													: 'INR'
											}
											error={!!errors.INR}
											helperText={errors?.INR?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
										/>
									)}
								/>
							</Grid>

							<Grid item xs={4} sx={{ marginTop: '12px' }}>
								<Controller
									name="CNY"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? cnyText?.en_US
													: currentLanguageId === 'rus'
													? cnyText?.rus
													: 'CNY'
											}
											error={!!errors.CNY}
											helperText={errors?.CNY?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
										/>
									)}
								/>
							</Grid>
						</Grid>
					</div>
				</DialogContent>

				{exchangeRateDialog.type === 'new' ? (
					<DialogActions className="justify-between px-8 py-16">
						<div className="px-16">
							<Button type="button" variant="contained" onClick={closeDialog}>
								{currentLanguageId === 'en'
									? closeBtn?.en_US
									: currentLanguageId === 'rus'
									? closeBtn?.rus
									: t('CLOSE')}
							</Button>
						</div>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							disabled={_.isEmpty(dirtyFields || !isValid)}
						>
							{currentLanguageId === 'en'
								? addBtn?.en_US
								: currentLanguageId === 'rus'
								? addBtn?.rus
								: t('ADD')}
						</Button>
					</DialogActions>
				) : (
					<DialogActions className="justify-between px-8 py-16">
						<div className="px-16">
							<Button type="button" variant="contained" onClick={closeDialog}>
								{currentLanguageId === 'en'
									? closeBtn?.en_US
									: currentLanguageId === 'rus'
									? closeBtn?.rus
									: t('CLOSE')}
							</Button>
						</div>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							// disabled={_.isEmpty(dirtyFields) || !isValid}
						>
							{currentLanguageId === 'en'
								? saveBtn?.en_US
								: currentLanguageId === 'rus'
								? saveBtn?.rus
								: t('SAVE')}
						</Button>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default ExchangeRateDialog;
