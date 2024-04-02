/* eslint-disable react/jsx-no-bind */
import FormControl from '@mui/material/FormControl';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOrderDescending, changeOrder } from './store/todosSlice';

function LocationToolbar(props) {
	const dispatch = useDispatch();
	const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
	const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);

	function handleOrderChange(ev) {
		dispatch(changeOrder(ev.target.value));
	}

	return (
		<div className="flex justify-between w-full">
			<div className="flex" />
			<div className="flex items-center">
				<FormControl className="" variant="filled">
					<Select
						value={orderBy}
						onChange={handleOrderChange}
						displayEmpty
						name="filter"
						classes={{ select: 'py-8' }}
					>
						<MenuItem value="orderby">
							<em>Order by</em>
						</MenuItem>
						<MenuItem value="Country">Country</MenuItem>
						<MenuItem value="City">City</MenuItem>
						<MenuItem value="Ports">Ports</MenuItem>
						<MenuItem value="Terminal">Terminal</MenuItem>
					</Select>
				</FormControl>
				<IconButton onClick={ev => dispatch(toggleOrderDescending())} size="large">
					<Icon style={{ transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)' }}>sort</Icon>
				</IconButton>
			</div>
		</div>
	);
}

export default LocationToolbar;
