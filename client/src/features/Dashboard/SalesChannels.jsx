import React from 'react'

function SalesChannels({ setHeader }) {
  React.useEffect(() => {
    setHeader('Sales Channels')
  }, [])
  return (
    <div>SalesChannels</div>
  )
}

export default SalesChannels