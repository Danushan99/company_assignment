/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/lab';
// import clsx from 'clsx';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useFormContext, Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import {selectUser} from '../../../../../../../app/auth/store/logedUserSlice'
import Icon from '@mui/material/Icon';
import { element } from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import { render } from 'react-dom';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from '@mui/base';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { selectJobtitles } from '../../../store/systemJobtitleSlice';
import { selectCompanies } from '../../../store/systemCompanySlice';
import { getUser } from '../../../store/systemUserSlice';
import JwtService from '../../../../../../services/jwtService';
import { selectUsers } from '../../../store/userslice';

import { emailInputLowercase, textInputUppercase } from '../../../../../../shared-components/commonFunction';

// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
});

function BasicInfoTab(props) {
	// const { selectedImage, setSelectedImage } = props
	const [email, setEmail] = useState('');
	const [fristName, setFristName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [presentAddress, setPresentAddress] = useState('');
	const [userName, setUserName] = useState('');
	const [fullName, setFullName] = useState('');

	const [selectedImage, setSelectedImage] = useState(null);
	const methods = useFormContext();
	const { control, formState, getValues } = methods;
	const { errors } = formState;

	const jobtitle = useSelector(selectJobtitles);
	const mtOffices = useSelector(selectCompanies);

	const officeList = [];
	mtOffices.forEach(element => {
		officeList.push({ label: element?.CompanyName, value: element?.CompanyID });
	});

	const jobList = [];
	jobtitle.forEach(element => {
		jobList.push({ label: element?.en_US, value: element?.en_US });
	});

	const handleImageChange = event => {
		const file = event.target.files[0];

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage(imageUrl);
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={8}>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<FormControl fullWidth size="small" className="mt-4 mb-8">
							<InputLabel id="demo-simple-select-label">Company Name</InputLabel>
							<Controller
								control={control}
								name="companyId"
								render={({ field }) => (
									<Select
										{...field}
										labelId={'CompanyName'}
										id="companyId"
										label={'Company Name'}
										className="mt-4 mb-8"
									>
										{mtOffices?.map(item => (
											<MenuItem
												key={item?.CompanyID}
												value={item?.CompanyName}
											>{`${item?.CompanyName}`}</MenuItem>
										))}
									</Select>
								)}
							/>
						</FormControl>
						<Controller
							name="dob"
							id="dob"
							control={control}
							render={({ field: { onChange, value } }) => (
								<DatePicker
									label="Date Of Birth"
									// mask="__.__.____"
									inputFormat="yyyy/MM/dd"
									value={value}
									onChange={onChange}
									required
									renderInput={params => (
										<TextField
											{...params}
											className="mt-4 mb-8"
											error={!!errors.DateOfBooking}
											helperText={errors?.DateOfBooking?.message}
											variant="outlined"
											size="small"
											fullWidth
										/>
									)}
								/>
							)}
						/>
						<Controller
							name="prsAddress"
							id="prsAddress"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-11 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Present Address"
									// autoFocus
									id="presentaddress"
									variant="outlined"
									size="small"
									fullWidth
									onChange={e => {
										textInputUppercase(e, setPresentAddress);
									}}
									value={presentAddress}
								/>
							)}
						/>
						<Controller
							name="email"
							id="email"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-8 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Email"
									// autoFocus
									id="email"
									variant="outlined"
									size="small"
									fullWidth
									onChange={e => {
										emailInputLowercase(e, setEmail);
									}}
									value={email}
								/>
							)}
						/>

						<Controller
							name="drivLicenNo"
							id="drivLicenNo"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-4 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Driving License Number"
									// autoFocus
									id="Drivinglicense"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							name="fname"
							id="fname"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-8 mb-2"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="First Name"
									// autoFocus
									id="lastName"
									variant="outlined"
									size="small"
									value={fristName}
									onChange={e => textInputUppercase(e, setFristName)}
									fullWidth
								/>
							)}
						/>
						<FormControl fullWidth size="small" className="mt-20 mb-12">
							<InputLabel id="demo-simple-select-label">Gender</InputLabel>
							<Controller
								control={control}
								name="gender"
								render={({ field }) => (
									<Select
										{...field}
										labelId={'Gender'}
										id="Gender"
										label={'Gender'}
										//className="mt-4 mb-8"
									>
										{/*{mtOffices?.map(item => (*/}
										{/*	<MenuItem*/}
										{/*		key={item?.CompanyID}*/}
										{/*		value={item?.CompanyName}*/}
										{/*	>{`${item?.CompanyName}`}</MenuItem>*/}
										{/*))}*/}
									</Select>
								)}
							/>
						</FormControl>

						<Controller
							name="telephoneno"
							id="telephoneno"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-4 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Telephone No"
									// autoFocus
									id="telephoneno"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>

						<FormControl fullWidth size="small" className="mt-8 mb-8">
							<InputLabel id="demo-simple-select-label">Marital Status</InputLabel>
							<Controller
								control={control}
								name="mariStatus"
								render={({ field }) => (
									<Select
										{...field}
										labelId={'mariStatus'}
										id="mariStatus"
										label={'Marital Status'}
										//	className="mt-4 mb-8"
									>
										{/*{mtOffices?.map(item => (*/}
										{/*	<MenuItem*/}
										{/*		key={item?.CompanyID}*/}
										{/*		value={item?.CompanyName}*/}
										{/*	>{`${item?.CompanyName}`}</MenuItem>*/}
										{/*))}*/}
									</Select>
								)}
							/>
						</FormControl>

						<Controller
							name="uname"
							id="uname"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-4 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="User Name"
									// autoFocus
									id="maritalstatus"
									variant="outlined"
									size="small"
									fullWidth
									onChange={e => textInputUppercase(e, setUserName)}
									value={userName}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							name="mname"
							id="mname"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-8 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Middle Name"
									// autoFocus
									id="midleName"
									value={middleName}
									onChange={e => textInputUppercase(e, setMiddleName)}
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>
						<Controller
							name="placeofbirth"
							id="placeofbirth"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-12 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Place of Birth"
									// autoFocus
									id="placeofbirth"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>
						<Controller
							name="mobiNo"
							id="mobiNo"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-11 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Mobile No"
									// autoFocus
									id="mobileno"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>

						<Controller
							name="nicNo"
							id="nicNo"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-7 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="NIC No"
									// autoFocus
									id="telephoneno"
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>

						<Controller
							name="pws"
							id="pws"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-4 mb-8"
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Password"
									// autoFocus
									id="password"
									variant="outlined"
									type="password"
									size="small"
									fullWidth
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							name="lname"
							id="lname"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-8 mb-8"
									error={!!errors.LastName}
									value={lastName}
									required
									helperText={errors?.LastName?.message}
									label="Last Name"
									// autoFocus
									id="lastName"
									onChange={e => textInputUppercase(e, setLastName)}
									variant="outlined"
									size="small"
									fullWidth
								/>
							)}
						/>

						<FormControl fullWidth size="small" className="mt-10 mb-8">
							<InputLabel id="demo-simple-select-label">Nationality</InputLabel>
							<Controller
								control={control}
								name="Nationality"
								render={({ field }) => (
									<Select
										{...field}
										labelId={'Nationality'}
										id="Nationality"
										label={'Nationality'}
										//	className="mt-4 mb-8"
									>
										{/*{mtOffices?.map(item => (*/}
										{/*	<MenuItem*/}
										{/*		key={item?.CompanyID}*/}
										{/*		value={item?.CompanyName}*/}
										{/*	>{`${item?.CompanyName}`}</MenuItem>*/}
										{/*))}*/}
									</Select>
								)}
							/>
						</FormControl>

						<Controller
							name="comment"
							id="comment"
							control={control}
							render={({ field }) => (
								<TextareaAutosize
									id="outlined-multiline-static"
									// label="Comment"
									placeholder="Have you ever been convinced for a criminal offense in courts?If so Details"
									// value={Comment}
									// multiline
									maxRows={4}
									// defaultValue="Default Value"
									// size="large"
									// fullWidth
									style={{ borderWidth: 4, width: '175px', height: 78, marginTop: '10px' }}
								/>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={4}>
				<Avatar alt="Remy Sharp" src={selectedImage} sx={{ width: 80, height: 80, marginLeft: 18 }} />
				<Button
					component="label"
					variant="contained"
					startIcon={<CloudUploadIcon />}
					style={{ marginLeft: '117px', marginTop: '10px' }}
				>
					Profile Image
					<VisuallyHiddenInput type="file" onChange={handleImageChange} />
				</Button>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<div className="flex">
						<p style={{ marginLeft: '18px', marginTop: '10px' }}>Details of Immediate Family Members</p>
						<IconButton aria-label="delete">
							<AddCircleOutlineOutlinedIcon />
						</IconButton>
					</div>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<Controller
								name="fullname"
								id="fullname"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										style={{ marginLeft: '16px', marginTop: '20px' }}
										error={!!errors.LastName}
										required
										helperText={errors?.LastName?.message}
										label="Full Name"
										// autoFocus
										id="email"
										variant="outlined"
										size="small"
										fullWidth
										value={fullName}
										onChange={e => {
											textInputUppercase(e, setFullName);
										}}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={3}>
							<FormControl
								fullWidth
								size="small"
								className="mt-4 mb-8"
								style={{ marginLeft: '14px', marginTop: '20px' }}
							>
								<InputLabel id="demo-simple-select-label">Relationship</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									// value={age}
									label="Company Name"
									// onChange={handleChange}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={3}>
							<Controller
								name="dob"
								id="dob"
								control={control}
								render={({ field: { onChange, value } }) => (
									<DatePicker
										label="Date Of Birth"
										// mask="__.__.____"
										inputFormat="yyyy/MM/dd"
										value={value}
										onChange={onChange}
										required
										renderInput={params => (
											<TextField
												{...params}
												className="mt-4 mb-8"
												error={!!errors.DateOfBooking}
												helperText={errors?.DateOfBooking?.message}
												variant="outlined"
												size="small"
												style={{ marginLeft: '14px', marginTop: '20px' }}
												fullWidth
											/>
										)}
									/>
								)}
							/>
						</Grid>
						<Grid item xs={3}>
							<Controller
								name="contactnumber"
								id="contactnumber"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										style={{ marginLeft: '16px', marginTop: '20px' }}
										error={!!errors.LastName}
										required
										helperText={errors?.LastName?.message}
										label="Contact Number"
										// autoFocus
										id="email"
										variant="outlined"
										size="small"
										fullWidth
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={4}>
					<div className="flex" style={{ marginTop: '45px', marginLeft: '10px' }}>
						{/* <IconButton aria-label="delete">*/}
						{/*	<AddCircleOutlineOutlinedIcon />*/}
						{/* </IconButton>*/}
						<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
							<ModeEditOutlineOutlinedIcon />
						</IconButton>
						<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
							<DeleteOutlineOutlinedIcon />
						</IconButton>
					</div>
					<Button variant="contained" style={{ marginLeft: '200px', marginTop: '50px' }} color="secondary">
						Save
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default BasicInfoTab;
