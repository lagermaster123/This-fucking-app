import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const columns = [
  {
    field: 'id',
    hide: true
  },
  {
    field: 'orderDue',
    headerName: 'Order Due'
  },
  {
    field: 'customer',
    headerName: 'Customer'
  },
  {
    field: 'amount',
    headerName: 'Amount'
  }
]

export default function Orders() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 5,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
    {console.log(data)}
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid {...data} />
        </div>
      </div>
    </div>
  );
}