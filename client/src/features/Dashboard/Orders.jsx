import React from 'react'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import { HiSearch } from 'react-icons/hi'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import { BsFilter, BsSortUpAlt } from 'react-icons/bs'
import BasicTabs from './components/OrderTabs'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { getOrders } from '../../redux/actions/orderActions'

const tabs = [
  {
    title: 'Open'
  },
  {
    title: 'Completed'
  },
  {
    title: 'Refunded'
  },
  {
    title: 'All'
  },
]



function Orders() {
  const dispatch = useDispatch()

  const complete = async (order, item) => {
    try {
      await axios.post('/dashboard/orders/complete', { order, item })
      .then( res => {
        if( res.data.message === 'success' ) {
          console.log('success')
          dispatch(getOrders())
        } else {
          console.error(res.data)
        }
      })
    } catch(e) {
      console.error(e)
    }
  }

  const undo = async (order, item) => {
    try {
      await axios.post('/dashboard/orders/undo', { order, item })
      .then( res => {
        if(res.data.message === 'success' ) {
          console.log('success')
          dispatch(getOrders())
        } else {
          console.error(res.data)
        }
      })
    } catch(e) {
      console.error(e)
    }
  }

  const deleteOrder = async (order) => {
    try {
      await axios.post('/dashboard/orders/delete', { order })
      .then( res => {
        if(res.data.message === 'success' ) {
          console.log('success')
          dispatch(getOrders())
        } else {
          console.error(res.data)
        }
      })
    } catch(e) {
      console.error(e)
    }
  }

  const print = async ( item ) => {
    try {
      await axios.post('/dashboard/orders/print', { item })
      .then( res => {
        if(res.data.message === 'success' ) {
          console.log('success')
          dispatch(getOrders())
        } else {
          console.error(res.data)
        }
      })
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <Styles>
      <OrderNav>
        <h1>Orders</h1>
        <div className="buttons">
          <TextField inputProps={{ style: { color: 'white' }, id: 'search' }} variant='standard' />
          <label htmlFor="search"><HiSearch className='butt search' size={'2em'} /></label>
          <Button className='butt' variant={'contained'} color={'primary'}>Create Order</Button>
        </div>
      </OrderNav>
      <div className="filters">
        <Chip color='info' icon={<BsFilter size='1.5em' />} label="Filters" />
        <Chip color='info' style={{ marginLeft: '1em' }} icon={<BsSortUpAlt size='1.5em' />} label="Sort" />
      </div>
      <BasicTabs tabs={tabs} complete={complete} undo={undo} deleteOrder={deleteOrder} print={print} />
    </Styles>
  )
}

export default Orders

const Styles = styled.div`
  .filters {
    margin: 1em 0;
  }
`

const OrderNav = styled.div`
  display: flex;
  justify-content: space-between;
  .buttons {
    color: white;
    .search {
      cursor: pointer;
    }
    .butt {
      margin: 0 1em;
    }
  }
`