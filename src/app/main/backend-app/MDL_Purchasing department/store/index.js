import { combineReducers } from '@reduxjs/toolkit';
//import tariffs from './tarrifSlice';
//import getalltariffs from './alltarrifSlice';
//import serviceProviders from './serviceProviderSlice';
import services from './serviceSlice';
//import validityTypes from './tariffValidityTypeSlice';
import masterUnits from './masterUnitSlice';
import countries from './countrySlice';
import cities from './citySlice';
import ports from './portSlice';
import terminals from './terminalSlice';
import interComs from './interComSlice';
//import freeTypes from './freeTypesSlice';
import mtOffices from './mtOfficeSlice';
//import paymentTermTypes from './paymentTermTypeSlice';
import todayExRate from './todayExchangeRateSlice';
import serviceComponets from './servicesComponentsSlice';
//import singleTariff from './singleTariffSlice';
//import tarrifEdite from './tarrifEditeSlice'
//import requests from './requestTariffSlice';
//import pendingTariff from './pendingTariffSlice';

// common new
import commonMasterUnits from './commonMasterUnitSlice';

const reducer = combineReducers({
	//tariffs,
	//getalltariffs,
	//serviceProviders,
	services,
	//validityTypes,
	masterUnits,
	countries,
	cities,
	ports,
	terminals,
	interComs,
	//freeTypes,
	mtOffices,
	//paymentTermTypes,
	todayExRate,
	serviceComponets,
	//singleTariff,
	//tarrifEdite,
	//requests,
	//pendingTariff,

	commonMasterUnits
});

export default reducer;
