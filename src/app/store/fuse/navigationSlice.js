import { createSelector, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import i18next from 'i18next';
import _ from '@lodash';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getNewMenuArray = url => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${apiUrl}/loadmenu`)
			.then(response => {
				resolve(
					dispatch(
						navigationSlice.actions.setNavigation(
							response.data && response.data.Datas && response.data.Datas.length > 0
								? response.data.Datas
								: []
						)
					)
				);
			})
			.catch(error => {
				reject(error);
			});
	});
};

const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState();

const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	// navigationConfig,
	{
		setNavigation: (state, action) => {
			return action.payload;
		}
	}
);

export const appendNavigationItem = (item, parentId) => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.appendNavItem(navigation, item, parentId)));
};

export const prependNavigationItem = (item, parentId) => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.prependNavItem(navigation, item, parentId)));
};

export const updateNavigationItem = (id, item) => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.updateNavItem(navigation, id, item)));
};

export const removeNavigationItem = id => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(FuseUtils.removeNavItem(navigation, id)));
};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors(state => state.fuse.navigation);

const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation: navigationAdapter.setAll,
		resetNavigation: (state, action) => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = state => state.auth.user.role;

export const selectNavigation = createSelector(
	[selectNavigationAll, ({ i18n }) => i18n.language, getUserRole],
	(navigation, language, userRole) => {
		function setTranslationValues(data) {
			// loop through every object in the array
			return data?.map(item => {
				if (item.id) {
					item.id = `${item.id}`;
					item.icon = item?.icon ? item.icon : 'folder';
				}

				if (item.type === 'Items') {
					delete item.children;
					item.type = 'item';
					
				}
				if (item.type === 'group') {
					delete item.url;
					item.type = 'collapse';
					item.type = item?.type ? item.type : 'collapse';
				}

				if (item && i18next && i18next.language && item[i18next.language]) {
					item.en_US = item[i18next.language];
				}
				if (item.url === null) {
					item.url = '/apps/dashboards/analytics';
				}

				// see if there is a children node
				if (item.children) {
					// run this function recursively on the children array
					item.children = setTranslationValues(item.children);
				}
				return item;
			});
		}

		return setTranslationValues(
			_.merge(
				[],
				filterRecursively(navigation, item => FuseUtils.hasPermission(item.auth, userRole))
			)
		);
	}
);

function filterRecursively(arr, predicate) {
	return arr.filter(predicate).map(item => {
		item = { ...item };
		if (item.children) {
			item.children = filterRecursively(item.children, predicate);
		}
		return item;
	});
}

export const selectFlatNavigation = createSelector([selectNavigation], navigation =>
	FuseUtils.getFlatNavigation(navigation)
);

export default navigationSlice.reducer;
