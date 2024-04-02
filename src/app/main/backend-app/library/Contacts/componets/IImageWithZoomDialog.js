/* eslint-disable jsx-a11y/img-redundant-alt */
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogTitle, Input, FormControlLabel, Checkbox, Select } from '@mui/material';

const IImageWithZoomDialog = props => {
	const { openZoomDialog, imageUrl, handleCloseZoomImage } = props;
	return (
		<Dialog open={openZoomDialog} onClose={handleCloseZoomImage}>
			<DialogContent>
				<img src={imageUrl} alt="Zoomed Image" style={{ maxWidth: '100%' }} />
			</DialogContent>
		</Dialog>
	);
};

export default IImageWithZoomDialog;
