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
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { removeCurrencyType } from './store/currencyTypeSlice';

const defaultValues = {
	reason: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	reason: yup.string().trim().required('You must enter a reason for delete').min(3, 'Enter at least 3 characters')
	// .matches(/^[0-9a-z.\s]+$/, 'This field cannot contain special character')
});

function DeleteReasonDialog(props) {
	const { openDeleteReasonDialog, selectedIds, setOpenDeleteReasonDialog } = props;

	const { t } = useTranslation();
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	// const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const { handleSubmit, formState, control, setValue } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { errors, isValid, dirtyFields } = formState;

	/**
	 * Close Dialog
	 */
	const handleClose = () => {
		setOpenDeleteReasonDialog(false);
		setValue('reason', '');
	};

	/**
	 * Form Submit
	 */
	function onSubmit(data) {
		if (data?.reason === '...' || data?.reason === '') {
			toast.error('Pls give valid reason', {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 4000
			});
		} else {
			const submitData = {
				reason: data?.reason,
				ids: selectedIds
			};
			if (openDeleteReasonDialog === true) {
				dispatch(removeCurrencyType(submitData));
			}
		}
		handleClose();
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
	const deleteTitle = findByKey(commonTranslateWordsArray, 'DELETE_TITLE');
	const deleteText = findByKey(commonTranslateWordsArray, 'DELETE_TEXT');
	const deleteBtn = findByKey(commonTranslateWordsArray, 'DELETE_BTN');
	const closeBtn = findByKey(commonTranslateWordsArray, 'CLOSE_BTN');

	return (
		<Dialog open={openDeleteReasonDialog} fullWidth maxWidth="sm" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{currentLanguageId === 'en'
							? deleteTitle?.en_US
							: currentLanguageId === 'rus'
							? deleteTitle?.rus
							: t('DELETE_REASON')}
					</Typography>
				</Toolbar>
			</AppBar>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent classes={{ root: 'p-0' }}>
					<div className="px-16 sm:px-24">
						<Grid container>
							<Grid item xs={12} sx={{ marginTop: '12px' }}>
								<Controller
									name="reason"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label={
												currentLanguageId === 'en'
													? deleteText?.en_US
													: currentLanguageId === 'rus'
													? deleteText?.rus
													: t('REASON_TO_DELETE_INPUT_LABEL')
											}
											autoFocus
											error={!!errors.reason}
											helperText={errors?.reason?.message}
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

				<DialogActions className="justify-between px-8 py-16">
					<DialogActions className="justify-between px-8 py-16">
						<div className="px-16">
							<Button type="button" variant="contained" onClick={handleClose}>
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
								? deleteBtn?.en_US
								: currentLanguageId === 'rus'
									? deleteBtn?.rus
									: t('DELETE')}
						</Button>
					</DialogActions>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default DeleteReasonDialog;
