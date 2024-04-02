import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitLoginAction } from 'app/auth/store/loginSlice';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import _ from '@lodash';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	userName: yup
		.string()
		.required('You must enter your username')
		.matches(/^[0-9a-z._]+$/, 'Username must contain lowercase and  `.`'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(3, 'Password is too short - should be 3 chars minimum.')
});

const defaultValues = {
	userName: '',
	password: ''
};

function JWTLoginTab(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);
	const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const [showPassword, setShowPassword] = useState(false);

	
	useEffect(() => {
		login.errors.forEach(error => {
			setError(error.type, {
				type: 'manual',
				message: error.message
			});
		});
	}, [login.errors, setError]);

	function onSubmit(data) {
		const userData = {
			UserName: data.userName.trim(),
			pw: data.password.trim()
		};
		dispatch(submitLoginAction(userData));
	}

	

	return (
		<div className="w-full">
			<form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="userName"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							error={!!errors.userName}
							helperText={errors?.userName?.message}
							label={t('Username')}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											<AccountCircleIcon />
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							label={t('Password')}
							type="password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							variant="outlined"
							InputProps={{
								className: 'pr-2',
								type: showPassword ? 'text' : 'password',
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={() => setShowPassword(!showPassword)} size="large">
											<Icon className="text-20" color="action">
												{showPassword ? 'visibility' : 'visibility_off'}
											</Icon>
										</IconButton>
									</InputAdornment>
								)
							}}
							required
						/>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="LOG IN"
					disabled={!isValid}
					
					value="legacy"
				>
					Login
				</Button>
			</form>
		</div>
	);
}

export default JWTLoginTab;
