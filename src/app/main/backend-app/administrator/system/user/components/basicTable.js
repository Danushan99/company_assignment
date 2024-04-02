import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(mode, portoforigin, termofasseptance, termofdilivery, protofdischarge,Placeofdestination,TARRIF,CURRENCY,TYPEOFCONTATINER,LINE,TRANSIT,WEHIFHTCATAGERY,DEMDETFREE,VALIDITY) {
    return { mode, portoforigin, termofasseptance, termofdilivery, protofdischarge,Placeofdestination,TARRIF,CURRENCY,TYPEOFCONTATINER,LINE,TRANSIT,WEHIFHTCATAGERY,DEMDETFREE,VALIDITY};
}

const rows = [
    createData('TRANSPORTATION SEA', 'MOMBASA', 'FREE IN-F1', 'LINER-OUT-LO', 'PORT OF DISCHARGE','KOTKA','4155-19','USD','40HC','','','','','2024/01/12/2021.01.31'),
    createData('TRANSPORTATION SEA', 'MOMBASA', 'FREE IN-F1', 'LINER-OUT-LO', 'PORT OF DISCHARGE','KOTKA','4155-19','USD','40HC','','','','','2024/01/12/2021.01.31'),
];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Mode of Transportation</TableCell>
                        <TableCell>Port of Origin</TableCell>
                        <TableCell>Term of acceptance</TableCell>
                        <TableCell>Term of delivery</TableCell>
                        <TableCell>Port of Discharge</TableCell>
                        <TableCell>Place of Destination</TableCell>
                        <TableCell>Tariff</TableCell>
                        <TableCell>Currency</TableCell>
                        <TableCell>Type of Container</TableCell>
                        <TableCell>Line</TableCell>
                        <TableCell>Transit</TableCell>
                        <TableCell>Weight Category</TableCell>
                        <TableCell>Dem Det Free</TableCell>
                        <TableCell>Validity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.mode}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.mode}</TableCell>
                            <TableCell>{row.portoforigin}</TableCell>
                            <TableCell>{row.termofasseptance}</TableCell>
                            <TableCell>{row.termofdilivery}</TableCell>
                            <TableCell>{row.protofdischarge}</TableCell>
                            <TableCell>{row.Placeofdestination}</TableCell>
                            <TableCell>{row.TARRIF}</TableCell>
                            <TableCell>{row.CURRENCY}</TableCell>
                            <TableCell>{row.TYPEOFCONTATINER}</TableCell>
                            <TableCell>{row.LINE}</TableCell>
                            <TableCell>{row.TRANSIT}</TableCell>
                            <TableCell>{row.WEHIFHTCATAGERY}</TableCell>
                            <TableCell>{row.DEMDETFREE}</TableCell>
                            <TableCell>{row.VALIDITY}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
