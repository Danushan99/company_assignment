import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge, & > .logo-text': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

function Logo() {
	return (
		<Root className="flex items-center">
			<img className="logo-icon w-24 h-26" src="assets/images/logos/tesing.png" alt="logo" />
			<Typography className="logo-text text-16 leading-none mx-12 font-medium" color="inherit">
				TEST 2024
			</Typography>
			
		</Root>
	);
}

export default Logo;
