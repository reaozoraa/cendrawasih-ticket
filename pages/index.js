import * as React from 'react';

import {
AppBar, Box, Toolbar, CssBaseline, IconButton, Typography, Menu, 
Container, Avatar, Button, Tooltip, MenuItem, Card, CardActions,
CardContent, Tabs, Tab, Radio, RadioGroup, FormControl, FormControlLabel, 
FormLabel, TextField, Grid, Checkbox    } 
from '@mui/material/'

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import SyncAlt from '@mui/icons-material/SyncAlt';
import style  from '../styles/Home.module.css';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Flight } from '@mui/icons-material';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>•</Box>
);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
        <Box>
          {children}
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

const seats = [
  {
    value: "economy",
    label: "Economy"
  },
  {
    value: "business",
    label: "Business"
  },
  {
    value: "first-class",
    label: "First Class"
  },
]


function Home() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [formSection, setFormSection] = React.useState(0);
  const [radioValue, setRadio] = React.useState('one-way');
  const [dateValue, setDate] = React.useState(dayjs('2022-04-17'));

  const handleRadio = (event) => {
    setRadio(event.target.value);
  };


  const handleFormSection = (event, newValue) => {
    setFormSection(newValue);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <main className={style.main} style={{
            backgroundImage: 'url(/background.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor:"white", color: "black"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'inherit', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: "10", transform: "translateY(50%)"  }}>
        <Card sx={{ minWidth: 275, mt: "10px" }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={formSection} variant="fullWidth" onChange={handleFormSection} aria-label="">
              <Tab label="Flight" {...a11yProps(0)} />
              <Tab label="Hotel" {...a11yProps(1)} />
            </Tabs>
            
          </Box>
          <CardContent>
            <TabPanel value={formSection} index={0}>
              <FormControl sx={{ width: "100%", '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
                <RadioGroup row name="row-radio-buttons-group" sx={{ display: "flex", justifyContent: "center", }} value={radioValue} onChange={handleRadio}>
                  <FormControlLabel value="one-way" control={<Radio />} label="One-way/Round trip" name='same'  />
                  <FormControlLabel value="multi-city" control={<Radio />} name='same' label="Multi-city" />
                </RadioGroup>
                <Box className="flex flex-wrap justify-between">
                  <Box className="" sx={{ maxWidth: "530px", minWidth: "300px"  }}>
                    <Box className='flex items-center '>
                      <TextField
                        id=""
                        label="Dari"
                        defaultValue="jakarta"
                      />
                      <SyncAlt sx={{ fontSize: "30px"}} />
                      <TextField
                        id=""
                        label="Ke"
                        defaultValue="bandung"
                      />
                    </Box>
                    <Box className='flex items-center '>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Controlled picker"
                        value={dateValue}
                        onChange={(newValue) => setDate(newValue)}
                      />
                    </LocalizationProvider>

                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    </Box>
                  </Box>
                  <Box className="" sx={{ maxWidth: "530px", minWidth: "300px"  }}>
                    <TextField
                      id="seats"
                      select
                      label="Select seat"
                      defaultValue="economy"
                      helperText="Please select your seat"
                    >
                      {seats.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>
              </FormControl>
            </TabPanel>
            <TabPanel value={formSection} index={1}>
              Item Two
            </TabPanel>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </Container>
      <Container maxWidth="xl" sx={{ position: "relative", backgroundColor: "white", height: "100vh", position: "absolute", color: "black"}}>
        
      </Container>
    </main>
    </>
  );
}
export default Home;


/**
 <FormControl sx={{ width: "100%", '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
              <RadioGroup row name="row-radio-buttons-group" sx={{ display: "flex", justifyContent: "center", }} value={radioValue} onChange={handleRadio}>
                <FormControlLabel value="one-way" control={<Radio />} label="One-way/Round trip" name='same'  />
                <FormControlLabel value="multi-city" control={<Radio />} name='same' label="Multi-city" />
              </RadioGroup>
              <Box className='flex items-center '>
                <TextField
                  id=""
                  label="Dari"
                  defaultValue="jakarta"
                />
                <SyncAlt sx={{ fontSize: "30px"}} />
                <TextField
                  id=""
                  label="Ke"
                  defaultValue="bandung"
                />
              </Box>
              <Box className='flex items-center '>
                <TextField
                  id=""
                  label="Dari"
                  defaultValue="jakarta"
                />
                <FormControlLabel 
                  value="one-way" 
                  control={<Radio />} 
                  label="tanggal kembali" 
                  name='same'
                />
              </Box>
            
            </FormControl>
 */