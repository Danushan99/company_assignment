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
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Paper from '@mui/material/Paper';
import { selectJobtitles } from '../../../store/systemJobtitleSlice';
import { selectCompanies } from '../../../store/systemCompanySlice';
import { getUser } from '../../../store/systemUserSlice';
import JwtService from '../../../../../../services/jwtService';
import { selectUsers } from '../../../store/userslice';

// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

function EmployeeDocuments(props) {
	// const { selectedImage, setSelectedImage } = props
	const [selectedImage, setSelectedImage] = useState(null);

	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	const jobtitle = useSelector(selectJobtitles);

	const mtOffices = useSelector(selectCompanies);

	// const [username,setusername]=useState("");
	const usardata = useSelector(selectUsers);
	usardata.map(data => {
		//  setusername(data.FirstName);
	});

	// console.log('chekkkkkkkkkkkk',username)

	//   const routeParams = useParams();
	//   console.log(routeParams)
	//
	//   const [username,setusername]=useState("");
	// //  const username = SrvData.map((n) => n.UserName);
	//  // console.log("testget data",username)
	//   console.log(username);
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

	//  const username = user.map((n) => n.UserName);
	//   console.log('loged user username',username)

	//  const name=[];

	// username.forEach(element=>{
	//   name.push({ label: element?.UserName, value: element?.UserName });
	// });

	// console.log('username',name);

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

	console.log('offise ilst', officeList);

	const jobList = [];
	jobtitle.forEach(element => {
		jobList.push({ label: element?.en_US, value: element?.en_US });
	});

	console.log('job', jobList);

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
		<>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Paper sx={{ width: '95%', overflow: 'hidden', marginLeft: 2, marginTop: 1 }}>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									{/* <TableRow>*/}
									{/*    <TableCell className="p-4 md:p-5">File Name</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Status</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Action</TableCell>*/}
									{/* </TableRow>*/}
								</TableHead>
								<TableBody>
									<TableRow
										// key={row.TypeID}
										// className="h-24 cursor-pointer"
										hover
										role="checkbox"
										//   aria-checked={isSelected}
										tabIndex={-1}
										//  selected={isSelected}
										// onClick={(event) => handleClick(row.TypeID)}
										// onClick={handleClickOpen}
									>
										<TableCell component="th" scope="row" className="p-4 md:p-5">
											<AttachFileOutlinedIcon fontSize="medium" />
											{/* {row.en_US}*/}Birth Certificate
										</TableCell>

										<TableCell className="p-4 md:p-5" component="th" scope="row" align="right">
											{/* {row.PDFuploadID != null ? (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClickUpdate(row.TypeID, row.PDFuploadID)}
											>
												<VisibilityOutlinedIcon className="text-green text-20 p-4 md:p-1">
													visible_file
												</VisibilityOutlinedIcon>
											</IconButton>
											{/* ) : (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<FileUploadOutlinedIcon className="text-black text-20 p-1 md:p-1">
													uploard_file
												</FileUploadOutlinedIcon>
											</IconButton>
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<DeleteOutlineOutlinedIcon className="text-black text-20 p-1 md:p-1">
													deletefile
												</DeleteOutlineOutlinedIcon>
											</IconButton>
											{/* )}*/}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					<Paper sx={{ width: '95%', overflow: 'hidden', marginLeft: 2, marginTop: 1 }}>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									{/* <TableRow>*/}
									{/*    <TableCell className="p-4 md:p-5">File Name</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Status</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Action</TableCell>*/}
									{/* </TableRow>*/}
								</TableHead>
								<TableBody>
									<TableRow
										// key={row.TypeID}
										// className="h-24 cursor-pointer"
										hover
										role="checkbox"
										//   aria-checked={isSelected}
										tabIndex={-1}
										//  selected={isSelected}
										// onClick={(event) => handleClick(row.TypeID)}
										// onClick={handleClickOpen}
									>
										<TableCell component="th" scope="row" className="p-4 md:p-5">
											<AttachFileOutlinedIcon fontSize="medium" />
											{/* {row.en_US}*/}Passport
										</TableCell>

										<TableCell className="p-4 md:p-5" component="th" scope="row" align="right">
											{/* {row.PDFuploadID != null ? (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClickUpdate(row.TypeID, row.PDFuploadID)}
											>
												<VisibilityOutlinedIcon className="text-green text-20 p-4 md:p-1">
													visible_file
												</VisibilityOutlinedIcon>
											</IconButton>
											{/* ) : (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<FileUploadOutlinedIcon className="text-black text-20 p-1 md:p-1">
													uploard_file
												</FileUploadOutlinedIcon>
											</IconButton>
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<DeleteOutlineOutlinedIcon className="text-black text-20 p-1 md:p-1">
													deletefile
												</DeleteOutlineOutlinedIcon>
											</IconButton>
											{/* )}*/}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					<Paper sx={{ width: '95%', overflow: 'hidden', marginLeft: 2, marginTop: 1 }}>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									{/* <TableRow>*/}
									{/*    <TableCell className="p-4 md:p-5">File Name</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Status</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Action</TableCell>*/}
									{/* </TableRow>*/}
								</TableHead>
								<TableBody>
									<TableRow
										// key={row.TypeID}
										// className="h-24 cursor-pointer"
										hover
										role="checkbox"
										//   aria-checked={isSelected}
										tabIndex={-1}
										//  selected={isSelected}
										// onClick={(event) => handleClick(row.TypeID)}
										// onClick={handleClickOpen}
									>
										<TableCell component="th" scope="row" className="p-4 md:p-5">
											<AttachFileOutlinedIcon fontSize="medium" />
											{/* {row.en_US}*/}Curriculum Vitae
										</TableCell>

										<TableCell className="p-4 md:p-5" component="th" scope="row" align="right">
											{/* {row.PDFuploadID != null ? (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClickUpdate(row.TypeID, row.PDFuploadID)}
											>
												<VisibilityOutlinedIcon className="text-green text-20 p-4 md:p-1">
													visible_file
												</VisibilityOutlinedIcon>
											</IconButton>
											{/* ) : (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<FileUploadOutlinedIcon className="text-black text-20 p-1 md:p-1">
													uploard_file
												</FileUploadOutlinedIcon>
											</IconButton>
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<DeleteOutlineOutlinedIcon className="text-black text-20 p-1 md:p-1">
													deletefile
												</DeleteOutlineOutlinedIcon>
											</IconButton>
											{/* )}*/}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					<Paper sx={{ width: '95%', overflow: 'hidden', marginLeft: 2, marginTop: 1 }}>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									{/* <TableRow>*/}
									{/*    <TableCell className="p-4 md:p-5">File Name</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Status</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Action</TableCell>*/}
									{/* </TableRow>*/}
								</TableHead>
								<TableBody>
									<TableRow
										// key={row.TypeID}
										// className="h-24 cursor-pointer"
										hover
										role="checkbox"
										//   aria-checked={isSelected}
										tabIndex={-1}
										//  selected={isSelected}
										// onClick={(event) => handleClick(row.TypeID)}
										// onClick={handleClickOpen}
									>
										<TableCell component="th" scope="row" className="p-4 md:p-5">
											<AttachFileOutlinedIcon fontSize="medium" />
											{/* {row.en_US}*/}Police Certificate
										</TableCell>

										<TableCell className="p-4 md:p-5" component="th" scope="row" align="right">
											{/* {row.PDFuploadID != null ? (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClickUpdate(row.TypeID, row.PDFuploadID)}
											>
												<VisibilityOutlinedIcon className="text-green text-20 p-4 md:p-1">
													visible_file
												</VisibilityOutlinedIcon>
											</IconButton>
											{/* ) : (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<FileUploadOutlinedIcon className="text-black text-20 p-1 md:p-1">
													uploard_file
												</FileUploadOutlinedIcon>
											</IconButton>
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<DeleteOutlineOutlinedIcon className="text-black text-20 p-1 md:p-1">
													deletefile
												</DeleteOutlineOutlinedIcon>
											</IconButton>
											{/* )}*/}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper sx={{ width: '95%', overflow: 'hidden', marginLeft: 2, marginTop: 1 }}>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									{/* <TableRow>*/}
									{/*    <TableCell className="p-4 md:p-5">File Name</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Status</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Action</TableCell>*/}
									{/* </TableRow>*/}
								</TableHead>
								<TableBody>
									<TableRow
										// key={row.TypeID}
										// className="h-24 cursor-pointer"
										hover
										role="checkbox"
										//   aria-checked={isSelected}
										tabIndex={-1}
										//  selected={isSelected}
										// onClick={(event) => handleClick(row.TypeID)}
										// onClick={handleClickOpen}
									>
										<TableCell component="th" scope="row" className="p-4 md:p-5">
											<AttachFileOutlinedIcon fontSize="medium" />
											{/* {row.en_US}*/}NIC
										</TableCell>

										<TableCell className="p-4 md:p-5" component="th" scope="row" align="right">
											{/* {row.PDFuploadID != null ? (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClickUpdate(row.TypeID, row.PDFuploadID)}
											>
												<VisibilityOutlinedIcon className="text-green text-20 p-4 md:p-1">
													visible_file
												</VisibilityOutlinedIcon>
											</IconButton>
											{/* ) : (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<FileUploadOutlinedIcon className="text-black text-20 p-1 md:p-1">
													uploard_file
												</FileUploadOutlinedIcon>
											</IconButton>
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<DeleteOutlineOutlinedIcon className="text-black text-20 p-1 md:p-1">
													deletefile
												</DeleteOutlineOutlinedIcon>
											</IconButton>
											{/* )}*/}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>

					<Paper sx={{ width: '95%', overflow: 'hidden', marginLeft: 2, marginTop: 1 }}>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									{/* <TableRow>*/}
									{/*    <TableCell className="p-4 md:p-5">File Name</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Status</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Action</TableCell>*/}
									{/* </TableRow>*/}
								</TableHead>
								<TableBody>
									<TableRow
										// key={row.TypeID}
										// className="h-24 cursor-pointer"
										hover
										role="checkbox"
										//   aria-checked={isSelected}
										tabIndex={-1}
										//  selected={isSelected}
										// onClick={(event) => handleClick(row.TypeID)}
										// onClick={handleClickOpen}
									>
										<TableCell component="th" scope="row" className="p-4 md:p-5">
											<AttachFileOutlinedIcon fontSize="medium" />
											{/* {row.en_US}*/}Passport
										</TableCell>

										<TableCell className="p-4 md:p-5" component="th" scope="row" align="right">
											{/* {row.PDFuploadID != null ? (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClickUpdate(row.TypeID, row.PDFuploadID)}
											>
												<VisibilityOutlinedIcon className="text-green text-20 p-4 md:p-1">
													visible_file
												</VisibilityOutlinedIcon>
											</IconButton>
											{/* ) : (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<FileUploadOutlinedIcon className="text-black text-20 p-1 md:p-1">
													uploard_file
												</FileUploadOutlinedIcon>
											</IconButton>
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<DeleteOutlineOutlinedIcon className="text-black text-20 p-1 md:p-1">
													deletefile
												</DeleteOutlineOutlinedIcon>
											</IconButton>
											{/* )}*/}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
					<Paper sx={{ width: '95%', overflow: 'hidden', marginLeft: 2, marginTop: 1 }}>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									{/* <TableRow>*/}
									{/*    <TableCell className="p-4 md:p-5">File Name</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Status</TableCell>*/}
									{/*    <TableCell align="right" className="p-4 md:p-5">Action</TableCell>*/}
									{/* </TableRow>*/}
								</TableHead>
								<TableBody>
									<TableRow
										// key={row.TypeID}
										// className="h-24 cursor-pointer"
										hover
										role="checkbox"
										//   aria-checked={isSelected}
										tabIndex={-1}
										//  selected={isSelected}
										// onClick={(event) => handleClick(row.TypeID)}
										// onClick={handleClickOpen}
									>
										<TableCell component="th" scope="row" className="p-4 md:p-5">
											<AttachFileOutlinedIcon fontSize="medium" />
											{/* {row.en_US}*/}Grama Niladhari Letter
										</TableCell>

										<TableCell className="p-4 md:p-5" component="th" scope="row" align="right">
											{/* {row.PDFuploadID != null ? (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClickUpdate(row.TypeID, row.PDFuploadID)}
											>
												<VisibilityOutlinedIcon className="text-green text-20 p-4 md:p-1">
													visible_file
												</VisibilityOutlinedIcon>
											</IconButton>
											{/* ) : (*/}
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<FileUploadOutlinedIcon className="text-black text-20 p-1 md:p-1">
													uploard_file
												</FileUploadOutlinedIcon>
											</IconButton>
											<IconButton
												className="p-4 md:p-3"
												onClick={event => handleClick(row.TypeID)}
											>
												<DeleteOutlineOutlinedIcon className="text-black text-20 p-1 md:p-1">
													deletefile
												</DeleteOutlineOutlinedIcon>
											</IconButton>
											{/* )}*/}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
					<Button variant="contained" style={{ marginLeft: '450px', marginTop: '100px' }} color="secondary">
						Save
					</Button>
				</Grid>
			</Grid>
		</>
	);
}

export default EmployeeDocuments;
