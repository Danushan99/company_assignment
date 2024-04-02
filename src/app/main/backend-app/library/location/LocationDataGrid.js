/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridPagination } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { selectLocations } from './store/locationSlice';
import { selectTodos } from './store/todosSlice';

const rows = [
	{
		id: 'AFGHANISTAN',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	},
	{
		id: 'ALBANIA',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	},
	{
		id: 'ANGOLA',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	},
	{
		id: 'ARGENTINA',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	},
	{
		id: 'ARMENI',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	},
	{
		id: 'AUSTRALIA',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	},
	{
		id: 'AUSTRALIA',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	},
	{
		id: 'AUSTRALIA',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	},
	{
		id: 'AUSTRALIA',
		lastName: 'ANG',
		firstName: 'HAIRATAN',
		age: 'HIT',
		portname: 'LUANDA',
		portcode: 'ANG',
		terminalname: 'null',
		terminalcode: '1234'
	}
];

export default function DataGridDemo() {
	const locations = useSelector(selectTodos);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.locationsWordsList);
	const locationdata = locations && locations[0];

	function findByKey(arr, findVal) {
		if (arr?.length > 0) {
			const found = arr?.find(obj => {
				return obj.headerKey === findVal;
			});
			return found;
		}
		return '';
	}
	const countryText = findByKey(wordsList, 'COUNTRY_TEXT');
	const cityText = findByKey(wordsList, 'CITY_TEXT');
	const portText = findByKey(wordsList, 'PORT_TEXT');
	const terminalText = findByKey(wordsList, 'TERMINAL_TEXT');

	const pageRowsTitle1 = findByKey(wordsList, 'ROW_PAGE_TITLE');

	const countryTitle =
		currentLanguageId === 'en' ? countryText?.en_US : currentLanguageId === 'rus' ? countryText?.rus : 'Country';

	const cityTitle =
		currentLanguageId === 'en' ? cityText?.en_US : currentLanguageId === 'rus' ? cityText?.rus : 'City';

	const portTitle =
		currentLanguageId === 'en' ? portText?.en_US : currentLanguageId === 'rus' ? portText?.rus : 'Port';

	const terminalTitle =
		currentLanguageId === 'en' ? terminalText?.en_US : currentLanguageId === 'rus' ? terminalText?.rus : 'Terminal';

	const columns = [
		// { field: 'id', headerName: 'Country Name', width: 110 },
		{
			field: countryTitle,
			headerName: countryTitle,
			width: 210
			// editable: true,
		},
		{
			field: cityTitle,
			headerName: cityTitle,
			width: 210
			// editable: true,
		},
		{
			field: portTitle,
			headerName: portTitle,
			type: 'number',
			width: 210
			// editable: true,
		},
		{
			field: terminalTitle,
			headerName: terminalTitle,
			type: 'number',
			width: 210
			// editable: true,
		}
	];

	const datarows = locationdata
		? locationdata.map(location => ({
				id: location.Key,
				Country: location.Country,
				City: location.City,
				Ports: location.Ports,
				Terminal: location.Terminal
		  }))
		: [];

	return (
		<Box sx={{ height: 400, width: '100%' }}>
			<DataGrid rows={datarows} columns={columns} autoPageSize />
		</Box>
	);
}
