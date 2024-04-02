/* eslint-disable import/no-extraneous-dependencies */
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import reducer from './store';
import TodoDialog from './LocationDialog';
import LocationHeader from './LocationHeader';
import { getCountrylist } from './store/loardCountrySlice';
import LocationTable from './LocationTable';
import { getLocations } from './store/todosSlice';
import { getwordsListByLocationUrl } from '../../administrator/store/dictionarySlice';
import { getCitylist } from './store/loardCitySlice';
import { getPortList } from './store/loardPortSlice';
import { getTerminallist } from './store/loardTerminalSlice';

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

function LocationApp(props) {
	const {
		isLoadingAnotherSection,
		setOpenLocationModel,
		setSelectedLoactionKey,
		openrouteorigin,
		setHBLSettlementAt,
		setSelectedLoactionKeyfororigin,
		setrouteorigin,
		setOpenLocationModelfororigin,
		openbasicinfolocation,
		setOpenLocationModelfordestination,
		setroutedestination,
		setSelectedLoactionKeyfordestination,
		openroutedestination,
		openCountryModel,
		showCountry,
		setSelectedCountry,
		setOpenCountryModel
	} = props;

	const dispatch = useDispatch();

	const allLocations = useSelector(({ todoApp }) => todoApp.todos.all);
	const pageLayout = useRef(null);
	const isLoadingAnotherPage = isLoadingAnotherSection || false;

	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const curretPath = window.location.pathname.toString();
		const encodedCurretPath = btoa(curretPath);
		dispatch(getwordsListByLocationUrl(encodedCurretPath));
	}, [dispatch]);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(getTerminallist());
			dispatch(getPortList());
			dispatch(getCitylist());
			dispatch(getCountrylist());
		};
		fetchData();
	}, [dispatch]);

	useEffect(() => {
		if (!allLocations || allLocations?.length === 0) {
			dispatch(getLocations()).then(res => {
				if (res?.payload) {
					setLoading(false);
				}
			});
		} else {
			setLoading(false);
		}
	}, [dispatch, allLocations]);

	if (loading) {
		return <FuseLoading />;
	}
	return (
		<>
			<Root
				header={<LocationHeader pageLayout={pageLayout} isLoadingAnotherPage={isLoadingAnotherPage} />}
				content={
					<LocationTable
						isLoadingAnotherPage={isLoadingAnotherPage}
						setSelectedLoactionKey={setSelectedLoactionKey}
						setHBLSettlementAt={setHBLSettlementAt}
						setOpenLocationModel={setOpenLocationModel}
						openbasicinfolocation={openbasicinfolocation}
						setSelectedLoactionKeyfororigin={setSelectedLoactionKeyfororigin}
						setrouteorigin={setrouteorigin}
						setOpenLocationModelfororigin={setOpenLocationModelfororigin}
						openrouteorigin={openrouteorigin}
						setOpenLocationModelfordestination={setOpenLocationModelfordestination}
						setroutedestination={setroutedestination}
						setSelectedLoactionKeyfordestination={setSelectedLoactionKeyfordestination}
						openroutedestination={openroutedestination}
						openCountryModel={openCountryModel}
						showCountry={showCountry}
						setSelectedCountry={setSelectedCountry}
						setOpenCountryModel={setOpenCountryModel}
					/>
				}
				ref={pageLayout}
				innerScroll
			/>
			<TodoDialog />
		</>
	);
}

// Wrap your component with React.memo
const MemoizedLocationApp = React.memo(LocationApp);
export default withReducer('todoApp', reducer)(MemoizedLocationApp);
