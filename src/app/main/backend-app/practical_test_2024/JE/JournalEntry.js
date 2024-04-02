import React, { useState } from 'react';
import './JournalEntry.css';
import axios from 'axios';
import { journalSectionURL } from 'app/main/utils/apiUrlsDocumnet';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

const JournalEntry = () => {
	const [year, setYear] = useState('');
	const [entryDate, setEntryDate] = useState('');
	const [comment, setComment] = useState('');
	const [companyName, setCompanyName] = useState('');
	const [currency, setCurrency] = useState('');
	const [invoicePDF, setInvoicePDF] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [invoiceNumber, setInvoiceNumber] = useState('');
	const [agreementNo, setAgreementNo] = useState('');
	const [accountId, setAccountId] = useState(0);
	const [contentId, setContentId] = useState(0);
	const [inquireId, setInquireId] = useState(0);
	const [debit, setDebit] = useState('');
	const [credit, setCredit] = useState('');

	const handleSubmit = event => {
		event.preventDefault();

		console.log({
			year,
			entryDate,
			comment,
			companyName,
			currency,
			invoicePDF,
			dueDate,
			invoiceNumber,
			accountId,
			contentId,
			inquireId,
			debit,
			credit
		});

		try {
			const body = {
				year: parseInt(year),
				entyDate: entryDate,
				ipdate: '10/12/2024',
				dueDate: dueDate,
				comments: comment,
				office: 100,
				invNo: '001',
				invPdf: 'PDF Path',
				argNo: '002',
				ccy: '003',
				totalDbtAmount: 1000,
				totalCdtAmount: 2000,
				dbtAmounts: [
					{
						key: '1',
						accountID: parseInt(accountId),
						contactID: parseInt(contentId),
						inqId: parseInt(inquireId),
						comment: comment,
						amount: 1000
					}
				],
				cdtAmounts: [
					{
						key: '1',
						accountID: parseInt(accountId),
						contactID: parseInt(contentId),
						inqId: parseInt(inquireId),
						comment: comment,
						amount: 1000
					}
				]
			};

			const newBody = {
				datas: [
					{
						year: 1999,
						entyDate: "entyDate",
						ipdate: "ipdate",
						dueDate: "dueDate",
						comments: "comments",
						office: 100,
						comid: "Sri Lanka",
						invNo: "invNo",
						invPdf: "invPdf",
						argNo: "argNo",
						ccy: "ccy",
						totalDbtAmount: 1000,
						totalCdtAmount: 1000,
						dbtAmounts: [
							{
								key: "01",
								accountID: 10,
								contactID: 20,
								inqId: 50,
								comment: "comment",
								amount: 2000
							}
						],
						cdtAmounts: [
							{
								key: "02",
								accountID: 20,
								contactID: 30,
								inqId: 20,
								comment: "comment",
								amount: 400
							}
						]
					}
				]
			};

			const res = axios.post(`${apiUrl}${journalSectionURL.addNewEntry}`, newBody);

			if (res?.status === 200) {
				console.log('res : ', res);
				return res;
			} else {
				console.log(res);
			}
		} catch (error) {
			toast.error(error?.message, {
				position: toast.POSITION.TOP_CENTER
				// autoClose: 400
			});
			return error.message;
		}
	};

	return (
		<div>
			<div className="journal-entry-container">
				<h3>Journal Entry</h3>
				<div className="form">
					<div className="form-column">
						<div className="form-group">
							<label htmlFor="year">Year:</label>
							<input
								type="text"
								id="year"
								value={year}
								onChange={e => setYear(e.target.value)}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="entryDate">Entry Date:</label>
							<input
								type="date"
								id="entryDate"
								value={entryDate}
								onChange={e => setEntryDate(e.target.value)}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="comment">Comment:</label>
							<textarea
								id="comment"
								value={comment}
								onChange={e => setComment(e.target.value)}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="agreementNo">Agreement No:</label>
							<input
								type="text"
								id="agreementNo"
								value={agreementNo}
								onChange={e => setAgreementNo(e.target.value)}
								className="form-control"
							/>
						</div>
					</div>
					<div className="form-column">
						<div className="form-group">
							<label htmlFor="companyName">Company Name:</label>
							<select
								id="companyName"
								value={companyName}
								onChange={e => setCompanyName(e.target.value)}
								className="form-control"
							>
								<option value="">Select Company</option>
								<option value="Company A">Company A</option>
								<option value="Company B">Company B</option>
								<option value="Company C">Company C</option>
								{/* Add more options as needed */}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="currency">Currency:</label>
							<input
								type="text"
								id="currency"
								value={currency}
								onChange={e => setCurrency(e.target.value)}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="invoicePDF">Invoice PDF:</label>
							<input
								type="file"
								id="invoicePDF"
								onChange={e => setInvoicePDF(e.target.files[0])}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="dueDate">Due Date:</label>
							<input
								type="date"
								id="dueDate"
								value={dueDate}
								onChange={e => setDueDate(e.target.value)}
								className="form-control"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="invoiceNumber">Invoice Number:</label>
							<input
								type="text"
								id="invoiceNumber"
								value={invoiceNumber}
								onChange={e => setInvoiceNumber(e.target.value)}
								className="form-control"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="journal-entry-container">
				<h3>Add New Set of Journal Entries</h3>
				<div className="form">
					<table className="journal-table">
						<thead>
							<tr>
								<th>Account ID</th>
								<th>Content ID</th>
								<th>Inquire ID</th>
								<th>Debit</th>
								<th>Credit</th>
								<th>Comments</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<input
										type="number"
										value={accountId}
										onChange={e => setAccountId(e.target.value)}
										className="form-control"
									/>
								</td>
								<td>
									<input
										type="number"
										value={contentId}
										onChange={e => setContentId(e.target.value)}
										className="form-control"
									/>
								</td>
								<td>
									<input
										type="number"
										value={inquireId}
										onChange={e => setInquireId(e.target.value)}
										className="form-control"
									/>
								</td>
								<td>
									<input
										type="text"
										value={debit}
										onChange={e => setDebit(e.target.value)}
										className="form-control"
									/>
								</td>
								<td>
									<input
										type="text"
										value={credit}
										onChange={e => setCredit(e.target.value)}
										className="form-control"
									/>
								</td>
								<td>
									<input
										type="text"
										value={comment}
										onChange={e => setComment(e.target.value)}
										className="form-control"
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<button type="submit" className="btn btn-primary btn-submit" onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default JournalEntry;
