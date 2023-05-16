import * as React from "react";

import {
  Button,
  Box,
  CssBaseline,
  MenuItem,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Grid,
  Checkbox,
} from "@mui/material/";

import SyncAlt from "@mui/icons-material/SyncAlt";
import PropTypes from "prop-types";
import Image from "next/image";
import { Flight } from "@mui/icons-material";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import pb from "@/lib/pocketbase";

const seats = [
  {
    value: "economy",
    label: "Economy",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "first-class",
    label: "First Class",
  },
];

const airport = [
  {
    value: "economy",
    label: "Economy",
  },
];

export default function FlightSearch() {
  const [radioValue, setRadio] = React.useState("one-way");
  const [dateValue, setDate] = React.useState(dayjs("2022-04-17"));
  const [checked, setChecked] = React.useState(true);
  const [num, setNum] = React.useState();
  const [airport, setAirport] = useState([]);

  async function getAirport() {
    try {
      const airports = await pb.collection("indonesian_airport").getFullList();
      console.log(airports);
      setAirport(airports);
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    getAirport();
  }, []);
  return (
    <FormControl
      sx={{ width: "100%", "& .MuiTextField-root": { m: 1, width: "25ch" } }}
    >
      <RadioGroup
        row
        name="row-radio-buttons-group"
        sx={{ display: "flex", justifyContent: "center" }}
        value={radioValue}
        onChange={handleRadio}
      >
        <FormControlLabel
          value="one-way"
          control={<Radio />}
          label="One-way/Round trip"
          name="same"
        />
        <FormControlLabel
          value="multi-city"
          control={<Radio />}
          name="same"
          label="Multi-city"
        />
      </RadioGroup>
      <Box className="flex flex-wrap justify-between">
        <Box className="" sx={{ maxWidth: "530px", minWidth: "300px" }}>
          <Box className="flex items-center ">
            <TextField id="origin" select label="Dari" fullWidth>
              {airport.map((apt) => (
                <MenuItem key={apt.id} value={apt.id}>
                  {apt.airport_code +
                    " " +
                    apt.airport_name +
                    " ," +
                    apt.airport_location}
                </MenuItem>
              ))}
            </TextField>

            <SyncAlt sx={{ fontSize: "30px" }} />
            <TextField id="destination" select label="Ke" fullWidth>
              {airport.map((apt) => (
                <MenuItem key={apt.id} value={apt.id}>
                  {apt.airport_code +
                    " " +
                    apt.airport_name +
                    " ," +
                    apt.airport_location}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className="flex items-center ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tanggal Pergi"
                value={dateValue}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>

            {/* <FormControlLabel control={<Checkbox />} label="Label" /> */}
          </Box>
        </Box>
        <Box className="" sx={{ maxWidth: "530px", minWidth: "300px" }}>
          <TextField
            type="number"
            id="outlined-basic"
            label="Numbers"
            variant="outlined"
            onChange={(e) => handleRegexNumber(e)}
            onSelect={(e) => handleRegexNumber(e)}
            value={num}
          />
          <TextField
            id="seats"
            select
            label="Select seat"
            defaultValue="economy"
            helperText="Please select your seat"
            type="number"
            fullWidth
          >
            {seats.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <Box className="flex justify-end">
        <Button variant="contained" className="bg-blue-500">
          Search
        </Button>
      </Box>
    </FormControl>
  );
}
