import * as React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Overview from './features/Dashboard/Overview'
import Orders from './features/Dashboard/Orders'
import Products from './features/Dashboard/Products'
import Discounts from './features/Dashboard/Discounts'
import Marketing from './features/Dashboard/Marketing'
import Finances from './features/Dashboard/Finances'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {BsGraphUp, BsBoxSeam} from 'react-icons/bs'
import {GiFlowerPot, GiMoneyStack} from 'react-icons/gi'
import {ImPriceTags} from 'react-icons/im'
import {GiPartyPopper} from 'react-icons/gi'

const drawerWidth = 240;

const topNav = [
    {
        name: 'Overview',
        icon: <BsGraphUp />
    },
    {
        name: 'Orders',
        icon: <BsBoxSeam />
    },
    {
        name: 'Products',
        icon: <GiFlowerPot/>
    },
    {
        name: 'Discounts',
        icon: <ImPriceTags/>
    },
]
const bottomNav = [
    {
        name: 'Marketing',
        icon: <GiPartyPopper/>
    },
    {
        name: 'Finances',
        icon: <GiMoneyStack/>
    }
]

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ active, setActive ] = React.useState('Overview');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {active}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {topNav.map((text, index) => (
            <Link to={`/dashboard/${text.name === 'Overview' ? "" : text.name}`} onClick={() => setActive(text.name)} style={{ color: 'black' }} className={'MuiListItem-root text-decoration-none'} key={text.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {bottomNav.map((text, index) => (
            <Link to={`/dashboard/${text.name}`} onClick={() => setActive(text.name)} style={{ color: 'black' }} className={'MuiListItem-root text-decoration-none'} key={text.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
            <Route path='/' element={<Overview />}/>
            <Route path='/orders' element={<Orders />}/>
            <Route path='/products' element={<Products />}/>
            <Route path='/discounts' element={<Discounts />}/>
            <Route path='/marketing' element={<Marketing />}/>
            <Route path='/finances' element={<Finances />}/>
        </Routes>
      </Main>
    </Box>
  );
}
