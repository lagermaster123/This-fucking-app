import React from 'react'

function Products({ setHeader }) {
  React.useEffect(() => {
    setHeader('Products')
  }, [])
  return (
    <div>Products</div>
  )
}

export default Products