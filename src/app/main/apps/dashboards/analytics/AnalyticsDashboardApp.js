
import withReducer from 'app/store/withReducer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';

import reducer from '../../../backend-app/administrator/store/index';

function AnalyticsDashboardApp() {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const user = useSelector(({ auth }) => auth.user);
  
	return (
		<div className="w-full">
			<center>
				<h1>Hi {user.data.displayName}</h1>
			</center>
	
		</div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
