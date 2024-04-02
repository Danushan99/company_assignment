import React from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AccordionActions} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";



function BookinginProcessTab() {

    function createData(tarrifid, description, item, route, subvendor,validity,ccy,buy,ccy2,sell,sellnew,validitynew) {
        return { tarrifid, description, item, route, subvendor,validity,ccy,buy,ccy2,sell,sellnew,validitynew };
    }

    const rows = [
        createData('1234567', 'CUSTOME BROKEGE IMPORT', 'ABCDEF', 'Mega Trend Lanka Pvt Ltd', 'CMB-CMB','LUL-LUL','ABCDE','USD','0.00','USD','0.00','2023'),
        createData('1234567', 'CUSTOME BROKEGE IMPORT', 'ABCDEF', 'Mega Trend Lanka Pvt Ltd', 'CMB-CMB','LUL-LUL','ABCDE','USD','0.00','USD','0.00','2023'),
        createData('1234567', 'CUSTOME BROKEGE IMPORT', 'ABCDEF', 'Mega Trend Lanka Pvt Ltd', 'CMB-CMB','LUL-LUL','ABCDE','USD','0.00','USD','0.00','2023'),
        createData('1234567', 'CUSTOME BROKEGE IMPORT', 'ABCDEF', 'Mega Trend Lanka Pvt Ltd', 'CMB-CMB','LUL-LUL','ABCDE','USD','0.00','USD','0.00','2023'),
        createData('1234567', 'CUSTOME BROKEGE IMPORT', 'ABCDEF', 'Mega Trend Lanka Pvt Ltd', 'CMB-CMB','LUL-LUL','ABCDE','USD','0.00','USD','0.00','2023'),
    ];

    return (
        <>
            <div style={{display: 'flex'}}>
                <Button variant="contained" color="secondary">COMPLETE QUOTATION</Button>
                <Button variant="contained" color="secondary" style={{marginLeft:"10px"}}>QUOTATIONS IN PDF</Button>
                <Button variant="contained" color="secondary" style={{marginLeft:"10px"}}>QUOTATIONS IN EMAIL</Button>
                <Button variant="contained" color="secondary" style={{marginLeft:"10px"}}>QUOTATIONS IN EXCEL</Button>
                <Button variant="contained" color="secondary" style={{marginLeft:"10px"}}>ACCEPT BOOKING</Button>
                <Button variant="contained" color="secondary" style={{marginLeft:"10px"}}>REJECT QUOTATION</Button>



            </div>
            <div style={{marginTop:"30px"}}>
                <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell align="right">Service Description</TableCell>
                                        <TableCell align="right">Customer</TableCell>
                                        <TableCell align="right">MT Office</TableCell>
                                        <TableCell align="right">Route</TableCell>
                                        <TableCell align="right">Term</TableCell>
                                        <TableCell align="right">Vendor</TableCell>
                                        <TableCell align="right">CCY</TableCell>
                                        <TableCell align="right">Buy</TableCell>
                                        <TableCell align="right">CCY</TableCell>
                                        <TableCell align="right">Sell</TableCell>
                                        <TableCell align="right">Validity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.tarrifid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left" >
                                                <Checkbox  />
                                            </TableCell>
                                            <TableCell align="right">{row.description}</TableCell>
                                            <TableCell align="right">{row.item}</TableCell>
                                            <TableCell align="right">{row.route}</TableCell>
                                            <TableCell align="right">{row.subvendor}</TableCell>
                                            <TableCell align="right">{row.validity}</TableCell>
                                            <TableCell align="right">{row.ccy}</TableCell>
                                            <TableCell align="right">{row.buy}</TableCell>
                                            <TableCell align="right">{row.ccy2}</TableCell>
                                            <TableCell align="right">{row.sell}</TableCell>
                                            <TableCell align="right">{row.sellnew}</TableCell>
                                            <TableCell align="right">{row.validitynew}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default BookinginProcessTab;
