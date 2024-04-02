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
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import {
	addContainerType,
	closeNewContainerTypeDialog,
	closeEditContainerTypeDialog,
	updateContainerType
} from './store/ContactTypesSlice';
import JwtService from '../../../../../services/jwtService';

import { emailInputLowercase, textInputUppercase } from '../../../../../shared-components/commonFunction';

const defaultValues = {
	en_US: '',
	rus: ''
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
	rus: yup.string().trim().required('You must enter a russian name').min(3, 'Enter at least 3 characters')
});

function ContactTypeDialog(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const containerTypeDialog = useSelector(({ contactTypeApp }) => contactTypeApp.contactTypes.containerTypeDialog);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const { handleSubmit, formState, reset, control } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const [contactTypeEng, setContactTypeEng] = useState('');

	const { errors } = formState;

	/**
	 * Initialize Dialog with Data
	 */
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (containerTypeDialog.type === 'edit' && containerTypeDialog.data) {
			reset({ ...containerTypeDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (containerTypeDialog.type === 'new') {
			reset({
				...defaultValues,
				...containerTypeDialog.data
			});
		}
	}, [containerTypeDialog.data, containerTypeDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (containerTypeDialog.props.open) {
			initDialog();
		}
		// for refresh the token
		JwtService.signInWithToken();
	}, [containerTypeDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeDialog() {
		return containerTypeDialog.type === 'edit'
			? dispatch(closeEditContainerTypeDialog())
			: dispatch(closeNewContainerTypeDialog());
	}

	/**
	 * Form Submit
	 */
	function onSubmit(data) {
		const submitData = {
			typeEng: data?.en_US,
			typeRus: data?.rus
		};
		if (containerTypeDialog.type === 'new') {
			dispatch(addContainerType(submitData));
		} else {
			dispatch(updateContainerType({ ...containerTypeDialog.data, ...submitData }));
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
	const ctEngText = findByKey(wordsList, 'ENG_TEXT');
	const ctRusText = findByKey(wordsList, 'RUS_TEXT');
	return (
		<Dialog {...containerTypeDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{containerTypeDialog.type === 'new'
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
									name="en_US"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? ctEngText?.en_US
													: currentLanguageId === 'rus'
													? ctEngText?.rus
													: 'Contact Type English'
											}
											error={!!errors.en_US}
											helperText={errors?.en_US?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
											value={contactTypeEng}
											onChange={e => {
												textInputUppercase(e, setContactTypeEng);
											}}
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
													? ctRusText?.en_US
													: currentLanguageId === 'rus'
													? ctRusText?.rus
													: 'Contact Type Rus'
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

				{containerTypeDialog.type === 'new' ? (
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

export default ContactTypeDialog;
