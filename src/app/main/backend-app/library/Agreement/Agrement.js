/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/material/styles';
import reducer from './store';
import { getAgreementList } from './store/agrementSlice';
import { getwordsListByUrl } from '../../administrator/store/dictionarySlice';
import AgrementHeader from './AgrementHeader';
import AgrementTable from './AgrementTable';

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

function Agrement(props) {
	const { agrimentfiledclick, subvendorcode, setSelectedAgreementItem, setOpenAgreement } = props;
	const dispatch = useDispatch();
	// const agreements = useSelector(selectAgreements);
	const allAgreementsList = useSelector(({ agreementApp }) => agreementApp.agreements.all);

	const [dictonaryWordsArry, setDictonaryWordsArry] = useState([]);
	const [data, setData] = useState(allAgreementsList);
	const [loading, setLoading] = useState(true);

	const curretPath = window.location.pathname.toString();
	const encodedCurretPath = btoa(curretPath);

	useDeepCompareEffect(() => {
		dispatch(getwordsListByUrl(encodedCurretPath)).then(response => {
			setDictonaryWordsArry(response?.payload?.data);
		});
	}, [dispatch, encodedCurretPath]);

	useEffect(() => {
		if (!allAgreementsList || allAgreementsList?.length === 0) {
			const paramsData = {
				limits: 100,
				offsets: 1
			};
			dispatch(getAgreementList({ params: paramsData })).then(res => {
				setData(res?.payload?.data?.rows);
				setLoading(false);
			});
		} else {
			// If Agreement data is already available, apply search filtering directly
			setData(allAgreementsList);
			setLoading(false);
		}
	}, [dispatch, allAgreementsList]);

	return (
		<>
			<Root
				header={<AgrementHeader />}
				content={
					<AgrementTable
						agrimentfiledclick={agrimentfiledclick}
						subvendorcode={subvendorcode}
						setSelectedAgreementItem={setSelectedAgreementItem}
						setOpenAgreement={setOpenAgreement}
						dataList={data}
					/>
				}
				innerScroll
			/>
		</>
	);
}
export default withReducer('agreementApp', reducer)(Agrement);
