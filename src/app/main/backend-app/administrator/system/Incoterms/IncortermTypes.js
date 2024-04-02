/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import reducer from './store';
import {getIntercomList} from './store/IncotermSlice';
import { getwordsListByUrl } from '../../store/dictionarySlice';
import IncortermDialog from './IncortermDialog';
import IncortermHeader from './IncortermHeader';
import CurrencyTypeTable from './IncortermTable';

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

function IncortermTypes(props) {
	const dispatch = useDispatch();
	const [dictonaryWordsArry, setDictonaryWordsArry] = useState([]);

	// const pageLayout = useRef(null);
	// const routeParams = useParams();
	// current path
	const curretPath = window.location.pathname.toString();
	const encodedCurretPath = btoa(curretPath);

	useDeepCompareEffect(() => {
		dispatch(getIntercomList());
		dispatch(getwordsListByUrl(encodedCurretPath)).then(response => {
			setDictonaryWordsArry(response?.payload?.data);
		});
	}, [dispatch]);
	return (
		<>
			<Root header={<IncortermHeader />} content={<CurrencyTypeTable />} innerScroll />
			<IncortermDialog />
		</>
	);
}
export default withReducer('IncortermApp', reducer)(IncortermTypes);
