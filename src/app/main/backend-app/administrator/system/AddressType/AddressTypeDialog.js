/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { emailInputLowercase, textInputUppercase } from '../../../../../shared-components/commonFunction';

import {
	addAddressType,
	closeEditAddressTypeDialog,
	closeNewAddressTypeDialog,
	updateAddressType
} from './store/addressTypeSlice';
import JwtService from '../../../../../services/jwtService';

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

function AddressTypeDialog(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const addressTypeDialog = useSelector(({ addressTypeApp }) => addressTypeApp.adTypes.addressTypeDialog);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const [addressTypeEng, setAddressTypeEng] = useState('');

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
		if (addressTypeDialog.type === 'edit' && addressTypeDialog.data) {
			reset({ ...addressTypeDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (addressTypeDialog.type === 'new') {
			reset({
				...defaultValues,
				...addressTypeDialog.data
			});
		}
	}, [addressTypeDialog.data, addressTypeDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (addressTypeDialog.props.open) {
			initDialog();
		}
		// for refresh the token
		JwtService.signInWithToken();
	}, [addressTypeDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeDialog() {
		return addressTypeDialog.type === 'edit'
			? dispatch(closeEditAddressTypeDialog())
			: dispatch(closeNewAddressTypeDialog());
	}

	/**
	 * Form Submit
	 */
	function onSubmit(data) {
		const submitData = {
			typeEng: data?.en_US.toString(),
			typeRus: data?.rus.toString()
		};
		if (addressTypeDialog.type === 'new') {
			dispatch(addAddressType(submitData));
		} else {
			dispatch(updateAddressType({ ...addressTypeDialog.data, ...submitData }));
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
	const adtEngText = findByKey(wordsList, 'ENG_TEXT');
	const adtRusText = findByKey(wordsList, 'RUS_TEXT');
	return (
		<Dialog {...addressTypeDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{addressTypeDialog.type === 'new'
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
													? adtEngText?.en_US
													: currentLanguageId === 'rus'
													? adtEngText?.rus
													: 'Address Type (Eng)'
											}
											error={!!errors.en_US}
											helperText={errors?.en_US?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
											value={addressTypeEng}
											onChange={e => {
												textInputUppercase(e, setAddressTypeEng);
											}}
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
													: 'Address Type (Russian)'
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

				{addressTypeDialog.type === 'new' ? (
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

export default AddressTypeDialog;
