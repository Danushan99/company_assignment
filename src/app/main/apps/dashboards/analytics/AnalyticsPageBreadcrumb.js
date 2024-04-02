import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// function handleClick(event) {
// 	event.preventDefault();
// 	console.info('You clicked a breadcrumb.');
// }

export default function CustomSeparator() {
	const breadcrumbs = [
		<Typography key="3" color="text.primary">
			Dashboards
		</Typography>,

		<Typography key="3" color="text.primary">
			Analytics
		</Typography>
	];

	return (
		<Stack spacing={2}>
			<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
				{breadcrumbs}
			</Breadcrumbs>
		</Stack>
	);
}
