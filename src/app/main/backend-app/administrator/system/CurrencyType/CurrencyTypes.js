/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import reducer from './store';
import { getCurrencyTypeList } from './store/currencyTypeSlice';
import { getwordsListByUrl } from '../../store/dictionarySlice';
import CurrencyTypeDialog from './CurrencyTypeDialog';
import CurrencyTypeHeader from './CurrencyTypeHeader';
import CurrencyTypeTable from './CurrencyTypeTable';

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

function CurrencyTypes(props) {
	const dispatch = useDispatch();
	const [dictonaryWordsArry, setDictonaryWordsArry] = useState([]);

	// const pageLayout = useRef(null);
	// const routeParams = useParams();
	// current path
	const curretPath = window.location.pathname.toString();
	const encodedCurretPath = btoa(curretPath);

	useDeepCompareEffect(() => {
		dispatch(getCurrencyTypeList());
		dispatch(getwordsListByUrl(encodedCurretPath)).then(response => {
			setDictonaryWordsArry(response?.payload?.data);
		});
	}, [dispatch]);
	return (
		<>
			<Root header={<CurrencyTypeHeader />} content={<CurrencyTypeTable />} innerScroll />
			<CurrencyTypeDialog />
		</>
	);
}
export default withReducer('currencyTypeApp', reducer)(CurrencyTypes);
