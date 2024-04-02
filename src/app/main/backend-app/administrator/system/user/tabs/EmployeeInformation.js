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
import { selectJobtitles } from '../../../store/systemJobtitleSlice';
import { selectCompanies } from '../../../store/systemCompanySlice';
import { getUser } from '../../../store/systemUserSlice';
import JwtService from '../../../../../../services/jwtService';
import { selectUsers } from '../../../store/userslice';

import { emailInputLowercase, textInputUppercase } from '../../../../../../shared-components/commonFunction';

// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

function EmployeeInformation(props) {
	// const { selectedImage, setSelectedImage } = props
	const [selectedImage, setSelectedImage] = useState(null);

	const [extension, setExtension] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [email, setEmail] = useState('');

	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	const jobtitle = useSelector(selectJobtitles);

	const mtOffices = useSelector(selectCompanies);
	const usardata = useSelector(selectUsers);
	usardata.map(data => {
		//  setusername(data.FirstName);
	});

	//   const routeParams = useParams();
	//
	//   const [username,setusername]=useState("");
	// //  const username = SrvData.map((n) => n.UserName);
	//
	//   useEffect(()=>{
	//       axios.get(`https://dev.mtcs.online/api/user/${routeParams.userId}`)
	//           .then(res=>{
	//             //  console.log(res.data.datas[0].UserName);
	//               setusername(res.data.datas[0].UserName)
	//
	//           })
	//           .catch(err=>{
	//               console.log(err);
	//           })
	//   },[])

	//    console.log(mtOffices);

	//   const user = useSelector(selectUser);
	//  console.log('loged user details',user)

	const genderList = [
		{
			value: 'Male',
			label: 'Male'
		},
		{
			value: 'Female',
			label: 'Female'
		}
	];

	const officeList = [];
	mtOffices.forEach(element => {
		officeList.push({ label: element?.CompanyName, value: element?.CompanyID });
	});

	const jobList = [];
	jobtitle.forEach(element => {
		jobList.push({ label: element?.en_US, value: element?.en_US });
	});

	const maskPhone = value =>
		value
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '+$1$2')
			.replace(/(\d{5})(\d)/, '$1$2')
			.replace(/(-\d{6})(\d+?)$/, '$1');

	const [files, setFiles] = useState([]);

	// async function uploadimg(e) {
	//     const file = e.target.files[0];
	//     if (file) {
	//       console.log("e---image", e.target.files);
	//       const read = await readFileAsync(file);
	//       setSelectedImage([...selectedImage, read]);
	//       // setFiles([...files, file]);

	//       const value = [...files, file];
	//       setFiles(value);
	//       setValue("avatar", value);
	//     }
	//   }

	// function submitForm(e) {
	//     e.preventDefault();
	//     // if (file) {
	//     //     const data =new FormData();
	//     //     const filename = Date.now() + file.name;
	//     //     data.append("name", filename);
	//     //     data.append("file", file);
	//     //     userData.profile_pic= filename;
	//     //     try {
	//     //         axios.post("http://localhost:5000/api/upload", data);
	//     //     } catch (err) {
	//     //         alert(err)
	//     //     }
	//     // }
	//     axios.put(`https://dev.mtcs.online/api/user/${routeParams.userId}`)
	//         .then(function (response) {
	//             console.log(response.data)
	//             setusername("");
	//             // setAddress("");
	//             // setEmail("");
	//             // setGender("");
	//             // setMobileNo("");
	//             // setNic("");
	//             // setAge("");
	//             // setPaymentMethod("");
	//             // setPrograms("");
	//             // setTrainer("");
	//             // setShow(false);
	//
	//             if (response.status === 200) {
	//                 const data = response.data;
	//                 toast.success(data?.Msg, {
	//                     position: toast.POSITION.TOP_CENTER,
	//                     autoClose: 4000,
	//                 });
	//                 return data;
	//             }else{
	//                 // toast.error(data?.Msg, {
	//                 //   position: toast.POSITION.TOP_CENTER,
	//                 //   autoClose: 4000,
	//                 //   });
	//                 JwtService.autoLogoutRedirection();
	//             }
	//
	//         })
	//         .catch(function (error) {
	//             console.log(error);
	//         });
	// }

	const inputArr = [
		{
			type: 'text',
			id: 1,
			value: ''
		}
	];

	const [arr, setArr] = useState(inputArr);

	const addInput = () => {
		setArr(s => {
			return [
				...s,
				{
					type: 'text',
					value: ''
				}
			];
		});
	};

	return (
		<>
			<div className="flex">
				<p>Employee Information</p>
				<IconButton aria-label="delete" style={{ marginTop: '-10px' }}>
					<ModeEditOutlineOutlinedIcon />
				</IconButton>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<Controller
						name="employmentid"
						id="employmentid"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.LastName}
								required
								helperText={errors?.LastName?.message}
								label="Employment ID"
								// autoFocus
								id="employmentid"
								variant="outlined"
								size="small"
								fullWidth
							/>
						)}
					/>
					<Controller
						name="extension"
						id="extension"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.LastName}
								style={{ marginTop: '5px' }}
								required
								helperText={errors?.LastName?.message}
								label="Extension"
								// autoFocus
								id="extension"
								variant="outlined"
								size="small"
								fullWidth
								value={extension}
								onChange={e => {
									textInputUppercase(e, setExtension);
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={3}>
					<Controller
						name="jobtitle"
						id="jobtitle"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.LastName}
								required
								helperText={errors?.LastName?.message}
								label="Job Title"
								// autoFocus
								id="jobtitle"
								variant="outlined"
								size="small"
								fullWidth
								value={jobTitle}
								onChange={e => {
									textInputUppercase(e, setJobTitle);
								}}
							/>
						)}
					/>
					<Controller
						name="joineddate"
						id="joineddate"
						control={control}
						render={({ field: { onChange, value } }) => (
							<DatePicker
								label="Joined Date"
								// mask="__.__.____"
								inputFormat="yyyy/MM/dd"
								value={value}
								onChange={onChange}
								required
								renderInput={params => (
									<TextField
										{...params}
										className="mt-8 mb-8"
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
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth size="small">
						<InputLabel id="demo-simple-select-label">Department</InputLabel>
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

					<FormControl fullWidth size="small" style={{ marginTop: '5px' }}>
						<InputLabel id="demo-simple-select-label">Employment Status</InputLabel>
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
						name="email"
						id="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								error={!!errors.LastName}
								required
								helperText={errors?.LastName?.message}
								label="Email"
								// autoFocus
								id="email"
								variant="outlined"
								size="small"
								fullWidth
								value={email}
								onChange={e => emailInputLowercase(e, setEmail)}
							/>
						)}
					/>
				</Grid>
			</Grid>
			<div className="flex">
				<p style={{ marginTop: '10px', marginBottom: '10px' }}>The Physiological Characteristics</p>
				<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
					<ModeEditOutlineOutlinedIcon />
				</IconButton>
			</div>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<FormControl fullWidth size="small">
						<InputLabel id="demo-simple-select-label">Stability to Stresses</InputLabel>
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
					<FormControl fullWidth size="small" style={{ marginTop: '5px' }}>
						<InputLabel id="demo-simple-select-label">Discipiline</InputLabel>
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
				<Grid item xs={4}>
					<FormControl fullWidth size="small">
						<InputLabel id="demo-simple-select-label">Good Nature in Collective</InputLabel>
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
					<FormControl fullWidth size="small" style={{ marginTop: '5px' }}>
						<InputLabel id="demo-simple-select-label">Sense of Duty</InputLabel>
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
				<Grid item xs={4}>
					<FormControl fullWidth size="small">
						<InputLabel id="demo-simple-select-label">Ability to come in positive contact</InputLabel>
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
					<FormControl fullWidth size="small" style={{ marginTop: '5px' }}>
						<InputLabel id="demo-simple-select-label">Leadership</InputLabel>
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
					<Button variant="contained" style={{ marginLeft: '250px', marginTop: '25px' }} color="secondary">
						Save
					</Button>
				</Grid>
			</Grid>
		</>
	);
}

export default EmployeeInformation;
