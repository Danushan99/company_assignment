import { useState, forwardRef } from 'react';
import { styled } from '@mui/material/styles';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import clsx from 'clsx';
import BasicTable from '../main/backend-app/administrator/system/user/components/basicTable';
import htmlToDraft from 'html-to-draftjs';

const html = `
  <h4 style="color:red;border:1px solid black;">Dear Sir,<BR/><BR/>Please find our Updated Monthly Rates for 2024 - February</h4><BR/>
  <h5>Mega Trend Group of Companies</h5><br/>
  <h5>Rate Offer : </h5><h5>BETA GIDA SENAYI VE TICKET A.S </h5>
  <h5>Payment Terms : </h5><h5>COLLECT</h5>
  <table>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  </table>
`;
const contentBlock = htmlToDraft(html);

const Root = styled('div')({
	'& .rdw-dropdown-selectedtext': {
		color: 'inherit'
	},
	'& .rdw-editor-toolbar': {
		borderWidth: '0 0 1px 0!important',
		margin: '0!important'
	},
	'& .rdw-editor-main': {
		padding: '8px 12px',
		height: `${256}px!important`
	}
});

const WYSIWYGEditor = forwardRef((props, ref) => {
	// const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [editorState, setEditorState] = useState(
		EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks))
	);

	function onEditorStateChange(_editorState) {
		setEditorState(_editorState);

		return props.onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
	}

	return (
		<Root className={clsx('rounded-4 border-1 overflow-hidden w-full', props.className)} ref={ref}>
			<Editor editorState={editorState} onEditorStateChange={onEditorStateChange} />
			<BasicTable />
			<div>
				<h6>All extra chageses as per linear tarrifs</h6>
				<br />
				<h6>Demurage and detention charges as per liner tariffs</h6>
				<br />
				<h6>Tarrif as per actual date of renderd service</h6>
				<br />

				<h3>Thank You !</h3>

				<h6></h6>
			</div>
		</Root>
	);
});

export default WYSIWYGEditor;
