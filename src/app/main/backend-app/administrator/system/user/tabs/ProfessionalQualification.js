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
import AttachmentIcon from '@mui/icons-material/Attachment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { selectJobtitles } from '../../../store/systemJobtitleSlice';
import { selectCompanies } from '../../../store/systemCompanySlice';
import { getUser } from '../../../store/systemUserSlice';
import JwtService from '../../../../../../services/jwtService';
import { selectUsers } from '../../../store/userslice';

import { emailInputLowercase, textInputUppercase } from '../../../../../../shared-components/commonFunction';

function ProfessionalQualification(props) {
	const [institute, setInstitute] = useState('');
	const [course, setCourse] = useState('');
	const [qualification, setQualification] = useState('');
	const [description, setDescription] = useState('');
	const [reasonToResign, setReasonToResign] = useState('');

	// const { selectedImage, setSelectedImage } = props
	const [selectedImage, setSelectedImage] = useState(null);

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

	//   const user = useSelector(selectUser);
	//  console.log('loged user details',user)

	//  const username = user.map((n) => n.UserName);
	//   console.log('loged user username',username)

	//  const name=[];

	// username.forEach(element=>{
	//   name.push({ label: element?.UserName, value: element?.UserName });
	// });

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

	// const name = [];
	// uname.forEach(element => {
	//     name.push({ label: element?.FirstName, value: element?.FirstName });
	// });
	// console.log('name',name);

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

	//  let  directors_array=["director-0"]
	// function appendInput_director() {
	//     var newInput = `director-${directors_array.length}`;
	//     console.log("checkaddiput",directors_array.concat([newInput]));
	//
	//         directors_array = directors_array.concat([newInput])
	//
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
		<Grid container spacing={2}>
			<Grid item xs={8}>
				<div className="flex">
					<p style={{ marginLeft: '5px', marginTop: '10px' }}>Professional Qualification</p>
					<IconButton aria-label="delete">
						<AddCircleOutlineOutlinedIcon />
					</IconButton>
				</div>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<Controller
							name="periodofstudy"
							id="periodofstudy"
							control={control}
							render={({ field: { onChange, value } }) => (
								<DatePicker
									label="Period of Study"
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
											style={{ marginLeft: '5px', marginTop: '20px' }}
											fullWidth
										/>
									)}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							name="institute"
							id="institute"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									style={{ marginLeft: '16px', marginTop: '20px' }}
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Institute"
									// autoFocus
									id="email"
									variant="outlined"
									size="small"
									fullWidth
									value={institute}
									onChange={e => {
										textInputUppercase(e, setInstitute);
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							name="course"
							id="course"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									style={{ marginLeft: '16px', marginTop: '20px' }}
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Course"
									// autoFocus
									id="email"
									variant="outlined"
									size="small"
									fullWidth
									value={course}
									onChange={e => {
										textInputUppercase(e, setCourse);
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							name="qualification"
							id="qualification"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									style={{ marginLeft: '16px', marginTop: '20px' }}
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Qualification"
									// autoFocus
									id="qualification"
									variant="outlined"
									size="small"
									fullWidth
									value={qualification}
									onChange={e => {
										textInputUppercase(e, setQualification);
									}}
								/>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={4}>
				<div className="flex" style={{ marginTop: '45px', marginLeft: '10px' }}>
					<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
						<ModeEditOutlineOutlinedIcon />
					</IconButton>
					<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
						<DeleteOutlineOutlinedIcon />
					</IconButton>
					<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
						<AttachmentIcon />
					</IconButton>
					<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
						<VisibilityIcon />
					</IconButton>
				</div>
			</Grid>
			<Grid container spacing={2}>
				<div className="flex">
					<p style={{ marginLeft: '36px', marginTop: '20px' }}>Working Expiriances</p>
					<IconButton aria-label="delete" style={{ marginTop: '12px' }}>
						<AddCircleOutlineOutlinedIcon />
					</IconButton>
				</div>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<Controller
							name="period"
							id="period"
							control={control}
							render={({ field: { onChange, value } }) => (
								<DatePicker
									label="Period (Date/Month/Year)"
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
											style={{ marginLeft: '35px', marginTop: '20px' }}
											fullWidth
										/>
									)}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							name="companyname"
							id="companyname"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									style={{ marginLeft: '25px', marginTop: '20px' }}
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Company name /Post/Job Description"
									// autoFocus
									id="email"
									variant="outlined"
									size="small"
									fullWidth
									value={description}
									onChange={e => {
										textInputUppercase(e, setDescription);
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<Controller
							name="reasontoresign"
							id="reasontoresign"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									style={{ marginLeft: '16px', marginTop: '20px' }}
									error={!!errors.LastName}
									required
									helperText={errors?.LastName?.message}
									label="Reason To Resign"
									// autoFocus
									id="email"
									variant="outlined"
									size="small"
									fullWidth
									value={reasonToResign}
									onChange={e => {
										textInputUppercase(e, setReasonToResign);
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={3}>
						<div className="flex" style={{ marginTop: '18px', marginLeft: '10px' }}>
							<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
								<ModeEditOutlineOutlinedIcon />
							</IconButton>
							<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
								<DeleteOutlineOutlinedIcon />
							</IconButton>
							<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
								<AttachmentIcon />
							</IconButton>
							<IconButton aria-label="delete" style={{ marginLeft: '10px' }}>
								<VisibilityIcon />
							</IconButton>
						</div>
						<Button
							variant="contained"
							style={{ marginLeft: '160px', marginTop: '60px' }}
							color="secondary"
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default ProfessionalQualification;
