import _ from '@lodash';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';

function ConfirmationDialog(props) {
	const { openDeleteConfirmationDialog, selectedIds, setOpenDeleteConfirmationDialog, dispatchDeleteFunction } =
		props;

	const dispatch = useDispatch();

	/**
	 * Close Dialog
	 */
	const handleClose = () => {
		setOpenDeleteConfirmationDialog(false);
	};

	const handleOk = () => {
		dispatchDeleteFunction();
		
	};

	return (
		<Dialog open={openDeleteConfirmationDialog} fullWidth maxWidth="sm" scroll="body">
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Confirmation for delete
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }}>
				<div className="px-16 sm:px-24">
					<Grid container>
						<Grid item xs={12} sx={{ marginTop: '12px' }}>
							<DialogContentText id="alert-dialog-confirmation-description">
								Are you sure you want to delete this record?
							</DialogContentText>
						</Grid>
					</Grid>
				</div>
			</DialogContent>

			<DialogActions className="justify-between px-8 py-16">
				<DialogActions className="justify-between px-8 py-16">
					<div className="px-16">
						<Button type="button" variant="contained" color="secondary" onClick={ev => handleOk(ev)}>
							Ok
						</Button>
					</div>
					<Button type="button" variant="contained" onClick={() => handleClose()}>
						Close
					</Button>
				</DialogActions>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmationDialog;
