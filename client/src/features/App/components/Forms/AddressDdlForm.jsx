import React, { useState } from 'react'
import styled from 'styled-components'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ShippingAddress from './ShippingAddress';
import { FiEdit2 } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'

function AddressDdlForm({ user, values, setValues, setDisabled, loading, setError, setEdit }) {
    const [ addresses, setAddresses ] = useState(user.addresses)
    const [ newAddress, setNewAddress ] = useState(user.addresses.length > 0 ? false : true)
    const handleChange = (e) => {
        setError('')
        const inputs = Array.from(document.querySelectorAll('input'))
        const errors = inputs.filter(input => !input.validity.valid)
        if(errors.length) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleDropChange = (e) => {
        if(e.target.value === 'new') return setNewAddress(!newAddress)
    }

    const createAddress = (addy) => {
        const address = Object.values(addy)
        address.pop()
        const end = address.length - 1
        return address.slice(2, end).join(' ')
    }

    const handleEdit = (addy) => {
        setNewAddress(true)
        setEdit({toggle: true, address: addy})
    }

    return <AddressDdlFormStyles>{newAddress
        ? <ShippingAddress shippingAddress={''} onChange={handleChange} loading={loading}/>
        : <FormControl sx={{  width: {xs: '90vw', md: '33vw'}}}>
                <InputLabel id="demo-simple-select-label">Default Address</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={addresses.length ? addresses[0] : 'new'}
                label="Default Address"
                disabled={loading}
                onChange={handleDropChange}
                display={!newAddress ? 'true' : 'false'}
            >
                {user.addresses.map((addy, i) => (
                    <MenuItem sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}} key={i} value={addy}>
                        <div className="d-flex w-100">
                            {createAddress(addy)}
                            <div className="d-flex align-items-center justify-content-end w-100">
                                <FiEdit2 className='m-2' onClick={() => handleEdit(addy)} />
                                <BsTrash />
                            </div>
                        </div>
                    </MenuItem>
                ))}
                <MenuItem value={'new'}>Add New Address</MenuItem>
            </Select>
            </FormControl>}</AddressDdlFormStyles>
}

export default AddressDdlForm

const AddressDdlFormStyles = styled.div`
    width: 100%;
    margin-bottom: 2em;
`