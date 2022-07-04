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
                    <Box className='m-auto'>
                        {categories.map(c => (
                            <Link to='/shop' onClick={() => handleToggle(c._id)}><NavButton>{c.name}</NavButton></Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
    </AppBar>
  )
}

export default Categories

const NavButton = styled.a`
    background: transparent;
    border: none;
    margin: 0 1em;
    text-decoration: none;
    color: rgba(255,255,255,.9);
    &:hover {
        color: lightgrey;
    }
`