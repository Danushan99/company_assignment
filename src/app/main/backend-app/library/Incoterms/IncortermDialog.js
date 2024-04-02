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
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import incortermslibrary, {
	addIntercomes,
	closeEditIntercomeDialog,
	closeNewIntercomeDialog,
	updateIncorterm
} from './store/IncotermSlice';

const defaultValues = {
	Code: '',
	en_US: '',
	rus: ''
};
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	Code: yup.string().trim().required('You must enter a code').min(2, 'Enter at least 3 characters'),
	en_US: yup.string().trim().required('You must enter a description (Eng)').min(3, 'Enter at least 3 characters'),
	rus: yup.string().trim().required('You must enter a description (russian)').min(3, 'Enter at least 3 characters')
});

function IncortermDialog(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const intercomeDialog = useSelector(
		({ IncortermApplibrary }) => IncortermApplibrary.incortermslibrary.intercomDialog
	);

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
		if (intercomeDialog.type === 'edit' && intercomeDialog.data) {
			reset({ ...intercomeDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (intercomeDialog.type === 'new') {
			reset({
				...defaultValues,
				...intercomeDialog.data
			});
		}
	}, [intercomeDialog.data, intercomeDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (intercomeDialog.props.open) {
			initDialog();
		}
	}, [intercomeDialog.props.open, initDialog]);

	/**
	 * Close Dialog
	 */
	function closeDialog() {
		return intercomeDialog.type === 'edit'
			? dispatch(closeEditIntercomeDialog())
			: dispatch(closeNewIntercomeDialog());
	}

	/**
	 * Form Submit
	 */

	function onSubmit(data) {
		const submitData = {
			code: data?.Code,
			nameEng: data?.en_US?.toString(),
			nameRus: data?.rus?.toString()
		};

		if (intercomeDialog.type === 'new') {
			dispatch(addIntercomes(submitData));
		} else {
			dispatch(updateIncorterm({ formdata: submitData, id: data?.IncoTermID }));
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

	const DES_ENG_TITLE = findByKey(wordsList, 'DES_ENG_TITLE');
	const DES_RUS_TITLE = findByKey(wordsList, 'DES_RUS_TITLE');
	const CODE_TITLE = findByKey(wordsList, 'CODE_TITLE');

	return (
		<Dialog {...intercomeDialog.props} onClose={closeDialog} fullWidth maxWidth="sm" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{intercomeDialog.type === 'new'
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
									name="Code"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? CODE_TITLE?.en_US
													: currentLanguageId === 'rus'
													? CODE_TITLE?.rus
													: 'Code '
											}
											error={!!errors.Code}
											helperText={errors?.Code?.message}
											required
											variant="outlined"
											size="small"
											fullWidth
											// inputProps={{ style: { textTransform: 'uppercase' } }}
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
													? DES_ENG_TITLE?.en_US
													: currentLanguageId === 'rus'
													? DES_ENG_TITLE?.rus
													: 'Description (Eng)'
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
													? DES_RUS_TITLE?.en_US
													: currentLanguageId === 'rus'
													? DES_RUS_TITLE?.rus
													: 'Description (Russian)'
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

				{intercomeDialog.type === 'new' ? (
					<DialogActions className="justify-between px-8 py-16">
						<Button type="button" variant="contained" onClick={closeDialog}>
							{currentLanguageId === 'en'
								? closeBtn?.en_US
								: currentLanguageId === 'rus'
								? closeBtn?.rus
								: t('CLOSE')}
						</Button>
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
					</DialogActions>
				) : (
					<DialogActions className="justify-between px-8 py-16">
						<Button type="button" variant="contained" onClick={closeDialog}>
							{currentLanguageId === 'en' && closeBtn !== undefined
								? closeBtn?.en_US
								: currentLanguageId === 'rus' && closeBtn !== undefined
								? closeBtn?.rus
								: t('CLOSE')}
						</Button>
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
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default IncortermDialog;
