import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import validator from "@/utils/validator";
// import objectSearcher from "@/utils/objectSearcher";

import {
  Button,
  Box,
  Typography,
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
  InputLabel,
  OutlinedInput,
  Autocomplete,
  Stack,
} from "@mui/material/";

import SyncAlt from "@mui/icons-material/SyncAlt";
import East from "@mui/icons-material/East";
import PropTypes from "prop-types";
import Image from "next/image";
import { Flight } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";
import toObject from "dayjs/plugin/toObject";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAmp } from "next/amp";
import pb from "@/lib/pocketbase";
import { Tomorrow } from "next/font/google";

dayjs.extend(toObject);

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

export default function FlightSearch() {
  // router
  const router = useRouter();
  const [airport, setAirport] = useState([]);

  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const loadingTwo = openTwo && options.length === 0;

  async function getAirport() {
    try {
      const airports = await pb.collection("indonesian_airport").getFullList();
      console.log(airports[0]);
      setOptions(airports);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      // ASYNC HERE
      if (active) {
        getAirport();
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    let active = true;
    if (!loadingTwo) {
      return undefined;
    }
    (async () => {
      // ASYNC HERE
      if (active) {
        getAirport();
      }
    })();
    return () => {
      active = false;
    };
  }, [loadingTwo]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [dateError, setDateError] = useState(null);

  // .subtract(1, 'day')
  const yesterday = dayjs();
  const tomorrow = dayjs().add(5, "year");

  // TEXTFIELD USESTATE
  const [fromPlace, setFrom] = useState(null);
  const [toPlace, setTo] = useState(null);
  const [dateValue, setDate] = useState(dayjs());
  const [seat, setSeat] = useState("economy");
  const [num, setNum] = useState(1);

  const handleSearchFlight = (e) => {
    e.preventDefault();
    // router.push(`/search-result/flight-result?fp=${fromPlace}&tp=${toPlace}&dt=${dateValue}&ps=${num}&st=${seat}`);
    const flightInputs = [
      fromPlace,
      toPlace,
      `${dateValue}`,
      parseInt(num),
      seat,
    ];
    if (validator(flightInputs)) {
      setErrorMessage("*please fill up the form with the right value");
      return;
    }
    setErrorMessage(null);

    const dateObject = dateValue.toObject();
    const dateToString = `${dateObject.months + 1}-${dateObject.date}-${
      dateObject.years
    }`;
    router.push({
      pathname: "/search-result/flight-result",
      query: {
        fp: fromPlace,
        tp: toPlace,
        dt: dateToString,
        ps: num,
        st: seat,
      },
    });
  };

  useEffect(() => {
    console.log(fromPlace, toPlace);
  }, [dateError, fromPlace, toPlace]);

  return (
    <form onSubmit={(e) => handleSearchFlight(e)}>
      <FormControl
        sx={{ width: "100%", "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      >
        {/* <RadioGroup row name="row-radio-buttons-group" sx={{ display: "flex", justifyContent: "center", }} value={radioValue} onChange={handleRadio}>
            <FormControlLabel value="one-way" control={<Radio />} label="One-way/Round trip" name='same'  />
            <FormControlLabel value="multi-city" control={<Radio />} name='same' label="Multi-city" />
            </RadioGroup> */}
        <Box className="flex flex-wrap justify-between">
          {/* <Typography variant="h4"></Typography> */}
          <Box className="" sx={{ maxWidth: "530px", minWidth: "300px" }}>
            {errorMessage && (
              <Typography
                variant="h6"
                className="text-red-500 m-0 p-0"
                sx={{ marginLeft: 2 }}
              >
                {errorMessage}
              </Typography>
            )}
            <Box className="flex items-center flex-wrap">
              {/* <TextField
                        id=""
                        label="Dari"
                        defaultValue="jakarta"
                    /> */}
              <Autocomplete
                required
                id="asynchronous"
                // sx={{ width: 300 }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.airport_location}
                    </li>
                  );
                }}
                autoHighlight
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                isOptionEqualToValue={(option, value) =>
                  option.airport_location === value.airport_location
                }
                getOptionLabel={(option) => option.airport_location}
                onChange={(event, value) => setFrom(value.id)}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Dari"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <SyncAlt sx={{ fontSize: "30px" }} />
              <Autocomplete
                required
                id="asynchronous-two"
                // sx={{ width: 300 }}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id}>
                      {option.airport_location}
                    </li>
                  );
                }}
                autoHighlight
                open={openTwo}
                onOpen={() => setOpenTwo(true)}
                onClose={() => setOpenTwo(false)}
                isOptionEqualToValue={(option, value) =>
                  option.airport_location === value.airport_location
                }
                getOptionLabel={(option) => option.airport_location}
                onChange={(event, value) => setTo(value.id)}
                options={options}
                loading={loadingTwo}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ke"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingTwo ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Box>
            <Box className="flex items-center ">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Tanggal Pergi"
                  value={dateValue}
                  onError={(newError) => setDateError(newError)}
                  minDate={yesterday}
                  maxDate={tomorrow}
                  onChange={(newValue) => setDate(newValue)}
                />
              </LocalizationProvider>
              {/* <East sx={{ fontSize: "30px"}}></East>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Tanggal Pergi"
                        value={dateValue}
                        onChange={(newValue) => setDate(newValue)}
                    />
                    </LocalizationProvider>    */}

              {/* <FormControlLabel control={<Checkbox />} label="Label" /> */}
            </Box>
          </Box>
          <Box className="" sx={{ maxWidth: "300px", minWidth: "300px" }}>
            <TextField
              type="number"
              id="outlined-basic"
              label="Jumlah Penumpang"
              variant="outlined"
              onChange={(e) => setNum(e.target.value)}
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              // onSelect={(e) => handleRegexNumber(e)}
              value={num}
            />
            {/* <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="">Numbers</InputLabel>
                    <OutlinedInput
                    type="number"
                    id=""
                    label="Numbers"
                    // variant="outlined"
                    onChange={(e) => handleRegexNumber(e)}
                    onSelect={(e) => handleRegexNumber(e)}
                    value={num}
                    />
                </FormControl> */}
            <TextField
              id="seats"
              select
              label="Kelas Penerbangan"
              defaultValue={seat}
              value={seat}
              helperText="Please select your seat"
              type="number"
              onChange={(e) => setSeat(e.target.value)}
              // fullWidth
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
          <Button
            variant="contained"
            className="bg-blue-500"
            // onClick={handleSearchFlight}
            type="submit"
          >
            Search
          </Button>
        </Box>
      </FormControl>
    </form>
  );
}
