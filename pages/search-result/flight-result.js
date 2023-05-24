import {
    AppBar, Box, Toolbar, CssBaseline, IconButton, Typography, Menu, 
    Container, Avatar, Button, Tooltip, MenuItem, Card, CardActions,
    CardContent, Tabs, Tab, ThemeProvider, createTheme, CardHeader  } 
from '@mui/material/'

import Footer from '../../components/layouts/Footer';
import Navbar from '../../components/layouts/Navbar';

import style  from '../../styles/Home.module.css';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

const buttonTheme = createTheme({
    status: {
      danger: '#FF6610',
    },
    palette: {
      primary: {
        main: '#FF6610',
        darker: '#FF6610',
      },
      neutral: {
        main: '#FF6610',
        contrastText: '#FF6610',
      },
    },
  });

export default function FlightResult() {



    return (
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
        <Typography variant='h5' className='text-blue-500'>Hasil Pencarian</Typography>
        <Card sx={{ minWidth: 275, my: "10px" }}>
            <CardHeader
                title="Airline name"
                // subheader="September 14, 2016"
            />
            <Box sx={{ mx: "10px" }} className="flex wrap items-end">
                <Box sx={{ minWidth: "600px" }} className="flex grow items-center justify-between">
                    <Box className="text-center">
                        <Typography variant='p'>Bandara Soekarno Hatta</Typography>
                        <Typography variant='h6'>Tangerang</Typography>
                        <Typography variant='p'>Sabtu, 14 Jul 2023, Pukul 16:00</Typography>
                    </Box>
                    <TrendingFlatIcon sx={{ fontSize: "50px" }} className='text-blue-500' />
                    <Box className="text-center">
                        <Typography variant='p'>Bandara Halim Perdanakusuma</Typography>
                        <Typography variant='h6'>Jakarta</Typography>
                        <Typography variant='p'>Sabtu, 14 Jul 2023, Pukul 17:00</Typography>
                    </Box>
                </Box>
                <Box sx={{ ml: "5%" }}>
                    <ThemeProvider theme={buttonTheme}>
                        <Box sx={{ maxWidth: "200px" }} className="text-right">
                            <Typography wrap variant='p'><span className='text-orange-600'>Rp 1.900.000</span>/org</Typography>
                            <Button fullWidth variant="contained" className='bg-orange-500 text-white' >Pilih</Button>
                        </Box>
                    </ThemeProvider>
                </Box>
            </Box>
            <CardContent>
                {/* <Box className='flex justify-end'>
                <ThemeProvider theme={buttonTheme}>
                    <Box sx={{ maxWidth: "200px" }} className="text-right">
                        <Typography wrap variant='p'><span className='text-orange-600'>Rp 1.900.000</span>/org</Typography>
                        <Button fullWidth variant="contained" className='bg-orange-500 text-white' >Pilih</Button>
                    </Box>
                </ThemeProvider>
                </Box> */}
            </CardContent>  
        </Card>
          
      </Container>
      <Footer />
      
    </main>
    )
}