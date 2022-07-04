import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from './Table';
import { useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const columns = [
  {
    headerName: 'Order Due'
  },
  {
    headerName: 'Customer'
  },
  {
    headerName: 'Items'
  },
  {
    headerName: 'Amount'
  },
  {
    headerName: 'Action'
  },
]

export default function BasicTabs({ tabs, complete, undo, deleteOrder, print }) {
  const [value, setValue] = React.useState(0);
  const orders = useSelector(state => state.getOrders.orders)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabs.map( (tab, index) => (
            <Tab key={index + 'gay'} label={tab.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map( (tab, index) => (
        <TabPanel key={index + 'queer'} value={value} index={index}>
            <Table complete={complete} undo={undo} deleteOrder={deleteOrder} print={print} columns={columns} rows={orders.length ? orders.filter( o => o.status === tab.title.toLowerCase()) : []} />
        </TabPanel>
      ))}
    </Box>
  );
}
