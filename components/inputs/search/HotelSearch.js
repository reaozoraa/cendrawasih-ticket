import * as React from 'react';


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

const durations = 30;


export default function FlightSearch() {
    const [radioValue, setRadio] = React.useState('one-way');
    const [dateValue, setDate] = React.useState(dayjs('2022-04-17'));
    const [checked, setChecked] = React.useState(true);
    const [num, setNum] = React.useState();
  
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
            <Box className='flex items-center '>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Tanggal Check-in"
                    value={dateValue}
                    onChange={(newValue) => setDate(newValue)}
                />
                </LocalizationProvider>   
                <TextField
                id="seats"
                select
                label="Select seat"
                defaultValue="1"
                type="number"
                fullWidth
                >
                    {duration.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {/* <FormControlLabel control={<Checkbox />} label="Label" /> */}
            </Box>
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
            
            <Box className='flex justify-end'>
                <Button variant="contained" className='bg-blue-500'>Search</Button>
            </Box>

        </FormControl>)
}