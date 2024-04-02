/* eslint-disable react/jsx-no-bind */
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import _ from '@lodash';
import Tab from '@mui/material/Tab';
import { saveUser } from '../../store/systemUserSlice';

function UserHeader(props) {
	const { selectedImage } = props;
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const methods = useFormContext();
	const { formState, watch, getValues } = methods;
	// const  username = getValues()
	// console.log('username',username)
	// console.log('getValues',getValues())
	// console.log('getValuesavater',getValues("avatar"))
	// const username = userdata.map((n) => n.UserName);
	//console.log('getValues', getValues());
	// const { isValid, dirtyFields } = formState;
	//  console.log('dirtyFields', dirtyFields)
	const theme = useTheme();
	// const navigate = useNavigate();

	function handleSaveUser() {
		const userData =  {
			companyId:getValues("companyId"),
			title:getValues("title"),
			CompanyName:getValues("CompanyName"),
			dob: getValues("dob"),
			pob:getValues("pob"),
			perAddress:getValues("pob"),
			prsAddress: getValues("pob"),
			email: getValues("pob"),
			drivLicenNo: getValues("pob"),
			fname: getValues("pob"),
			placeofbirth: getValues("pob"),
			telephoneno:getValues("pob"),
			mariStatus:getValues("pob"),
			uname:getValues("pob"),
			mname: getValues("pob"),
			gender: getValues("pob"),
			mobiNo: getValues("pob"),
			nicNo:getValues("pob"),
			telNo:getValues("pob"),
			pws:getValues("pob"),
			lname:getValues("pob"),
			nationality:getValues("pob"),
			comment:getValues("pob"),
			crimeOff:getValues("pob"),
			avatar:getValues("pob"),
			famillyMember:[]
		};



		// console.log('selectedImage-header', selectedImage)
		// console.log('userData--handleSaveUser', userData)
		dispatch(saveUser(getValues()));
	}

	// function handleRemoveUser() {
	//   dispatch(removeUser()).then(() => {
	//     navigate('/apps/e-commerce/products');
	//   });
	// }

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/e-commerce/products"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium"> {t('USERS')}</span>
					</Typography>
				</motion.div>

				{/* <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {images.length > 0 && featuredImageId ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={_.find(images, { id: featuredImageId }).url}
                alt={name}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/ecommerce/product-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className="text-16 sm:text-20 truncate font-semibold">
                {name || 'New Product'}
              </Typography>
              <Typography variant="caption" className="font-medium">
                Product Detail
              </Typography>
            </motion.div>
          </div>
        </div> */}
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				{/* <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveUser}
          startIcon={<Icon className="hidden sm:flex">delete</Icon>}
          size="small"
        >
        //test
          Remove
        </Button> */}
				{/*<Button*/}
				{/*	className="whitespace-nowrap mx-4"*/}
				{/*	variant="contained"*/}
				{/*	color="secondary"*/}
				{/*	// disabled={!isValid}*/}
				{/*	onClick={handleSaveUser}*/}
				{/*	size="small"*/}
				{/*>*/}
				{/*	Save*/}
				{/*</Button>*/}
			</motion.div>
		</div>
	);
}

export default UserHeader;
