import * as React from 'react';
import { useState } from "react";


import {
Button, Box, CssBaseline, MenuItem, Radio, RadioGroup, FormControl, FormControlLabel, 
FormLabel, TextField, Grid, Checkbox, InputLabel, OutlinedInput, InputAdornment} 
from '@mui/material/'

import SyncAlt from '@mui/icons-material/SyncAlt';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Flight } from '@mui/icons-material';

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router';


const duration = [
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


const durations = (loops) => {
    const rows = [];
    for (let i = 1; i < loops; i++) {
        rows.push(
            <MenuItem key={i} value={i}>
                {i} malam
            </MenuItem>
        );
    }
    return rows;
};


export default function FlightSearch() {
    const [radioValue, setRadio] = useState('one-way');
    const [dateValue, setDate] = useState(dayjs('2022-04-17'));
    const [checked, setChecked] = useState(true);
    const [num, setNum] = useState();
    const router = useRouter()
    // const { nama_hotel } = router.query
  
    const handleRegexNumber = (e) => {
      const regex = /^[0-9\b]+$/;
      if (e.target.value === "" || regex.test(e.target.value)) {
        setNum(e.target.value);
      }
    };
  
  
    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
  
  
    const handleRadio = (event) => {
      setRadio(event.target.value);
    };
  

    return (
        <FormControl sx={{ width: "100%", '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
            <Box className="flex flex-wrap justify-between">
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="">Place</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Place"
                    />
                </FormControl>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <Box className='flex justify-between flex-wrap '>
                    <Grid item xs className=" flex-grow">
                        <DatePicker
                            label="Tanggal Check-in"
                            value={dateValue}
                            onChange={(newValue) => setDate(newValue)}
                        />
                    </Grid>
                    <Grid item xs className=" flex-grow">
                        <TextField
                        id="seats"
                        select
                        label="Duration"
                        defaultValue="1"
                        type="number"
                        fullWidth
                        >
                            {durations(31)}
                        </TextField>
                    </Grid>  
                    <Grid item xs className=" flex-grow">
                        <TextField 
                        type="number"
                        id="outlined-basic"
                        label="Jumlah Tamu"
                        variant="outlined"
                        onChange={(e) => handleRegexNumber(e)}
                        onSelect={(e) => handleRegexNumber(e)}
                        value={num}
                        />
                    </Grid>
                    <Grid item xs className=" flex-grow">
                        <TextField 
                        type="number"
                        id="outlined-basic"
                        label="Jumlah Kamar"
                        variant="outlined"
                        onChange={(e) => handleRegexNumber(e)}
                        onSelect={(e) => handleRegexNumber(e)}
                        value={num}
                        />
                    </Grid>
                    {/* <FormControlLabel control={<Checkbox />} label="Label" /> */}
                </Box>
            </LocalizationProvider> 
            {/* <Box className="flex flex-wrap justify-between border" >
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="">Place</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        label="Place"
                    />
                </FormControl>
            </Box>
             */}
            <Box className='flex justify-end'>
                <Button variant="contained" className='bg-blue-500' >Search</Button>
            </Box>

        </FormControl>)
}