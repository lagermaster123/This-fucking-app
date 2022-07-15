import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import Table from './components/Table'

import { getOrders } from '../../redux/actions/orderActions'

function Orders({ setHeader }) {
  const dispatch = useDispatch()
  React.useEffect(() => {
    setHeader('Orders')
    dispatch(getOrders())
  }, [])

  const orders = useSelector(state => state.getOrders.orders)
  const columns = [
    { field: 'id', headerName: 'id', width: 150, hide: true },
    { field: 'orderId', headerName: 'Order ID', width: 150 },
    {
      field: 'customer',
      headerName: 'Customer',
      width: 150,
    },
    {
      field: 'items',
      headerName: 'Order',
      width: 150,
    },
    {
      field: 'orderDue',
      headerName: 'Due By',
      type: 'date',
      width: 110,
      editable: true,
    },
    {
      field: 'method',
      headerName: 'Delivery Method',
      width: 150
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150
    }
  ];

  return (
    <>
      <Typography variant='h1'>hey</Typography>
      <Table columns={columns} rows={orders} />
    </>
  )
}

export default Orders