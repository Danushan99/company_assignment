/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import ChartofAccountList from './ChartofAccountList';
import reducer from './store';
import {
	getChartOfAccountList,
	selectChartOfAccounts,
	setChartOfAccountSearchText,
	OpenNewchartOfAccountDialog
} from './store/chartOfAccountSlice';
import ChartOfAccountDialog from './ChartOfAccountDialog';
import { getwordsListByUrl } from '../../administrator/store/dictionarySlice';

const Root = styled('div')(({ theme }) => ({
	'& .FaqPage-header': {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText,
		minHeight: 72,
		height: 72,
		[theme.breakpoints.up('lg')]: {
			minHeight: 136,
			height: 136
		}
	},

	'& .FaqPage-panel': {
		margin: 0,
		border: 'none',
		'&:before': {
			display: 'none'
		},
		'&:first-of-type': {
			borderRadius: '20px 20px 0 0'
		},
		'&:last-of-type': {
			borderRadius: '0 0 20px 20px'
		},

		'&.Mui-expanded': {
			margin: 'auto'
		}
	}
}));

function ChartofAcoount() {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	// current path
	const curretPath = window.location.pathname.toString();
	const encodedCurretPath = btoa(curretPath);

	const routeParams = useParams();
	const [dictonaryWordsArry, setDictonaryWordsArry] = useState([]);

	useDeepCompareEffect(() => {
		dispatch(getChartOfAccountList(routeParams));
		dispatch(getwordsListByUrl(encodedCurretPath)).then(response => {
			setDictonaryWordsArry(response?.payload?.data);
		});
	}, [dispatch, routeParams, encodedCurretPath]);

	const chartOfAccountList = useSelector(selectChartOfAccounts);
	const searchText = useSelector(({ chartOfAccountApp }) => chartOfAccountApp.accounts.searchText);
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(chartOfAccountList);

	useEffect(() => {
		dispatch(getChartOfAccountList()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(filterBy(chartOfAccountList, searchText));
		} else {
			setData(chartOfAccountList);
		}
	}, [chartOfAccountList, searchText]);

	if (loading) {
		return <FuseLoading />;
	}

	function filterBy(arr, query) {
		return query
			? arr.reduce((acc, item) => {
					if (item.children?.length) {
						const filtered = filterBy(item.children, query);
						if (filtered.length) return [...acc, { ...item, children: filtered }];
					}

					const { children, ...itemWithoutChildren } = item;
					if (currentLanguageId === 'rus') {
						return item.rus?.toUpperCase().includes(query.toUpperCase())
							? [...acc, itemWithoutChildren]
							: acc;
					}
					return item.en_US?.toUpperCase().includes(query.toUpperCase())
						? [...acc, itemWithoutChildren]
						: acc;
			  }, [])
			: arr;
	}

	function findByKey(arr, findVal) {
		if (arr?.length > 0) {
			const found = arr?.find(obj => {
				return obj.headerKey === findVal;
			});
			return found;
		}
		return '';
	}

	// common words translater
	const searchInputText = findByKey(commonTranslateWordsArray, 'SEARCH_TEXT');
	// page words translater
	const rootBtn = findByKey(dictonaryWordsArry, 'ROOT_BTN');
	const errorMsgForEmptyResult = findByKey(dictonaryWordsArry, 'ERROR_MSG_EMPTY_RESULT');

	return (
		<Root className="w-full flex flex-col flex-auto">
			<div className="FaqPage-header flex flex-col shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360">
				<Grid container spacing={3}>
					<Grid item xs>
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
						/>
					</Grid>
					<Grid item xs={6}>
						<Paper className="flex shrink-0 items-center h-56 w-full max-w-md mt-16 sm:mt-32 rounded-16 shadow">
							<Icon color="action" className="mx-16">
								search
							</Icon>
							<Input
								placeholder={
									currentLanguageId === 'en'
										? searchInputText?.en_US
										: currentLanguageId === 'rus'
										? searchInputText?.rus
										: t('SEARCH_LABLE')
								}
								className=""
								disableUnderline
								fullWidth
								inputProps={{
									'aria-label': 'Search'
								}}
								value={searchText}
								onChange={ev => dispatch(setChartOfAccountSearchText(ev))}
							/>
						</Paper>
					</Grid>
					<Grid item xs>
						<motion.div
							initial={{ opacity: 0, x: 20, paddingTop: 30 }}
							animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
						>
							<Button
								onClick={() => {
									dispatch(OpenNewchartOfAccountDialog(0));
								}}
								className="whitespace-nowrap"
								variant="contained"
								color="secondary"
							>
								{currentLanguageId === 'en' && (
									<span className="hidden sm:flex">
										{rootBtn ? rootBtn?.en_US : t('ADD_TO_ROOT')}
									</span>
								)}
								{currentLanguageId === 'rus' && (
									<span className="hidden sm:flex">{rootBtn ? rootBtn?.rus : t('ADD_TO_ROOT')}</span>
								)}
							</Button>
						</motion.div>
					</Grid>
				</Grid>
			</div>
			<div>
				{data?.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.1 } }}
						className="flex flex-1 items-center justify-center h-full"
					>
						<Typography color="textSecondary" variant="h5">
							{currentLanguageId === 'en'
								? errorMsgForEmptyResult?.en_US
								: currentLanguageId === 'rus'
								? errorMsgForEmptyResult?.rus
								: t('ERROR_MSG_EMPTY_RESULT')}
						</Typography>
					</motion.div>
				)}

				<ChartofAccountList filterdata={data} />
				<ChartOfAccountDialog />
			</div>
		</Root>
	);
}
export default withReducer('chartOfAccountApp', reducer)(ChartofAcoount);
