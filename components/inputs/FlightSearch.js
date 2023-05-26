import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAmp } from "next/amp";

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

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];

export default function FlightSearch() {
  // router
  const router = useRouter();

  // const [radioValue, setRadio] = useState('one-way');
  // const [checked, setChecked] = useState(true);

  // TEXTFIELD USESTATE
  const [fromPlace, setFrom] = useState("jakarta");
  const [toPlace, setTo] = useState("halim");
  const [dateValue, setDate] = useState(dayjs("2022-04-17"));
  // const [returnDate, setReturnDate] = useState(null);
  // const [passenger, setPassenger] = useState(null);
  const [seat, setSeat] = useState("economy");
  const [num, setNum] = useState(1);

  const handleRegexNumber = (e) => {
    setNum(e.target.value);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleRadio = (event) => {
    setRadio(event.target.value);
  };

  const handleSearchFlight = (e) => {
    e.preventDefault();
    // router.push(`/search-result/flight-result?fp=${fromPlace}&tp=${toPlace}&dt=${dateValue}&ps=${num}&st=${seat}`);

    router.push({
      pathname: "/search-result/flight-result",
      query: {
        fp: fromPlace,
        tp: toPlace,
        dt: `${dateValue}`,
        ps: num,
        st: seat,
      },
    });
  };

  // useEffect(() => {
  //   console.log(seat)
  // }, [seat]);

  return (
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
          <Box className="flex items-center ">
            {/* <TextField
                        id=""
                        label="Dari"
                        defaultValue="jakarta"
                    /> */}
            <Autocomplete
              id="demo"
              freeSolo
              defaultValue={fromPlace}
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  value={fromPlace}
                  onChange={(e) => {
                    setFrom(e.target.value);
                  }}
                  {...params}
                  label="Dari"
                />
              )}
            />
            <SyncAlt sx={{ fontSize: "30px" }} />
            <Autocomplete
              id="demo"
              freeSolo
              defaultValue={toPlace}
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  value={toPlace}
                  onChange={(e) => {
                    setTo(e.target.value);
                  }}
                  {...params}
                  label="Ke"
                />
              )}
            />
            {/* <TextField
                        id=""
                        label="Ke"
                        defaultValue="bandung"
                    /> */}
          </Box>
          <Box className="flex items-center ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tanggal Pergi"
                value={dateValue}
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
          onClick={handleSearchFlight}
        >
          Search
        </Button>
      </Box>
    </FormControl>
  );
}
