import React from 'react'

function Overview({ setHeader }) {
  React.useEffect(() => {
    setHeader('Overview')
  }, [])
  return (
    <div>Overview</div>
  )
}

export default Overview