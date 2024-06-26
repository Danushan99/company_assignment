import { ThemeProvider } from '@mui/material/styles';
import NavbarToggleFab from 'app/fuse-layouts/shared-components/NavbarToggleFab';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectNavbarTheme } from 'app/store/fuse/settingsSlice';
import NavbarStyle1 from './navbar/style-1/NavbarStyle1';

function NavbarWrapperLayout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const navbar = useSelector(({ fuse }) => fuse.navbar);

	const navbarTheme = useSelector(selectNavbarTheme);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<>{config.navbar.style === 'style-1' && <NavbarStyle1 />}</>
			</ThemeProvider>

			{config.navbar.display && !config.toolbar.display && !navbar.open && <NavbarToggleFab />}
		</>
	);
}

export default memo(NavbarWrapperLayout1);
