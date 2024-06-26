import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { styled, useTheme, alpha } from '@mui/material/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListSubheader from '@mui/material/ListSubheader';
import FuseNavItem from '../../FuseNavItem';

const Root = styled(ListSubheader)(({ theme, itempadding, ...props }) => ({
	height: 40,
	width: '100%',
	borderRadius: '6px',
	margin: '24px 0 4px 0',
	paddingRight: 12,
	paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
	color: alpha(theme.palette.text.primary, 0.7),
	fontWeight: 600,
	letterSpacing: '0.025em'
}));

function FuseNavVerticalGroup(props) {
	const dispatch = useDispatch();

	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
	const { item, nestedLevel, onItemClick } = props;

	const itempadding = nestedLevel > 0 ? 28 + nestedLevel * 16 : 12;

	return useMemo(
		() => (
			<>
				<Root
					component={item.url ? NavLinkAdapter : 'li'}
					itempadding={itempadding}
					disableSticky
					className={clsx('fuse-list-subheader flex items-center', !item.url && 'cursor-default')}
					onClick={() => onItemClick && onItemClick(item)}
					to={item.url}
					end={item.end}
					role="button"
				>
					<span className="fuse-list-subheader-text uppercase text-12">{item.en_US}</span>
				</Root>
				{item.children && (
					<>
						{item.children.map(_item => (
							<FuseNavItem
								key={_item.id}
								type={`vertical-${_item.type}`}
								item={_item}
								nestedLevel={nestedLevel}
								onItemClick={onItemClick}
							/>
						))}
					</>
				)}
			</>
		),
		[item, itempadding, nestedLevel, onItemClick]
	);
}

FuseNavVerticalGroup.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		en_US: PropTypes.string,
		children: PropTypes.array
	})
};

FuseNavVerticalGroup.defaultProps = {};

const NavVerticalGroup = FuseNavVerticalGroup;

export default NavVerticalGroup;
