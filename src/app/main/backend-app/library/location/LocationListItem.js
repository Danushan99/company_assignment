import _ from '@lodash';
import { styled } from '@mui/material/styles';
import { amber, red } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import { selectLabelsEntities } from './store/labelsSlice';
import { updateTodo, openEditTodoDialog } from './store/todosSlice';

const StyledListItem = styled(ListItem)(({ theme, completed }) => ({
	...(completed && {
		background: 'rgba(0,0,0,0.03)',
		'& .todo-title, & .todo-notes': {
			textDecoration: 'line-through'
		}
	})
}));

function LocationListItem(props) {
	const dispatch = useDispatch();
	const labels = useSelector(selectLabelsEntities);

	return (
		<StyledListItem
			className="py-20 px-0 sm:px-8"
			completed={props.todo.completed ? 1 : 0}
			onClick={ev => {
				ev.preventDefault();
				dispatch(openEditTodoDialog(props.todo));
			}}
			dense
			button
		>
			<EditLocationAltIcon />
			{/* <IconButton*/}
			{/*  tabIndex={-1}*/}
			{/*  disableRipple*/}
			{/*  onClick={(ev) => {*/}
			{/*    ev.stopPropagation();*/}
			{/*    dispatch(*/}
			{/*      updateTodo({*/}
			{/*        ...props.todo,*/}
			{/*        completed: !props.todo.completed,*/}
			{/*      })*/}
			{/*    );*/}
			{/*  }}*/}
			{/*  size="large"*/}
			{/* >*/}
			{/*  {props.todo.completed ? (*/}
			{/*    <Icon color="secondary">check_circle</Icon>*/}
			{/*  ) : (*/}
			{/*    <Icon color="action">radio_button_unchecked</Icon>*/}
			{/*  )}*/}
			{/* </IconButton>*/}

			<div className="flex flex-1 flex-col relative overflow-hidden px-8">
				<Typography
					className="todo-title truncate text-14 font-medium"
					color={props.todo.completed ? 'textSecondary' : 'inherit'}
				>
					Country - {props.todo.Country}
				</Typography>

				<Typography color="textSecondary" className="todo-notes truncate">
					City - {props.todo.City}
				</Typography>

				<Typography color="textSecondary" className="todo-notes truncate">
					Ports - {props.todo.Ports}
				</Typography>

				<Typography color="textSecondary" className="todo-notes truncate">
					Terminal - {props.todo.Terminal}
				</Typography>
			</div>
		</StyledListItem>
	);
}

export default LocationListItem;
