import React, { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'

function FormInput({label, name, pattern, errorMessage, type, required=false, id, onChange, disabled=false, state, checked=false, helperText = ''}) {
  const [focused, setFocused] = useState(false);
  const [ invalid, setInvalid ] = useState(false)
  const theProps = {
    id,
    name,
    onFocus: () => {
      name === "confirmPassword" && setFocused(true)
    },
    type,
    value: state[name],
    focused: focused.toString(),
    pattern: pattern,
    onChange: onChange
  }
  const handleFocus = (e) => {
      setFocused(true);
      if(!e.target.validity.valid) {
        setInvalid(true)
      } else {
        setInvalid(false)
      }
    };
  
  return (
    <FormInputStyles>
      <div className="input-container">
        <TextField
          label={label}
          className='input'
          variant='filled'
          disabled={checked}
          margin='dense'
          size='small'
          disabled={disabled}
          inputProps={theProps}
          required={required}
          onBlur={(e) => handleFocus(e)}
          error={invalid}
          helperText={invalid ? errorMessage : helperText}
        />
      </div>
    </FormInputStyles>
  )
}

export default FormInput

const FormInputStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: .5em;
    .input-container {
      height: 4rem;
      input {
        box-shadow: none;
      }
    }
`