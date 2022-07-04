import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import Categories from './components/Categories'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import CollectionsIcon from '@mui/icons-material/Collections';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { getCategories as listCategories } from '../../redux/actions/productActions'
import { logout } from '../../redux/reducers/userSlice'

const drawerWidth = 240;


const Navbar = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const userSettings = [user && user.role === 'ADMIN' ? 'Dashboard' : 'Profile', 'Orders', 'Logout'];
    const getCategories = useSelector(state => state.getCategories)
    const { categories } = getCategories
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const { window, handleToggle } = props;
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => qty + Number(item.qty), 0)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleLogout = () => {
        axios.get('/user/logout')
        dispatch(logout())
    }
    const navLinks = [
        {
            id: 1,
            text: 'Home',
            icon: <HomeIcon />,
            href: '/',
            target: ''
        },
        {
            id: 2,
            text: 'About',
            icon: <InfoIcon />,
            href: '/#about',
            target: ''
        },
        {
            id: 3,
            text: 'Contact',
            icon: <CallIcon />,
            href: '/#contact',
            target: ''
        },
        {
            id: 4,
            text: 'Gallery',
            icon: <CollectionsIcon />,
            href: 'https://www.instagram.com/dreamdecorationsllc/',
            target: '_blank'
        },
        {
            id: 5,
            text: 'Shop',
            icon: <ShoppingBasketIcon />,
            href: '/shop',
            target: ''
        },
    ]
    const drawer = (
        <StyledDrawer>
          <Toolbar />
          <Divider />
          <List>
            {navLinks.map((link, index) => {
                if(link.id === 1 || link.id === 5) {
                    return (
                        <Link to={link.href} onClick={handleDrawerToggle} key={`${link.id}${index}`}>
                            <ListItem button key={index}>
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText className='text'>{link.text}</ListItemText>
                            </ListItem>
                        </Link>
                    )
                }
                return (
                    <ListItem 
                        component={'a'}
                        key={index}
                        href={link.href}
                        target={link.target}
                        onClick={handleDrawerToggle}
                        >
                        <ListItemIcon>
                            {link.icon}
                        </ListItemIcon>
                            <ListItemText className='text'>{link.text}</ListItemText>
                    </ListItem>
                )
            })}
          </List>
           <Divider />
        </StyledDrawer>
    );
    
    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        try {
            dispatch(listCategories())
            localStorage.setItem('user', JSON.stringify(user))
            console.log(user)
        } catch(e){
            console.log(e)
        }
    }, [dispatch, user]);

    return (
        <NavStyles>

        <div
        id="g_id_onload"
        data-client_id="1044830510357-anorf42rh8k5t226ot51jsfjdlkaht1n.apps.googleusercontent.com"
        data-login_uri="https://developers.google.com/oauthplayground"
        ></div>
    <AppBar position="static" color="">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
            <Link to="/"><img src="/favicon.png" height={'80rem'} alt="" /></Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                display: { xs: 'block', md: 'none' },
                }}
            >
                {navLinks.map((link, i) => (
                <Link to={link.href} key={`${i}${link.href}`} onClick={handleCloseNavMenu}>
                    <span className='nav-button text-align-center'>{link.text}</span>
                </Link>
                ))}
            </Menu>
            </Box>
            <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
            <Link to="/"><img src="/favicon.png" height={'80rem'} alt="" /></Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link, i) => i === 0 || i === 4
            ?(
                <Link 
                    className='nav-button'
                    to={link.href} 
                    key={`${i}cunt`}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {link.text}
                </Link>
            ) : <a
                className='nav-button'
                target={link.target}
                href={link.href}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>{link.text}</a>)}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user ? "Open settings" : 'Login'}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user ? user.image[0].url : null} alt="Remy Sharp">{user ? `${user.firstName[0]}${user.lastName[0]}` : null}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {user 
                ? userSettings.map((setting, i) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                            {setting === "Logout"
                            ? <a href='#' key={`${setting}${i}`} style={{ textDecoration: 'none', color: '#262626'}} onClick={handleLogout}>{setting}</a>
                            : <Link key={`${setting}${i}2`} style={{ textDecoration: 'none', color: '#262626'}} to={`/${setting}`}>{setting}</Link>}
                    </Typography>
                </MenuItem>
                )) : <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                            <Link style={{ textDecoration: 'none', color: '#262626'}} to='/login'>Login</Link>
                        </Typography>
                    </MenuItem>}
            </Menu>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="View cart">
                    <Link to={'/cart'}>
                    <IconButton className='p-3'>
                        <Badge color='secondary' badgeContent={getCartCount()} showZero>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    </Link>
                </Tooltip>
            </Box>
        </Toolbar>
        </Container>
    </AppBar>
    <Categories categories={categories} handleToggle={handleToggle}/>
    <Box
    component="nav"
    sx={{ flexGrow: 1, display: { xs: 'block', md: 'none' } }}
    aria-label="mailbox folders"
  >
    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
     <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: false, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
    </Box>
  </NavStyles>
    );
    };
export default Navbar;

const NavStyles = styled.div`
    a {
        text-decoration: none;
    }
    .nav-button {
        background: transparent;
        border: none;
        margin: 0 1em;
        color: rgba(0,0,0,.5);
        text-decoration: none;
        &:hover {
            color: black;
        }
    }
    .header {
        box-shadow: 0px 5px 17px -2px rgba(0,0,0,0.71);
        border-bottom: 2px solid black;
        z-index: 2;
    }
`

const StyledDrawer = styled.div`
    a {
        text-decoration: none;
        color: #757575;
        font-weight: bold;
    }
`