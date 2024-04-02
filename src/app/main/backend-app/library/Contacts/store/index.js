import { combineReducers } from '@reduxjs/toolkit';

import currencies from 'app/main/backend-app/administrator/system/CurrencyType/store/currencyTypeSlice';
import systemJob from 'app/main/backend-app/administrator/store/systemJobtitleSlice';
import mtOffices from 'app/main/backend-app/MDL_Purchasing department/store/mtOfficeSlice';
import contacts from './contactsSlice';
import payTypes from './payTypeSlice';
import titles from './titleSlice';
import commonContactTypes from './commonContactTypeSlice';
import commonAddressTypes from './commonAdressTypeSlice';
import contact from './singleContactSlice';
import commonJobTitles from './commonJobTitleSlice';
import agreementTypes from './agreementTypeSlice';

const reducer = combineReducers({
	contacts,
	payTypes,
	contact,
	commonJobTitles,
	currencies,
	systemJob,
	mtOffices,
	titles,
	commonContactTypes,
	commonAddressTypes,
	agreementTypes
});

export default reducer;
