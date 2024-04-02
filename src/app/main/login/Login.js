import Card from '@mui/material/Card';
import { styled, darken } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import JWTLoginTab from './tabs/JWTLoginTab';
import LanguageSwitcher from '../../fuse-layouts/shared-components/LanguageSwitcher';

const Root = styled('div')(({ theme }) => ({
	background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
		theme.palette.primary.dark,
		0.5
	)} 100%)`,
	color: theme.palette.primary.contrastText,

	'& .Login-leftSection': {},

	'& .Login-rightSection': {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Login() {
	const { t } = useTranslation();
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
			<motion.div
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
			>
				<Card
					className="Login-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
					square
				>
					<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
							<div className="flex items-center mb-48">
								<img className="logo-icon w-48" src="assets/images/logos/tesing.png" alt="logo" />
								<div className="border-l-1 mr-4 w-1 h-40" />
								<div>
									<Typography className="text-24 font-semibold logo-text" color="inherit">
										TEST 2024
									</Typography>
								</div>
							</div>
						</motion.div>

						{selectedTab === 0 && <JWTLoginTab />}
						
					</CardContent>

					<div className="flex flex-col items-center justify-center pb-32">
						<div>
							<LanguageSwitcher />
						</div>
					</div>
				</Card>

				<div className="Login-rightSection hidden md:flex flex-1 items-center justify-center p-64">
					<div className="max-w-320">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
						>
							<Typography variant="h3" color="inherit" className="font-semibold leading-tight">
								{t('Welcome')}
								<br />
								Practical Test 2024
							</Typography>
						</motion.div>

						
					</div>
				</div>
			</motion.div>
		</Root>
	);
}

export default Login;
