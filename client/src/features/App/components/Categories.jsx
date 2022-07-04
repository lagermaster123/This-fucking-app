import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
  }

function Categories({ categories, handleToggle }) {
  return (
    <AppBar position="static" color="secondary" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CatStyles className='m-auto'>
                        {categories.map((c, i) => (
                            <Link key={i} className="cat-link" to='/shop' onClick={() => handleToggle(c._id, 'categories')}>{c.name}</Link>
                        ))}
                    </CatStyles>
                </Toolbar>
            </Container>
    </AppBar>
  )
}

export default Categories

const CatStyles = styled.div`
    a {
        background: transparent;
        border: none;
        margin: 0 1em;
        text-decoration: none;
        color: rgba(255,255,255,.9);
        &:hover {
            color: lightgrey;
        }
    }
`