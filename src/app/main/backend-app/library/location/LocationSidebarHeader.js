// import Icon from '@mui/material/Icon';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import WhereToVoteOutlinedIcon from '@mui/icons-material/WhereToVoteOutlined';
import { openNewTodoDialog } from './store/todosSlice';

// const accounts = {
// 	creapond: 'johndoe@creapond.com',
// 	withinpixels: 'johndoe@withinpixels.com'
// };

function LocationSidebarHeader() {
	const [selectedAccount, setSelectedCount] = useState('creapond');

	function handleAccountChange(ev) {
		setSelectedCount(ev.target.value);
	}

	return (
		<div className="flex flex-col justify-center h-full p-24">
			<div className="flex items-center flex-1">
				<WhereToVoteOutlinedIcon fontSize="medium" />

				<Typography
					component={motion.span}
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
					className="text-16 md:text-24 mx-12  font-semibold"
				>
					Location
				</Typography>
			</div>
		</div>
	);
}

export default LocationSidebarHeader;
