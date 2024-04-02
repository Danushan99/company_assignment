import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import {setSearchText,  OpenNewIntercomeDialog} from './store/IncotermSlice';

function IncortermHeader(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const wordsList = useSelector(({ words }) => words.list);
	const commonTranslateWordsArray = useSelector(({ allWords }) => allWords.allList);
	const searchText = useSelector(({ IncortermApp }) => IncortermApp.incorterms.searchText);
	const mainTheme = useSelector(selectMainTheme);

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
	const addNewBtn = findByKey(wordsList, 'ADD_NEW_BTN');
	const pageHeader = findByKey(wordsList, 'PAGE_HEADER');

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Typography
					component={motion.span}
					initial={{ x: -20 }}
					animate={{ x: 0, transition: { delay: 0.2 } }}
					delay={300}
					className="hidden sm:flex text-12 md:text-16 mx-12 font-semibold"
				>
					{currentLanguageId === 'en'
						? pageHeader?.en_US
						: currentLanguageId === 'rus'
						? pageHeader?.rus
						: t('INTERCOM')}
				</Typography>
			</div>
			<div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<Paper
						component={motion.div}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
						className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
					>
						<Icon color="action">search</Icon>

						<Input
							placeholder={
								currentLanguageId === 'en'
									? searchInputText?.en_US
									: currentLanguageId === 'rus'
									? searchInputText?.rus
									: t('SEARCH_LABLE')
							}
							className="flex flex-1 mx-8"
							disableUnderline
							fullWidth
							value={searchText}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={ev => dispatch(setSearchText(ev))}
						/>
					</Paper>
				</ThemeProvider>
			</div>
			<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
				<Button
					onClick={() => {
						dispatch(OpenNewIntercomeDialog());
					}}
					className="whitespace-nowrap"
					variant="contained"
					color="secondary"
				>
					{currentLanguageId === 'en' && (
						<span className="hidden sm:flex">{addNewBtn ? addNewBtn?.en_US : t('ADD_NEW')}</span>
					)}
					{currentLanguageId === 'rus' && (
						<span className="hidden sm:flex">{addNewBtn ? addNewBtn?.rus : t('ADD_NEW')}</span>
					)}
				</Button>
			</motion.div>
		</div>
	);
}

export default IncortermHeader;
