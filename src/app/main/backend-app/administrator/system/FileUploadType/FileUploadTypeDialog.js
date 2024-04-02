/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
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
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import {
	addFileUploadType,
	closeEditFileUploadTypeDialog,
	closeNewFileUploadTypeDialog,
	updateFileUploadType
} from './store/fileUploadTypeSlice';
import JwtService from '../../../../../services/jwtService';

import { emailInputLowercase, textInputUppercase } from '../../../../../shared-components/commonFunction';

const defaultValues = {
	en_US: '',
	rus: '',
	Discriptions_en_US: '',
	Discriptions_rus: '',
	OrderBy: ''
};
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	en_US: yup
		.string()
		.trim()
		.required('You must enter a english name')
		.min(3, 'Enter at least 3 characters')
		.matches(/^[a-zA-Z0-9.\s]+$/, 'This field cannot contain special character'),
	// .matches(/^[aA-zZ\s]+$/, 'This field cannot contain numbers and special character')
	// .min(3, 'Enter at least 3 characters'),
	rus: yup.string().trim().required('You must enter a russian name').min(3, 'Enter at least 3 characters'),
	Discriptions_en_US: yup
		.string()
		.trim()
		.required('You must enter a description (Eng)')
		.min(3, 'Enter at least 3 characters')
		.matches(/^[a-zA-Z0-9.\s]+$/, 'This field cannot contain special character'),
	Discriptions_rus: yup
		.string()
		.trim()
		.required('You must enter a description (russian)')
		.min(3, 'Enter at least 3 characters')
	// .matches(/^[a-zA-Z0-9.\s]+$/, 'This field cannot contain special character')
});

function FileUploadTypeDialog(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const [descriptionEng, setDescriptionEng] = useState('');
	const [addressTypeEng, setAddressTypeEng] = useState('');

	const fileUploadTypeDialog = useSelector(({ fileUploadTypeApp }) => fileUploadTypeApp.upTypes.fileUploadTypeDialog);

	const { handleSubmit, formState, reset, control, getValues } = useForm({
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
		if (fileUploadTypeDialog.type === 'edit' && fileUploadTypeDialog.data) {
			reset({ ...fileUploadTypeDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (fileUploadTypeDialog.type === 'new') {
			reset({
				...defaultValues,
				...fileUploadTypeDialog.data
			});
		}
	}, [fileUploadTypeDialog.data, fileUploadTypeDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (fileUploadTypeDialog.props.open) {
			initDialog();
		}

		// for refresh the token
		JwtService.signInWithToken();
	}, [fileUploadTypeDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeDialog() {
		return fileUploadTypeDialog.type === 'edit'
			? dispatch(closeEditFileUploadTypeDialog())
			: dispatch(closeNewFileUploadTypeDialog());
	}

	/**
	 * Form Submit
	 */
	function onSubmit(data) {
		const submitData = {
			codeEng: data?.en_US.toString(),
			codeRus: data?.rus.toString(),
			discriptionsEng: data?.Discriptions_en_US.toString(),
			discriptionsRus: data?.Discriptions_rus.toString(),
			ord: data?.OrderBy
		};

		if (fileUploadTypeDialog.type === 'new') {
			dispatch(addFileUploadType(submitData));
		} else {
			dispatch(updateFileUploadType({ ...fileUploadTypeDialog.data, ...submitData }));
		}
		closeDialog();
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
	const desEngText = findByKey(wordsList, 'DES_ENG_TEXT');
	const desRusText = findByKey(wordsList, 'DES_RUS_TEXT');
	const adtRusText = findByKey(wordsList, 'ADT_ENG_TEXT');
	const adtEngText = findByKey(wordsList, 'ADT_RUS_TEXT');
	const orderText = findByKey(wordsList, 'ORDER_TEXT');

	return (
		<Dialog {...fileUploadTypeDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{fileUploadTypeDialog.type === 'new'
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
							<Grid item xs={12} sx={{ marginTop: '12px' }}>
								<Controller
									name="Discriptions_en_US"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? desEngText?.en_US
													: currentLanguageId === 'rus'
													? desEngText?.rus
													: 'Description (Eng)'
											}
											error={!!errors.Discriptions_en_US}
											helperText={errors?.Discriptions_en_US?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
											onChange={e => {
												textInputUppercase(e, setDescriptionEng);
											}}
											value={descriptionEng}
										/>
									)}
								/>
							</Grid>

							<Grid item xs={12} sx={{ marginTop: '12px' }}>
								<Controller
									name="Discriptions_rus"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? desRusText?.en_US
													: currentLanguageId === 'rus'
													? desRusText?.rus
													: 'Description (Russian)'
											}
											error={!!errors.Discriptions_rus}
											helperText={errors?.Discriptions_rus?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
										/>
									)}
								/>
							</Grid>

							<Grid item xs={12} sx={{ marginTop: '12px' }}>
								<Controller
									name="en_US"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? adtEngText?.en_US
													: currentLanguageId === 'rus'
													? adtEngText?.rus
													: 'File Upload Type (Eng)'
											}
											error={!!errors.en_US}
											helperText={errors?.en_US?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
											onChange={e => {
												textInputUppercase(e, setAddressTypeEng);
											}}
											value={addressTypeEng}

											// inputProps={{ style: { textTransform: 'uppercase' } }}
										/>
									)}
								/>
							</Grid>

							<Grid item xs={12} sx={{ marginTop: '12px' }}>
								<Controller
									name="rus"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? adtRusText?.en_US
													: currentLanguageId === 'rus'
													? adtRusText?.rus
													: 'File Upload Type (Russian)'
											}
											error={!!errors.rus}
											helperText={errors?.rus?.message}
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
									name="OrderBy"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? orderText?.en_US
													: currentLanguageId === 'rus'
													? orderText?.rus
													: 'Order'
											}
											error={!!errors.OrderBy}
											helperText={errors?.OrderBy?.message}
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

				{fileUploadTypeDialog.type === 'new' ? (
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
								{currentLanguageId === 'en' && closeBtn !== undefined
									? closeBtn?.en_US
									: currentLanguageId === 'rus' && closeBtn !== undefined
									? closeBtn?.rus
									: t('CLOSE')}
							</Button>
						</div>

						<Button
							type="submit"
							variant="contained"
							color="secondary"
							disabled={_.isEmpty(dirtyFields) || !isValid}
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

export default FileUploadTypeDialog;
