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
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { addLanguage, closeEditLanguageDialog, closeNewLanguageDialog, updateLanguage } from './store/languageSlice';
import JwtService from "../../../../../services/jwtService";

const defaultValues = {
	discriptions: '',
	parentID: 0,
	en_US: '',
	rus: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	discriptions: yup.string().trim().required('You must enter a discriptions').min(3, 'Enter at least 3 characters'),
	parentID: yup.number().required('parentID is required'),
	en_US: yup.string().trim().required('You must enter a english name').min(3, 'Enter at least 3 characters'),
	rus: yup.string().trim().required('You must enter a russian name').min(3, 'Enter at least 3 characters')
});

function LanguageDialog(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const langDialog = useSelector(({ languageTranslatorApp }) => languageTranslatorApp.languages.languageDialog);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

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
		if (langDialog.type === 'edit' && langDialog.data) {
			reset({ ...langDialog.data, ...langDialog.selectedId });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (langDialog.type === 'new') {
			reset({
				...defaultValues,
				...langDialog.data,
				...langDialog.selectedId
			});
		}
	}, [langDialog.data, langDialog.type, langDialog.selectedId, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (langDialog.props.open) {
			initDialog();
		}
		//for refresh the token
		JwtService.signInWithToken();
	}, [langDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeDialog() {
		return langDialog.type === 'edit' ? dispatch(closeEditLanguageDialog()) : dispatch(closeNewLanguageDialog());
	}

	/**
	 * Form Submit
	 */
	function onSubmit(data) {
		const submitData = {
			discriptions: data?.discriptions,
			parentID: langDialog?.selectedId ? Number(langDialog?.selectedId) : 0,
			english: data?.en_US,
			russian: data?.rus
		};
		if (langDialog.type === 'new') {
			dispatch(addLanguage(submitData));
		} else {
			dispatch(updateLanguage({ ...langDialog.data, ...submitData }));
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
	const descriptionText = findByKey(wordsList, 'DES_TITLE');
	const engText = findByKey(wordsList, 'ENG_TEXT');
	const rusText = findByKey(wordsList, 'RUS_TEXT');

	return (
		<Dialog {...langDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{langDialog.type === 'new'
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
									name="discriptions"
									control={control}
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
											error={!!errors.discriptions}
											helperText={errors?.discriptions?.message}
											variant="outlined"
											required
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
													? engText?.en_US
													: currentLanguageId === 'rus'
													? engText?.rus
													: 'Name English'
											}
											error={!!errors.en_US}
											helperText={errors?.en_US?.message}
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
									name="rus"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? rusText?.en_US
													: currentLanguageId === 'rus'
													? rusText?.rus
													: 'Name Russian'
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
						</Grid>
					</div>
				</DialogContent>

				{langDialog.type === 'new' ? (
					<DialogActions className="justify-between px-8 py-16">
						<div className="px-16">
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
						</div>
						<Button type="button" variant="contained" onClick={closeDialog}>
							{currentLanguageId === 'en'
								? closeBtn?.en_US
								: currentLanguageId === 'rus'
								? closeBtn?.rus
								: t('CLOSE')}
						</Button>
					</DialogActions>
				) : (
					<DialogActions className="justify-between px-8 py-16">
						<div className="px-16">
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
						</div>
						<Button type="button" variant="contained" onClick={closeDialog}>
							{currentLanguageId === 'en'
								? closeBtn?.en_US
								: currentLanguageId === 'rus'
								? closeBtn?.rus
								: t('CLOSE')}
						</Button>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default LanguageDialog;
