import React from 'react'

function Marketing({ setHeader }) {
  React.useEffect(() => {
    setHeader('Marketing')
  }, [])
  return (
    <div>Marketing</div>
  )
}

export default Marketing