import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// const columns = [
//   { field: 'id', headerName: 'Order ID', width: 150 },
//   {
//     field: 'customer',
//     headerName: 'Customer',
//     width: 150,
//   },
//   {
//     field: 'items',
//     headerName: 'Order',
//     width: 150,
//   },
//   {
//     field: 'orderDue',
//     headerName: 'Due By',
//     type: 'date',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'method',
//     headerName: 'Delivery Method',
//     width: 150
//   },
// ];

// const rows = [
//   { id: 1, customer: 'Snow Jon', items: 35 },
//   { id: 2, customer: 'Lannister Cersei', items: 42 },
//   { id: 3, customer: 'Lannister Jaime', items: 45 },
//   { id: 4, customer: 'Stark Arya', items: 16 },
//   { id: 5, customer: 'Targaryen Daenerys', items: 0 },
//   { id: 6, customer: 'Melisandre', items: 150 },
//   { id: 7, customer: 'Clifford Ferrara', items: 44 },
//   { id: 8, customer: 'Frances Rossini', items: 36 },
//   { id: 9, customer: 'Roxie Harvey', items: 65 },
// ];

export default function DataGridDemo({ columns, rows }) {
  return (
    <Box sx={{ height: '50vh', width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
