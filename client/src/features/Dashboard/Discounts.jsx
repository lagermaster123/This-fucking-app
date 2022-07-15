import React from 'react'

function Discounts({ setHeader }) {
  React.useEffect(() => {
    setHeader('Discounts')
  }, [])
  return (
    <div>Discounts</div>
  )
}

export default Discounts