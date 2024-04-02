/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectUser } from '../../auth/store/logedUserSlice';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	'& .username, & .email': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},

	'& .avatar': {
		background: theme.palette.background.default,
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		bottom: 0,
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader(props) {
	const user = useSelector(({ auth }) => auth.user);
	const auth = useSelector(({ auth }) => auth.user.data.userId);

	const users = useSelector(selectUser);
	const photoURL = users.map(n => n.ProfilePicture);
	const userid = users.map(n => n.UserID);

	let profilephoto;
	let i;
	for (i = 0; i < userid.length; i++) {
		if (auth === userid[i]) {
			profilephoto = photoURL[i];
		}
	}

	return (
		<StyledAppBar
			position="static"
			color="primary"
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
		>
			<Typography className="username text-18 whitespace-nowrap font-semibold mb-4" color="inherit">
				{user.data.displayName}
			</Typography>
			<Typography className="email text-13 opacity-50 whitespace-nowrap font-medium" color="inherit">
				{user.data.email}
			</Typography>
			<div className="flex items-center justify-center absolute bottom-0 -mb-44">
				<Avatar
					className="avatar w-72 h-72 p-8 box-content"
					alt="user photo"
					src={
						user.data.photoURL && user.data.photoURL !== ''
							? profilephoto
							: 'assets/images/avatars/profile.jpg'
					}
				/>
			</div>
		</StyledAppBar>
	);
}

export default UserNavbarHeader;
