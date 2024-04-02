/* eslint-disable import/no-extraneous-dependencies */
import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Checkbox from '@mui/material/Checkbox';
import { getCommonAdressTypes } from '../store/commonAdressTypeSlice';
// import IImageWithZoomDialog from './IImageWithZoomDialog';
import DeleteReasonDialog from '../DeleteReasonDialog';

function ViewContactAddress(props) {
	const dispatch = useDispatch();

	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const viewContactDetail = useSelector(({ addressBookApp }) => addressBookApp.contact);

	const [cAddress, setAddress] = useState([]);
	const [selected, setSelected] = useState(null);
	const [selectedKey, setSelectedKey] = useState('');
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);
	// const [openZoomDialog, setOpenZoomDialog] = useState(false);
	// const [selectedZoomImage, setSelectedZoomImage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			dispatch(getCommonAdressTypes()).then(res => {
				setAddress(res?.payload?.data);
			});
		};
		fetchData();
	}, [dispatch]);

	/**
	 * Zoom image
	 */
	// const hanldeOpenZoomImage = imgUrl => {
	// 	setSelectedZoomImage(imgUrl);
	// 	setOpenZoomDialog(true);
	// };

	// const handleCloseZoomImage = () => {
	// 	setSelectedZoomImage('');
	// 	setOpenZoomDialog(false);
	// };

	/**
	 *  Open delete confimation Dialog
	 */
	const handleClickDeleteConfirmationOpen = (data, ID) => {
		setOpenDeleteReasonDialog(true);
		setSelected(ID);
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
	const addressTab = findByKey(wordsList, 'CON_ADDRESS_TAB');
	const address1Text = findByKey(wordsList, 'ADDRESS1_TEXT');
	const address2Text = findByKey(wordsList, 'ADDRESS2_TEXT');
	const address3Text = findByKey(wordsList, 'ADDRESS3_TEXT');
	const address4Text = findByKey(wordsList, 'ADDRESS4_TEXT');
	const attachmentText = findByKey(wordsList, 'ATTACHMENT_TEXT');
	return (
		<>
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				{viewContactDetail?.contactAddress &&
					viewContactDetail.contactAddress.length > 0 &&
					viewContactDetail?.contactAddress.map((itemV, index) => (
						<Grid item xs={viewContactDetail?.contactAddress.length === 1 ? 12 : 6} key={index}>
							<Card sx={{ minWidth: '100%' }} className="mb-24" key={itemV?.id}>
								<CardContent>
									<div className="flex">
										{itemV?.key !== '' && (
											<IconButton
												aria-label="delete"
												onClick={event => {
													handleClickDeleteConfirmationOpen(itemV, viewContactDetail?.id);
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
											cAddress.map(
												(
													val,
													index1 // Swap the positions of val and index
												) => (
													<Grid
														item
														xs={viewContactDetail?.contactAddress.length === 1 ? 3 : 4}
														key={index1}
													>
														<div>
															<Checkbox
																readOnly
																checked={
																	viewContactDetail?.contactAddress &&
																	viewContactDetail?.contactAddress[
																		index
																	]?.addressTypes?.some(
																		item =>
																			Number(item?.type) === val?.AddressTypeID
																	)
																}
															/>
															<span
																style={{
																	fontSize: '1.3rem',
																	fontWeight: 400
																}}
															>
																{currentLanguageId === 'en'
																	? val?.en_US
																	: currentLanguageId === 'rus'
																	? val?.rus
																	: val?.en_US}
															</span>
														</div>
													</Grid>
												)
											)}
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
													<TextField
														value={itemV?.address1}
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
														InputProps={{
															readOnly: true
														}}
													/>
												</Grid>
												<Grid item xs={12} sm={12} md={12}>
													<TextField
														value={itemV?.address2}
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
														InputProps={{
															readOnly: true
														}}
													/>
												</Grid>
												<Grid item xs={12} sm={12} md={12}>
													<TextField
														value={itemV?.address3}
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
														InputProps={{
															readOnly: true
														}}
													/>
												</Grid>
												<Grid item xs={12} sm={12} md={12}>
													<TextField
														value={itemV?.address4}
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
														InputProps={{
															readOnly: true
														}}
													/>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12} sm={6} md={6} />
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					))}

				{/* <IImageWithZoomDialog
					openZoomDialog={openZoomDialog}
					handleCloseZoomImage={handleCloseZoomImage}
					imageUrl={selectedZoomImage}
				/> */}

				<DeleteReasonDialog
					selectedIds={selected}
					openDeleteReasonDialog={openDeleteReasonDialog}
					setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
					deleteSection="contactAddress"
					selectedKey={selectedKey}
				/>
			</Grid>
		</>
	);
}

export default ViewContactAddress;
