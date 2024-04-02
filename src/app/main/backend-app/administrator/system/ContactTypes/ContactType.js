/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import reducer from './store';
import { getContainerTypes } from './store/ContactTypesSlice';
import { getwordsListByUrl } from '../../store/dictionarySlice';
import ContactTypeDialog from './ContactTypeDialog';
import ContactTypeHeader from './ContactTypeHeader';
import ContainerTypesTable from './ContactTypesTable';

const Root = styled(FusePageCarded)(({ theme }) => ({
	'& .FusePageCarded-header': {
		minHeight: 52,
		height: 52,
		alignItems: 'center',
		[theme.breakpoints.up('sm')]: {
			minHeight: 52,
			height: 52
		}
	},
	'& .FusePageCarded-content': {
		display: 'flex'
	},
	'& .FusePageCarded-contentCard': {
		overflow: 'hidden'
	}
}));

function ContactType(props) {
	const dispatch = useDispatch();
	const [dictonaryWordsArry, setDictonaryWordsArry] = useState([]);

	const curretPath = window.location.pathname.toString();
	const encodedCurretPath = btoa(curretPath);

	useDeepCompareEffect(() => {
		dispatch(getContainerTypes());
		dispatch(getwordsListByUrl(encodedCurretPath)).then(response => {
			setDictonaryWordsArry(response?.payload?.data);
		});
	}, [dispatch]);
	return (
		<>
			<Root header={<ContactTypeHeader />} content={<ContainerTypesTable />} innerScroll />
			<ContactTypeDialog />
		</>
	);
}
export default withReducer('contactTypeApp', reducer)(ContactType);
