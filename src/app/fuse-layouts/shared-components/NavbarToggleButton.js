import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultSettings } from 'app/store/fuse/settingsSlice';
import _ from '@lodash';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import { navbarToggleMobile, navbarToggle } from '../../store/fuse/navbarSlice';

function NavbarToggleButton(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
	const settings = useSelector(({ fuse }) => fuse.settings.current);
	const { config } = settings.layout;
	const isOpen = useSelector(state => state.fuse.navbar.open);

	return (
		<IconButton
			className={props.className}
			color="inherit"
			size="small"
			onClick={ev => {
				if (mdDown) {
					dispatch(navbarToggleMobile());
				} else if (config.navbar.style === 'style-2') {
					dispatch(
						setDefaultSettings(
							_.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
						)
					);
				} else {
					dispatch(navbarToggle());
				}
			}}
		>
			{/* {props.children}*/}
			{isOpen ? (
				<Icon fontSize="inherit" className="text-16">
					<FormatIndentDecreaseIcon />
				</Icon>
			) : (
				<Icon fontSize="inherit" className="text-16">
					<FormatIndentIncreaseIcon />
				</Icon>
			)}
		</IconButton>
	);
}


export default NavbarToggleButton;
