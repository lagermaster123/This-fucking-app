import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom'
import Overview from './features/Dashboard/Overview'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';

import Orders from './features/Dashboard/Orders'
import Products from './features/Dashboard/Products'
import Discounts from './features/Dashboard/Discounts'
import BookKeeping from './features/Dashboard/BookKeeping'
import Marketing from './features/Dashboard/Marketing'
import SalesChannels from './features/Dashboard/SalesChannels'
import Settings from './features/Dashboard/Settings'
import Error from './features/Dashboard/Error'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3f51b5'
      }
    }
  });
  const Navigate = useNavigate()
  const { handle } = useLocation()
  const [open, setOpen] = React.useState(false);
  const [header, setHeader] = React.useState('Dashboard')
  
  React.useEffect(() => {
    console.log(handle)
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const list = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      link: '/'
    },
    {
      title: 'Orders',
      icon: <LocalShippingIcon />,
      link: '/Orders'
    },
    {
      title: 'Products',
      icon: <LocalFloristIcon />,
      link: '/Products'
    },
    {
      title: 'Discounts',
      icon: <LoyaltyIcon />,
      link: '/Discounts'
    },
  ]

  const list2 = [
    {
      title: 'Book Keeping',
      icon: <LibraryBooksIcon />,
      link: '/BookKeeping'
    },
    {
      title: 'Marketing',
      icon: <CelebrationIcon />,
      link: '/Marketing'
    },
    {
      title: 'Sales Channels',
      icon: <CallMergeIcon />,
      link: '/SalesChannels'
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      link: '/Settings'
    },
  ]

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', backgroundColor: '' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={(handleDrawerOpen)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {header}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <IconButton
              aria-label="open drawer"
              onClick={() => Navigate('/')}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <HomeIcon />
            </IconButton>
            <Avatar alt="cunt">MP</Avatar>
          </Box>
        </Toolbar>
    </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((text, index) => (
            <ListItem key={text.title} onClick={() => Navigate('/Dashboard' + text.link )} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {list2.map((text, index) => (
            <ListItem key={text.title} onClick={() => Navigate('/Dashboard' + text.link )} disablePadding sx={{ display: 'block', linkDecoration: 'none' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  textDecoration: 'none'
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.title} sx={{ opacity: open ? 1 : 0, }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Overview setHeader={setHeader} />} />
          <Route path="/Orders" element={<Orders setHeader={setHeader} />} />
          <Route path="/Products" element={<Products setHeader={setHeader} />} />
          <Route path="/Discounts" element={<Discounts setHeader={setHeader} />} />
          <Route path="/BookKeeping" element={<BookKeeping setHeader={setHeader} />} />
          <Route path="/Marketing" element={<Marketing setHeader={setHeader} />} />
          <Route path="/SalesChannels" element={<SalesChannels setHeader={setHeader} />} />
          <Route path="/Settings" element={<Settings setHeader={setHeader} />} />
          <Route path="/*" element={<Error setHeader={setHeader} />} />
        </Routes>
      </Box>
    </Box>
    </ThemeProvider>
  );
}
