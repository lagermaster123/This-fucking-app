import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Navigation from './features/Dashboard/components/Navigation'
import { Routes, Route, Navigate } from 'react-router-dom'
import Overview from './features/Dashboard/Overview'
import Products from './features/Dashboard/Products'
import Orders from './features/Dashboard/Orders'
import Register from './features/Dashboard/Register'
import Settings from './features/Dashboard/Settings'

import { getOrders } from './redux/actions/orderActions'

function Dashboard() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [])
  return (
    <Styles>
      <Main>
      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/products' element={<Products />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/register' element={<Register />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      </Main>
      <Navigation />
    </Styles>
  )
}

export default Dashboard

const Styles = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: rgba(0, 0, 0, 0.85);
  @media (min-width: 768px) {
  }
`

const Main = styled.div`
  padding: 2em;
`