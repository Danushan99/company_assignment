/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import reducer from './store';
import { getExchangeRateList, selectExchangeRates } from './store/exchangeRateSlice';
import { getwordsListByUrl } from '../../administrator/store/dictionarySlice';
import ExchangeRateDialog from './ExchangeRateDialog';
import ExchangeRateHeader from './ExchangeRateHeader';
import ExchangeRatesTable from './ExchangeRatesTable';

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

function ExchangeRate(props) {
	const dispatch = useDispatch();
	const exchangeRates = useSelector(selectExchangeRates);

	const [dictonaryWordsArry, setDictonaryWordsArry] = useState([]);
	const [data, setData] = useState(exchangeRates);

	const curretPath = window.location.pathname.toString();
	const encodedCurretPath = btoa(curretPath);
	// const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getExchangeRateList(routeParams)).then(response => {
			setData(response?.payload?.data);
		});
		dispatch(getwordsListByUrl(encodedCurretPath)).then(response => {
			setDictonaryWordsArry(response?.payload?.data);
		});
	}, [dispatch, data, routeParams]);

	return (
		<>
			<Root
				header={<ExchangeRateHeader />}
				content={<ExchangeRatesTable setData={setData} data={data} />}
				innerScroll
			/>
			<ExchangeRateDialog setData={setData} data={data} />
		</>
	);
}
export default withReducer('exchangeRateApp', reducer)(ExchangeRate);
