import React from 'react'

function Settings({ setHeader }) {
  React.useEffect(() => {
    setHeader('Settings')
  }, [])
  return (
    <div>Settings</div>
  )
}

export default Settings