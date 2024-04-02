/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-undef */
import FuseNavigation from '@fuse/core/FuseNavigation';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavigation, getNewMenuArray } from 'app/store/fuse/navigationSlice';
import { useLocation } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { navbarCloseMobile } from '../../store/fuse/navbarSlice';

export function MyBreadcrumbs() {
	const dispatch = useDispatch();
	const location = useLocation();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const [menuList, setMenuList] = useState([]);

	useEffect(() => {
		if (window.location.pathname !== '/login') {
			dispatch(getNewMenuArray()).then(response => {
				setMenuList(response?.payload);
			});
		}
	}, [dispatch]);

	// Split the pathname into individual parts and filter out any empty strings
	const pathParts = location.pathname.split('/').filter(part => part !== '');

	// Create a breadcrumb link based on the part and menu data
	const getBreadcrumbLink = part => {
		const foundMenu = menuList.find(item => item.url?.includes(part));
		return foundMenu ? foundMenu.url : null;
	};
	// Function to get the correct label based on the currentLanguageId
	const getMenuLabel = menuItem => {
		return currentLanguageId === 'en_US' ? menuItem.en_US : menuItem.rus;
	};

	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link color="inherit" to="/apps/dashboards/analytics">
				TEST 2024
			</Link>
			
			{pathParts.map((part, index) => {
				const isLast = index === pathParts.length - 1;
				const linkTo = `/${pathParts.slice(0, index + 1).join('/')}`;
				const linkUrl = getBreadcrumbLink(location.pathname);

				return (
					<Typography key={index} color={isLast ? 'textPrimary' : 'inherit'}>
						{isLast ? (
							part.toUpperCase() // Display the last part in uppercase
						) : linkUrl ? (
							<Link color="inherit" to={linkUrl}>
								{part.toUpperCase()} {/* Display other parts in uppercase */}
							</Link>
						) : (
							<Link color="inherit" to={linkTo}>
								{part.toUpperCase()}
							</Link>
						)}
					</Typography>
				);
			})}

		</Breadcrumbs>
	);
}

function Navigation(props) {
	const navigation = useSelector(selectNavigation);
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('lg'));

	function handleItemClick(item) {
		if (mdDown) {
			dispatch(navbarCloseMobile());
		}
	}

	return (
		<FuseNavigation
			className={clsx('navigation', props.className)}
			navigation={navigation}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
			onItemClick={handleItemClick}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default memo(Navigation);
