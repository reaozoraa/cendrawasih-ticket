import * as React from 'react';
import {
AppBar, Box, Toolbar, CssBaseline, createTheme, IconButton, Typography, Menu, 
Container, Avatar, Button, Tooltip, MenuItem, Card, CardActions,
CardContent, Tabs, Tab, ThemeProvider  } 
from '@mui/material/'

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import style  from '../styles/Home.module.css';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Flight, Hotel, LocalHotelOutlined } from '@mui/icons-material';
import { Questrial } from 'next/font/google'


import Footer from '../components/layouts/Footer';
import Navbar from '../components/layouts/Navbar';
import FlightSearch from '../components/inputs/search/FlightSearch';
import HotelSearch from '../components/inputs/search/HotelSearch';

const questrial = Questrial({
  subsets: ['latin'],
  weight: ['400'],
})

const theme = createTheme({
  typography: {
    fontFamily: questrial.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: questrial.style.fontFamily;
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});


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

function Home() {
  const [formSection, setFormSection] = React.useState(0);


  const handleFormSection = (event, newValue) => {
    setFormSection(newValue);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
    <main className={style.main} style={{
            backgroundImage: 'url(/background.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="auto"  sx={{height: "300px"}} />
      <Container maxWidth="auto"  sx={{backgroundColor: "white", height: "100vh", position: "absolute", color: "black"}}>
        {/* transform: "translateY(50%)"  */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: "10", transform: "translateY(-70%)" }}>
          <Card sx={{ minWidth: 275, mt: "10px" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={formSection} variant="fullWidth" onChange={handleFormSection} aria-label="">
                <Tab label={ <div className='flex text-lg'><Flight /> Flight</div> } {...a11yProps(0)}  />
                <Tab label={ <div className='flex text-lg'><Hotel />  Hotel</div> } {...a11yProps(1)}  />
                {/* <Tab icon={<Flight />} label="Flight" {...a11yProps(0)}  />
                <Tab icon={<Hotel />} label="Hotel" {...a11yProps(1)}  /> */}
              </Tabs>
              
            </Box>
            <CardContent>
              <TabPanel value={formSection} index={0}>
                <FlightSearch />
              </TabPanel>
              <TabPanel value={formSection} index={1}>
                <HotelSearch></HotelSearch>
              </TabPanel>
            </CardContent>  
          </Card>
        </Container>
        {/* <Container maxWidth="auto"  sx={{backgroundColor: "blue", height: "50%", height: "300px"}} /> */}
        {/* content */}
      </Container>
      <Footer />
      
    </main>
    </ThemeProvider>
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