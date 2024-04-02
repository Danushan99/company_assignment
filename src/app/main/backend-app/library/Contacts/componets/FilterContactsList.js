import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import { useDispatch } from 'react-redux';
import { API_DATA_LIMIT } from 'app/main/utils/commonConstant';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getAllContacts, getContactsStarred, getContactsFrequently } from '../store/contactsSlice';

const StyledListItem = styled(ListItem)(({ theme }) => ({
	color: 'inherit!important',
	textDecoration: 'none!important',
	height: 40,
	width: '100%',
	borderRadius: 6,
	paddingLeft: 12,
	paddingRight: 12,
	marginBottom: 4,
	'&.active': {
		backgroundColor:
			theme.palette.mode === 'light' ? 'rgba(0, 0, 0, .05)!important' : 'rgba(255, 255, 255, .1)!important',
		pointerEvents: 'none',
		'& .list-item-icon': {
			color: 'inherit'
		}
	},
	'& .list-item-icon': {
		fontSize: 16,
		width: 16,
		height: 16,
		marginRight: 16
	}
}));

const FilterContactsList = ({ setSelectedOption, selectedOption, setAnchorEl, setIsLoadingContacts }) => {
	const dispatch = useDispatch();
	const handleOptionClick = option => {
		setSelectedOption(option);
		const paramsData = {
			limits: API_DATA_LIMIT
		};

		if (option && option === 'all') {
			dispatch(getAllContacts()).then(() => setIsLoadingContacts(false));
		} else if (option && option === 'starred') {
			dispatch(getContactsStarred(paramsData)).then(() => setIsLoadingContacts(false));
		} else if (option && option === 'frequently') {
			dispatch(getContactsFrequently(paramsData)).then(() => setIsLoadingContacts(false));
		}

		setAnchorEl(null);
	};

	const options = [
		{ label: 'All contacts', icon: 'people', value: 'all' },
		{ label: 'Frequently contacted', icon: 'restore', value: 'frequently' },
		{ label: 'Starred contacts', icon: 'star', value: 'starred' }
	];

	return (
		<List className="pt-0 px-12">
			{options.map(({ label, icon, value }) => (
				<StyledListItem
					key={value}
					button
					activeClassName={selectedOption === value ? 'active' : undefined}
					onClick={() => handleOptionClick(value)}
				>
					<Icon className="list-item-icon text-16" color="action">
						{icon}
					</Icon>
					<ListItemText className="truncate" primary={label} disableTypography />
				</StyledListItem>
			))}
		</List>
	);
};

export default FilterContactsList;
