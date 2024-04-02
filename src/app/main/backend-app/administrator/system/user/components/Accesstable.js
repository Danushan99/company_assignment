import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from "@mui/material/Checkbox";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Reports', <Checkbox/>, <Checkbox/>, <Checkbox/>, <Checkbox/>),
    createData('System', <Checkbox/>, <Checkbox/>, <Checkbox/>, <Checkbox/>),
    createData('Operational', <Checkbox/>, <Checkbox/>, <Checkbox/>, <Checkbox/>),
    createData('Financial', <Checkbox/>, <Checkbox/>, <Checkbox/>, <Checkbox/>),
    createData('Dictionary', <Checkbox/>, <Checkbox/>, <Checkbox/>, <Checkbox/>),
];

export default function Accesstable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="p-4 md:p-5" style={{paddingLeft:"5px"}}></TableCell>
                        <TableCell align="right" className="md:p-5">Create</TableCell>
                        <TableCell align="right" className="md:p-5">View</TableCell>
                        <TableCell align="right" className="md:p-5" style={{paddingRight:"8px"}}>Edit</TableCell>
                        <TableCell align="right" className="md:p-5">Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" className="p-4 md:p-5">
                                {row.name}
                            </TableCell>
                            <TableCell align="right" className="md:p-5" style={{width:"150px"}}>{row.calories}</TableCell>
                            <TableCell align="right" className="md:p-5" style={{width:"150px"}}>{row.fat}</TableCell>
                            <TableCell align="right" className="md:p-5" style={{width:"150px"}}>{row.carbs}</TableCell>
                            <TableCell align="right" className="md:p-5" style={{width:"150px"}}>{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
