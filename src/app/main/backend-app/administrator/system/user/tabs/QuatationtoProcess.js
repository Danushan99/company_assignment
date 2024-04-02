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
import MailCompose from "../components/MailCompose";



function QuatationtoProcess() {

    function createData(tarrifid, description, item, route, subvendor,validity,ccy,buy,ccy2,sell) {
        return { tarrifid, description, item, route, subvendor,validity,ccy,buy,ccy2,sell };
    }

    const rows = [
        createData('1234567', 'CUSTOME BROKEGE IMPORT', '40-HC-FOT-FOT', 'MOW-MOW', 'MTAVANCO','2021-10-31','USD','2054.27','USD','0.00'),
        createData('1234567', 'CUSTOME BROKEGE IMPORT', '40-HC-FOT-FOT', 'MOW-MOW', 'MTAVANCO','2021-10-31','USD','2054.27','USD','0.00'),
        createData('1234567', 'CUSTOME BROKEGE IMPORT', '40-HC-FOT-FOT', 'MOW-MOW', 'MTAVANCO','2021-10-31','USD','2054.27','USD','0.00'),
        createData('1234567', 'CUSTOME BROKEGE IMPORT', '40-HC-FOT-FOT', 'MOW-MOW', 'MTAVANCO','2021-10-31','USD','2054.27','USD','0.00'),
        createData('1234567', 'CUSTOME BROKEGE IMPORT', '40-HC-FOT-FOT', 'MOW-MOW', 'MTAVANCO','2021-10-31','USD','2054.27','USD','0.00'),
    ];

    return (
        <>
            <div style={{display: 'flex'}}>
                <Button variant="contained" color="secondary">COMPLETE QUOTATION</Button>
                <Button variant="contained" color="secondary" style={{marginLeft:"10px"}}>ACCEPT BOOKING</Button>
                <Button variant="contained" color="secondary" style={{marginLeft:"10px"}}>QUOTATIONS IN PDF</Button>
                <Button variant="contained" color="secondary" style={{marginLeft:"10px"}}>QUOTATIONS IN EXCEL</Button>
                <MailCompose />
            </div>
            <div style={{marginTop:"30px"}}>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Option 1
                        <div style={{marginLeft:"20px",marginTop:"-8px"}}>
                        <Button variant="outlined">Delete Option 01</Button>
                        </div>
                    </AccordionSummary>

                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Tariff Id</TableCell>
                                        <TableCell align="right">Service Description</TableCell>
                                        <TableCell align="right">Terms</TableCell>
                                        <TableCell align="right">Route</TableCell>
                                        <TableCell align="right">Sub Vendor</TableCell>
                                        <TableCell align="right">Validity</TableCell>
                                        <TableCell align="right">CCY</TableCell>
                                        <TableCell align="right">Buy</TableCell>
                                        <TableCell align="right">CCY</TableCell>
                                        <TableCell align="right">Sell</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.tarrifid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left" >
                                                <IconButton aria-label="delete" size="medium">
                                                    <ManageSearchOutlinedIcon fontSize="medium" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.tarrifid}
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Option 2
                        <div style={{marginLeft:"20px",marginTop:"-8px"}}>
                            <Button variant="outlined">Delete Option 02</Button>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Tariff Id</TableCell>
                                        <TableCell align="right">Service Description</TableCell>
                                        <TableCell align="right">Terms</TableCell>
                                        <TableCell align="right">Route</TableCell>
                                        <TableCell align="right">Sub Vendor</TableCell>
                                        <TableCell align="right">Validity</TableCell>
                                        <TableCell align="right">CCY</TableCell>
                                        <TableCell align="right">Buy</TableCell>
                                        <TableCell align="right">CCY</TableCell>
                                        <TableCell align="right">Sell</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.tarrifid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left" >
                                                <IconButton aria-label="delete" size="medium">
                                                    <ManageSearchOutlinedIcon fontSize="medium" />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.tarrifid}
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        Option 3
                    </AccordionSummary>
                    <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
            </div>
        </>
    );
}

export default QuatationtoProcess;
