import React from 'react'

function Orders({ setHeader }) {
  React.useEffect(() => {
    setHeader('Orders')
  }, [])
  return (
    <div>Orders</div>
  )
}

export default Orders