import React from 'react'

function BookKeeping({ setHeader }) {
  React.useEffect(() => {
    setHeader('Book Keeping')
  }, [])
  return (
    <div>BookKeeping</div>
  )
}

export default BookKeeping