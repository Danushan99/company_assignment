/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { InputLabel, Checkbox } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getCommonAdressTypes } from '../store/commonAdressTypeSlice';
import JwtService from "../../../../../services/jwtService";

function ContactAdress(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const methods = useFormContext();
	const { control, formState, register } = methods;
	const { errors } = formState;

	const [cAddress, setAddress] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(getCommonAdressTypes()).then(res => {
				setAddress(res?.payload?.data);
			});
		};
		fetchData();
	}, [dispatch]);

	const {
		fields: addressFields,
		append: appendAddress,
		remove: removeAddress
	} = useFieldArray({
		control,
		name: 'contactaddressItems'
	});

	useEffect(()=>{
		//for refresh the token
		JwtService.signInWithToken();
	},[addressFields])

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
	const addressTab = findByKey(wordsList, 'CON_ADDRESS_TAB');
	const address1Text = findByKey(wordsList, 'ADDRESS1_TEXT');
	const address2Text = findByKey(wordsList, 'ADDRESS2_TEXT');
	const address3Text = findByKey(wordsList, 'ADDRESS3_TEXT');
	const address4Text = findByKey(wordsList, 'ADDRESS4_TEXT');
	const address5Text = findByKey(wordsList, 'ADDRESS5_TEXT');
	const address6Text = findByKey(wordsList, 'ADDRESS6_TEXT');
	const attachmentText = findByKey(wordsList, 'ATTACHMENT_TEXT');

	return (
		<>
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{addressFields.map((itemV, index) => (
					<Grid item xs={addressFields.length === 1 ? 12 : 6} key={index}>
						<Card sx={{ minWidth: '100%' }} className="mb-24" key={itemV?.id}>
							<CardContent>
								<div className="flex">
									{index === 0 && (
										<IconButton
											aria-label="add"
											onClick={() =>
												appendAddress({
													contid: '',
													addresstype: '',
													addrs1: '',
													addrs2: '',
													addrs3: '',
													addrs4: '',
													addrs5: '',
													addrs6: '',
													avatar: null
												})
											}
										>
											<AddCircleOutlineIcon />
										</IconButton>
									)}

									{index > 0 && (
										<IconButton aria-label="delete" onClick={() => removeAddress(index)}>
											<DeleteOutlineOutlinedIcon />
										</IconButton>
									)}
									<Typography sx={{ fontSize: 14, marginTop: 1 }} color="text.secondary" gutterBottom>
										{currentLanguageId === 'en'
											? addressTab?.en_US
											: currentLanguageId === 'rus'
											? addressTab?.rus
											: 'Contact Address'}{' '}
										- ({index + 1})
									</Typography>
								</div>

								<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
									{cAddress &&
										cAddress.length > 0 &&
										cAddress.map((val, index1) => (
											<Grid item xs={addressFields.length === 1 ? 3 : 4} key={index1}>
												<Controller
													key={val?.AddressTypeID}
													name={`contactaddressItems.${index}.addresstype`}
													control={control}
													defaultValue={[]}
													rules={{ required: true }}
													render={({ field }) => (
														<>
															{field && ( // Check if field is available
																<>
																	<Checkbox
																		{...field}
																		checked={field.value.includes(
																			val?.AddressTypeID
																		)}
																		onChange={e => {
																			if (e.target.checked) {
																				field.onChange([
																					...field.value,
																					val?.AddressTypeID
																				]);
																			} else {
																				const updatedValue = field.value.filter(
																					id => id !== val?.AddressTypeID
																				);
																				field.onChange(updatedValue);
																			}
																		}}
																	/>
																	<span
																		style={{ fontSize: '1.3rem', fontWeight: 400 }}
																	>
																		{currentLanguageId === 'en'
																			? val?.en_US
																			: currentLanguageId === 'rus'
																			? val?.rus
																			: val?.en_US}
																	</span>
																</>
															)}
														</>
													)}
												/>
											</Grid>
										))}
								</Grid>

								<Grid
									container
									rowSpacing={1}
									columnSpacing={{ xs: 1, sm: 2, md: 3 }}
									sx={{ margin: '20px' }}
								>
									<Grid item xs={12} sm={6} md={6}>
										<Grid container>
											<Grid item xs={12} sm={12} md={12}>
												<Controller
													control={control}
													name={`contactaddressItems.${index}.addrs1`}
													render={({ field }) => (
														<TextField
															{...field}
															label={
																currentLanguageId === 'en'
																	? address1Text?.en_US
																	: currentLanguageId === 'rus'
																	? address1Text?.rus
																	: 'Address 1'
															}
															className="mb-24"
															size="small"
															id={`contactaddressItems.${index}.addrs1`}
															variant="outlined"
															fullWidth
														/>
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={12}>
												<Controller
													control={control}
													name={`contactaddressItems.${index}.addrs2`}
													render={({ field }) => (
														<TextField
															{...field}
															label={
																currentLanguageId === 'en'
																	? address2Text?.en_US
																	: currentLanguageId === 'rus'
																	? address2Text?.rus
																	: 'Address 2'
															}
															className="mb-24"
															size="small"
															id={`contactaddressItems.${index}.addrs2`}
															variant="outlined"
															fullWidth
														/>
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={12}>
												<Controller
													control={control}
													name={`contactaddressItems.${index}.addrs3`}
													render={({ field }) => (
														<TextField
															{...field}
															label={
																currentLanguageId === 'en'
																	? address3Text?.en_US
																	: currentLanguageId === 'rus'
																	? address3Text?.rus
																	: 'Address 3'
															}
															className="mb-24"
															size="small"
															id={`contactaddressItems.${index}.addrs3`}
															variant="outlined"
															fullWidth
														/>
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={12}>
												<Controller
													control={control}
													name={`contactaddressItems.${index}.addrs4`}
													render={({ field }) => (
														<TextField
															{...field}
															label={
																currentLanguageId === 'en'
																	? address4Text?.en_US
																	: currentLanguageId === 'rus'
																	? address4Text?.rus
																	: 'Address 4'
															}
															className="mb-24"
															size="small"
															id={`contactaddressItems.${index}.addrs4`}
															variant="outlined"
															fullWidth
														/>
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={12}>
												<Controller
													control={control}
													name={`contactaddressItems.${index}.addrs5`}
													render={({ field }) => (
														<TextField
															{...field}
															label={
																currentLanguageId === 'en'
																	? address5Text?.en_US
																	: currentLanguageId === 'rus'
																	? address5Text?.rus
																	: 'Address 5'
															}
															className="mb-24"
															size="small"
															id={`contactaddressItems.${index}.addrs5`}
															variant="outlined"
															fullWidth
														/>
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={12}>
												<Controller
													control={control}
													name={`contactaddressItems.${index}.addrs6`}
													render={({ field }) => (
														<TextField
															{...field}
															label={
																currentLanguageId === 'en'
																	? address6Text?.en_US
																	: currentLanguageId === 'rus'
																	? address6Text?.rus
																	: 'Address 6'
															}
															className="mb-24"
															size="small"
															id={`contactaddressItems.${index}.addrs6`}
															variant="outlined"
															fullWidth
														/>
													)}
												/>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={12} sm={6} md={6}>
										<div className="flex">
											<InputLabel htmlFor="file-upload" style={{ marginTop: '10px' }}>
												{currentLanguageId === 'en'
													? attachmentText?.en_US
													: currentLanguageId === 'rus'
													? attachmentText?.rus
													: 'Attachment'}
											</InputLabel>{' '}
											<br />
											<input
												type="file"
												id={`contactaddressItems.${index}.avatar`}
												{...register(`contactaddressItems.${index}.avatar`)}
												style={{ marginLeft: '10px', marginTop: '10px' }}
											/>
										</div>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default ContactAdress;
