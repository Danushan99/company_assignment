/* eslint-disable react-hooks/exhaustive-deps */
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import withRouter from '@fuse/core/withRouter';
import FuseNavBadge from '../../FuseNavBadge';

const StyledListItem = styled(ListItem)(({ theme }) => ({
	color: theme.palette.text.primary,
	textDecoration: 'none!important',
	minHeight: 48,
	'&.active': {
		backgroundColor: `${theme.palette.secondary.main}!important`,
		color: `${theme.palette.secondary.contrastText}!important`,
		pointerEvents: 'none',
		'& .fuse-list-item-text-primary': {
			color: 'inherit'
		},
		'& .fuse-list-item-icon': {
			color: 'inherit'
		}
	},
	'& .fuse-list-item-icon': {},
	'& .fuse-list-item-text': {
		padding: '0 0 0 16px'
	}
}));

function FuseNavHorizontalItem(props) {
	const { item } = props;

	return useMemo(
		() => (
			<StyledListItem
				button
				component={NavLinkAdapter}
				to={item.url}
				activeClassName="active"
				className={clsx('fuse-list-item')}
				end={item.end}
				role="button"
			>
				{item.icon && (
					<Icon className={clsx('fuse-list-item-icon text-16 shrink-0', item.iconClass)} color="action">
						{item.icon}
					</Icon>
				)}

				<ListItemText
					className="fuse-list-item-text"
					primary={item.en_US}
					classes={{ primary: 'text-13 fuse-list-item-text-primary' }}
				/>

				{item.badge && <FuseNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />}
			</StyledListItem>
		),
		[item.badge, item.exact, item.icon, item.iconClass, item.en_US, item.url]
	);
}

FuseNavHorizontalItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		en_US: PropTypes.string,
		icon: PropTypes.string,
		url: PropTypes.string
	})
};

FuseNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(memo(FuseNavHorizontalItem));

export default NavHorizontalItem;
