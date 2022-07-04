import React from 'react'
import Slider from '@mui/material/Slider'

function PriceSlider({ handlePrice, handleToggle, value }) {

function valuetext(value) {
    return `$${value}`;
  }
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
        <h6 className='m-0 p-0 mt-3'><b>Price</b></h6>
    <div className="d-flex align-items-center w-100">
        <span>min</span>
        <Slider
            min={0}
            max={100}
            step={5}
            onChange={handlePrice}
            onClick={() => handleToggle('', 'price', value)}
            style={{ margin: '0 1em'}}
            getAriaLabel={() => 'Temperature range'}
            value={value}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
        />
        <span>max</span>
    </div>
    </div>
  )
}

export default PriceSlider