import React from 'react'

function Error({ setHeader }) {
    React.useEffect(() => {
        setHeader('Error')
        }, [])
  return (
    <div>Error</div>
  )
}

export default Error