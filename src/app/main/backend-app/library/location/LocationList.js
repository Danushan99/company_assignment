/* eslint-disable import/no-extraneous-dependencies */
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTodos } from './store/todosSlice';
import TodoListItem from './LocationListItem';

function LocationList(props) {
	const todos = useSelector(selectTodos);
	const data = todos[0];
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
	const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);
	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return data;
			}
			return FuseUtils.filterArrayByString(data, _searchText);
		}

		if (data) {
			setFilteredData(
				_.orderBy(getFilteredArray(data, searchText), [orderBy], [orderDescending ? 'desc' : 'asc'])
			);
		}
	}, [data, searchText, orderBy, orderDescending]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					There are no location!
				</Typography>
			</motion.div>
		);
	}

	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<List className="p-0">
			<motion.div variants={container} initial="hidden" animate="show">
				{filteredData.map(todo => (
					<motion.div variants={item} key={todo.Key}>
						<TodoListItem todo={todo} />
					</motion.div>
				))}
			</motion.div>
		</List>
	);
}

export default LocationList;
