/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web';
import IconButton from '@mui/material/IconButton';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useDispatch, useSelector } from 'react-redux';
import { openEditLanguageDialog } from './store/languageSlice';
import DeleteReasonDialog from './DeleteReasonDialog';

function MinusSquare(props) {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
		</SvgIcon>
	);
}

function PlusSquare(props) {
	return (
		<SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
		</SvgIcon>
	);
}

function CloseSquare(props) {
	return (
		<SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
			{/* tslint:disable-next-line: max-line-length */}
			<path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
		</SvgIcon>
	);
}

function TransitionComponent(props) {
	const style = useSpring({
		from: {
			opacity: 0,
			transform: 'translate3d(20px,0,0)'
		},
		to: {
			opacity: props.in ? 1 : 0,
			transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
		}
	});

	return (
		<animated.div style={style}>
			<Collapse {...props} />
		</animated.div>
	);
}

TransitionComponent.propTypes = {
	/**
	 * Show the component; triggers the enter or exit states
	 */
	in: PropTypes.bool
};

const StyledTreeItem = styled(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />)(
	({ theme }) => ({
		[`& .${treeItemClasses.iconContainer}`]: {
			'& .close': {
				opacity: 0.3
			}
		},
		[`& .${treeItemClasses.group}`]: {
			marginLeft: 15,
			paddingLeft: 18,
			borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
		}
	})
);

const renderTree = nodes => (
	<StyledTreeItem
		key={nodes.LetterID}
		nodeId={nodes.LetterID.toString()}
		label={nodes.en_US}
		sx={{ padding: '10px', fontSize: '100px' }}
	>
		{Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
	</StyledTreeItem>
);

export default function Language(props) {
	const dispatch = useDispatch();

	const filteredData = props.filterdata;
	const [selectedIds, setSelectedIds] = useState(null);
	const [openDeleteReasonDialog, setOpenDeleteReasonDialog] = useState(false);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);

	useEffect(() => {
		setSelectedIds(selectedIds);
	}, [selectedIds]);

	const handleEdit = data => {
		dispatch(openEditLanguageDialog(data, data?.parentID));
	};

	/**
	 *  Open delete confimation Dialog
	 */
	// const handleClickDeleteConfirmationOpen = (ev, id) => {
	// 	ev.preventDefault();
	// 	setOpenDeleteReasonDialog(true);
	// 	setSelectedIds(id);
	// };

	const renderTree = nodes => (
		<StyledTreeItem
			key={nodes.LetterID}
			nodeId={String(nodes.LetterID)}
			label={
				<div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', padding: '10px' }}>
					{currentLanguageId === 'rus' && <div style={{ flex: 1 }}>{`${nodes.rus}`}</div>}
					{currentLanguageId === 'en' && <div style={{ flex: 1 }}>{`${nodes.en_US}`}</div>}

					{/* <IconButton
						aria-label="add"
						size="small"
						onClick={event => {
							event.stopPropagation();
							handleAdd(nodes);
						}}
					>
						<AddOutlinedIcon fontSize="small" />
					</IconButton> */}
					<IconButton
						aria-label="edit"
						size="small"
						onClick={event => {
							event.preventDefault();
							handleEdit(nodes);
						}}
					>
						<EditOutlinedIcon fontSize="small" />
					</IconButton>
					{/* <IconButton
						aria-label="delete"
						size="small"
						onClick={event => {
							handleClickDeleteConfirmationOpen(event, nodes.LetterID);
						}}
					>
						<DeleteOutlineOutlinedIcon fontSize="small" />
					</IconButton> */}
				</div>
			}
		>
			{Array.isArray(nodes.children) ? nodes.children.map(node => renderTree(node)) : null}
		</StyledTreeItem>
	);

	return (
		<>
			<DeleteReasonDialog
				selectedIds={selectedIds}
				openDeleteReasonDialog={openDeleteReasonDialog}
				setOpenDeleteReasonDialog={setOpenDeleteReasonDialog}
			/>
			<TreeView
				aria-label="customized"
				defaultCollapseIcon={<MinusSquare />}
				defaultExpandIcon={<PlusSquare />}
				defaultEndIcon={<CloseSquare />}
			>
				{filteredData.map(data => renderTree(data))}
			</TreeView>
		</>
	);
}
