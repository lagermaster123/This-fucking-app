import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function AddressDdlForm({ user }) {
    const [ addresses, setAddresses ] = useState(user.addresses)
    const [ newAddress, setNewAddress ] = useState(false)
    const handleChange = (e) => {
        if(e.target.value === 'new') return setNewAddress(true)
    }
  return (
    <FormControl sx={{ width: {xs: '80vw', md: '33vw'} }}>
    <InputLabel id="demo-simple-select-label">Addresses</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={addresses}
        label="Addresses"
        onChange={handleChange}
        display={!newAddress ? true : false}
    >
        {user.addresses.map(addy => (
            <MenuItem value={addy}>Ten</MenuItem>
        ))}
        <MenuItem value={'new'}>Add New Address</MenuItem>
    </Select>
    
    </FormControl>
  )
}

export default AddressDdlForm