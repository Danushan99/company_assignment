import { createSlice } from '@reduxjs/toolkit';

const optionSlice = createSlice({
	name: 'quotationOptions',
	initialState: {
		isLoading: false,
		offerType: null,
		selectedInquiry: null,
		selectedCustomer: null,
		selectedService: null,
		options: [],
		selectedOption: null,
		selectedOptionKey: null,
		optionCount: null,
		nextOptionNo: null,
		tabArray: [],
		selectTab: null,
		selectRoute: null,
		sectors: [],
		selectedSector: '',
		selectedTariff: {},
		selectedTariffId: null,
		selectedRowsList: [],
		selectorCart: [],
		cartSummaryDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null,
			selectedId: null
		}
	},
	reducers: {
		addOfferType: (state, action) => {
			state.offerType = action.payload;
		},
		selectOfferInquiry: (state, action) => {
			state.selectedInquiry = action.payload;
		},
		selectOfferCustomer: (state, action) => {
			state.selectedCustomer = action.payload;
		},
		selectService: (state, action) => {
			state.selectedService = action.payload;
		},
		createOptionCount: (state, action) => {
			state.optionCount = action.payload;
		},
		addOption: (state, action) => {
			const newOptions = [...action.payload];
			state.options = newOptions;
		},
		removeOption: (state, action) => {
			const optionToRemove = action.payload;
			state.options = state.options.filter(option => option.optionNo !== optionToRemove);
		},
		selectOption: (state, action) => {
			state.selectedOption = action.payload;
		},
		selectNextOption: (state, action) => {
			state.nextOptionNo = action.payload;
		},
		selectOptionkey: (state, action) => {
			state.selectedOptionKey = action.payload;
		},
		updateTabArray: (state, action) => {
			state.tabArray = action.payload;
		},
		clearAllOptions: state => {
			state.options = [];
		},
		removeTab: (state, action) => {
			const tabIndexToRemove = action.payload;
			state.tabArray = state.tabArray.filter((_, index) => index !== tabIndexToRemove);
		},
		selectorTab: (state, action) => {
			state.selectTab = action.payload;
		},
		selectorRoute: (state, action) => {
			state.selectRoute = action.payload;
		},
		addSector: (state, action) => {
			// Add the new sectors to the existing sectors array
			state.sectors = action.payload;
		},
		clearAllSelectors: state => {
			state.sectors = [];
		},
		selectSector: (state, action) => {
			state.selectedSector = action.payload;
		},
		selectTariff: (state, action) => {
			state.selectedTariff = action.payload;
		},

		selectTariffID: (state, action) => {
			state.selectedTariffId = action.payload;
		},
		addNewRow: (state, action) => {
			const newRow = [...action.payload];
			state.selectedRowsList = newRow;
		},
		removeRow: (state, action) => {
			const itemToRemove = action.payload;
			state.selectedRowsList = state.selectedRowsList.filter(item => item !== itemToRemove);
		},
		removeSelectedRows: (state, action) => {
			state.selectedRowsList = [];
		},
		addSelectorItem: (state, action) => {
			const { offerType, optionNo, selectorNo, routeNo, tId, item, totalSellAmount, sellitems } = action.payload;

			const itemInCart = state.selectorCart.find(
				itemVal =>
					itemVal.offerTypeId === offerType &&
					itemVal.option === optionNo &&
					itemVal.route === routeNo &&
					itemVal.sector === selectorNo &&
					itemVal.id === tId
			);

			// const itemInCart = state.selectorCart.find(itemVal => itemVal.id === tId);
			if (itemInCart) {
				null;
			} else {
				state.selectorCart.push({
					offerTypeId: offerType,
					option: optionNo,
					route: routeNo,
					sector: selectorNo,
					id: tId, // tariffId
					itemData: item,
					sellTotal: totalSellAmount,
					debitAmount: sellitems // debit item array
				});
			}
		},
		updateSelectorItem: (state, action) => {
			const { offerType, optionNo, selectorNo, routeNo, tId, totalSellAmount, sellitems } = action.payload;

			if (totalSellAmount === undefined || totalSellAmount === 0) {
				// Total sell amount is undefined or zero, don't update the item in the cart
				// toast.error('Total sell amount is zero. Item not updated in the cart. Please Update item price', {
				// 	position: toast.POSITION.TOP_CENTER,
				// 	autoClose: 4000
				// });
				// console.log('Total sell amount is undefined or zero. Item not updated in the cart.');
				return;
			}

			const indexToUpdate = state.selectorCart.findIndex(
				item =>
					item.offerTypeId === offerType &&
					item.option === optionNo &&
					item.route === routeNo &&
					item.sector === selectorNo &&
					item.id === tId
			);

			if (indexToUpdate !== -1) {
				const updatedItem = {
					...state.selectorCart[indexToUpdate],
					sellTotal: totalSellAmount,
					debitAmount: sellitems
				};

				state.selectorCart[indexToUpdate] = updatedItem;
			}
		},
		removeSelectorItem: (state, action) => {
			const { offerType, optionName, routeNo, selectorName, removeItemId } = action.payload;

			const removeItem = state.selectorCart.filter(
				itemVal =>
					itemVal.offerTypeId === offerType &&
					itemVal.option === optionName &&
					itemVal.route === routeNo &&
					itemVal.sector === selectorName &&
					itemVal.id !== removeItemId
			);

			state.selectorCart = removeItem;
		},
		clearSelectorCart: state => {
			state.selectorCart = [];
		},

		// open dialog when click
		OpenCartSummaryDialog: (state, action) => {
			state.cartSummaryDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null,
				selectedId: action.payload
			};
		},
		// close dialog when create new
		closeCartSummaryDialog: (state, action) => {
			state.cartSummaryDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null,
				selectedId: null
			};
		},
		isLoadingForm: (state, action) => {
			state.isLoading = action.payload;
		}
	}
});

export const {
	addOfferType,
	selectOfferInquiry,
	selectOfferCustomer,
	selectService,
	createOptionCount,
	addOption,
	removeOption,
	selectOption,
	selectNextOption,
	selectOptionkey,
	clearAllOptions,
	updateTabArray,
	removeTab,
	selectorTab,
	selectorRoute,
	addSector,
	clearAllSelectors,
	selectSector,
	selectTariff,
	selectTariffID,
	addNewRow,
	removeRow,
	removeSelectedRows,
	addSelectorItem,
	updateSelectorItem,
	removeSelectorItem,
	clearSelectorCart,
	OpenCartSummaryDialog,
	closeCartSummaryDialog,
	isLoadingForm
} = optionSlice.actions;

export default optionSlice.reducer;
