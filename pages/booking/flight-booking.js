import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  AppBar,
  Autocomplete,
  Box,
  Toolbar,
  CssBaseline,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Card,
  CardActions,
  CardContent,
  Tabs,
  Tab,
  ThemeProvider,
  createTheme,
  CardHeader,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material/";
import MuiPhoneNumber from "material-ui-phone-number-2";

// import "react-phone-number-input/style.css";
// import PhoneInput from 'react-phone-number-input'

import Footer from "@/components/layouts/Footer";
// import NavbarExc from '../../components/layouts/NavbarExc';
import Warning from "@mui/icons-material/Warning";

import style from "../../styles/Home.module.css";
import Layout from "./layout";
import Image from "next/image";
import countries from "@/lib/countries";
import pb from "@/lib/pocketbase";

export function getServerSideProps(ctx) {
  const { fpl, tpl, dtd, dta, ps, st, air, tk } = ctx.query;
  if (!fpl || !tpl || !dtd || !dta || !ps || !st || !air || !tk) {
    // return {
    //   redirect: {
    //     destination: "/",
    //   },
    // };
    return {
      notFound: true,
    };
  }
  return {
    props: {
      fpl,
      tpl,
      dtd,
      dta,
      ps,
      st,
      air,
      tk,
    },
  };
}

export default function FlightResult({ fpl, tpl, dtd, dta, ps, st, air, tk }) {
  const router = useRouter();
  const [gender, setGender] = useState("male");
  const [dateValue, setDate] = useState(dayjs());
  const [dateValueExpire, setDateExpire] = useState(dayjs());
  const [dateError, setDateError] = useState(null);
  const [phoneErr, setPhoneErr] = useState(null);
  // const [num, setNum] = useState(null);

  // MANUAL
  const [phone, setPhone] = useState(null);
  const [citizen, setCitizen] = useState();
  const [issuing, setIssuing] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchAllFields = watch();

  const onSubmit = (data) => {
    if (!phone || phone.length <= 6 || phone.length >= 15) {
      setPhoneErr("Invalid phone number input");
      return;
    }
    setPhoneErr(null);
    const spacelessPhone = phone.replace(/\s+/g, "");
    data.phone = spacelessPhone;
    data.citizenship = citizen;
    data.issuingCountry = issuing;
    // console.log(data);
    router.push({
      pathname: "../booking/flight-payment",
      query: {
        ctz: data.citizenship,
        dpE: data.dpEmail,
        dpFn: data.dpFirstname,
        dpLn: data.dpLastname,
        issC: data.issuingCountry,
        pn: data.phone,
        pspD: data.pspDate,
        pspExp: data.pspExpire,
        pspFn: data.pspFirstname,
        pspG: data.pspGender,
        pspLn: data.pspLastname,
        pspPp: data.pspPassport,
        fpl: fpl,
        tpl: tpl,
        dtd: dtd,
        dta: dta,
        ps: ps,
        st: st,
        air: air,
        tk: tk,
      },
    });
  };

  const minDate = dayjs();
  const maxDate = dayjs();

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  function handleOnChange(value) {
    setPhone(value);
  }

  return (
    <Layout stage={0}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* FIRST CARD */}
        <Typography variant="h5">Data Pemesan</Typography>
        <Card sx={{ maxWidth: 800, m: "10px", paddingBottom: "20px" }}>
          <CardHeader
            title="Data Pemesanan (untuk E-tiket)"
            // subheader=""
            className=""
          />
          <Box sx={{ m: 2 }} className="flex flex-wrap gap-5 justify-between">
            <Box sx={{ width: 300 }} className="label-box">
              <Typography variant="h6">
                Nama Depan & Tengah (jika ada) (ex: Budi Setiawan)
              </Typography>
              <TextField
                required
                // {errors.mail ? "true" : "false"}
                id=""
                defaultValue=""
                {...register("dpFirstname", { required: true, maxLength: 20 })}
              />
            </Box>
            <Box sx={{ width: 300 }} className="label-box">
              <Typography variant="h6">
                Nama Belakang (ex: Genjorsaputro)
              </Typography>
              <TextField
                required
                id=""
                defaultValue=""
                {...register("dpLastname", { required: true, maxLength: 20 })}
              />
            </Box>
          </Box>
          {/* <FormControlLabel
            sx={{ marginLeft: "10px" }}
            required
            control={<Checkbox />}
          /> */}
          <Box sx={{ m: 2 }} className="flex flex-wrap gap-5 justify-between">
            <Box sx={{ width: 300 }} className="label-box">
              <Typography variant="h6">No. Handphone</Typography>
              <MuiPhoneNumber
                // id="phoneNum"
                variant="outlined"
                defaultCountry={"id"}
                // excludeCountries={[]}
                onChange={handleOnChange}
                width={500}
                // error={phone ? true : false}
                // {...register("dp-noHP")}
              />
              {/* <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={handleOnChange}
                className
                style={{ p: "50px" }}
              /> */}
              {/* <TextField
                required
                id=""
                
                defaultValue=""
                {...register("testThree")} 
              /> */}
            </Box>
            <Box sx={{ width: 300 }} className="label-box">
              <Typography variant="h6">Email</Typography>
              <TextField
                required
                id=""
                defaultValue=""
                {...register("dpEmail", {
                  required: "Email is required",
                  validate: {
                    maxLength: (v) =>
                      v.length <= 50 ||
                      "The email should have at most 50 characters",
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email address must be a valid address",
                  },
                })}
              />
            </Box>
          </Box>
        </Card>
        <Box sx={{ m: 10 }}></Box>

        {/* SECOND CARD */}
        <Box className="">
          <Typography variant="h5">Detail Traveler</Typography>
          <Card sx={{ maxWidth: 800, m: "10px", paddingBottom: "20px" }}>
            <CardHeader
              title="Data penumpang"
              // subheader=""
              className=""
            />

            {/* DISCLAIMER */}
            <Box sx={{ p: 0 }} className="flex ">
              <Box
                sx={{ p: 0, m: 0, width: "5px", height: "100" }}
                className=" bg-orange-400"
              />
              <Box sx={{ p: 2 }} className=" bg-yellow-100">
                <Box>
                  <Typography variant="p">
                    <Warning className="text-yellow-500" />
                    Detail Traveler
                  </Typography>
                  <li>
                    Paspor dengan masa berlaku min. 6 bulan dari tanggal
                    keberangkatan dibutuhkan untuk rute/transit ke luar negeri.
                  </li>
                  <li>
                    Hindari kesalahan apapun dalam memasukkan nama, karena Anda
                    mungkin tidak diperbolehkan mengoreksi setelah booking.
                    Ketuk di bawah untuk caranya.
                  </li>
                </Box>
              </Box>
            </Box>
            <Box sx={{ m: 2 }} className="flex flex-wrap gap-5 justify-between">
              <Image
                src="/images/example-passport.png"
                alt="the image"
                width={530}
                height={230}
              />
            </Box>
            <Box sx={{ m: 2 }} className="flex flex-wrap gap-5 justify-between">
              <Typography variant="p" className="text-green-500">
                Penting: Paspor dengan masa berlaku min. 6 bulan dari tanggal
                keberangkatan dibutuhkan untuk rute/transit ke luar negeri.
              </Typography>
              <Typography variant="p" className="text-yellow-500">
                Pastikan nama penumpang persis seperti yang tertulis di
                KTP/Paspor/SIM yang dikeluarkan pemerintah.
              </Typography>
              <Typography variant="p" className="text-yellow-500">
                Hindari kesalahan apa pun, karena beberapa maskapai tidak
                mengizinkan koreksi nama setelah pemesanan.
              </Typography>
            </Box>
            {/* DISCLAIMER END */}

            {/* PASSPORT FORM */}
            <Box sx={{ m: 2 }} className="flex flex-wrap gap-5 justify-between">
              <FormControl sx={{ width: "120px" }}>
                <InputLabel id="simple-select-label">Gender</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  value={gender}
                  defaultValue={gender}
                  label="Gender"
                  onChange={handleGender}
                  {...register("pspGender")}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <Box
                sx={{ width: "100%" }}
                className="flex flex-wrap items-end gap-5 justify-between"
              >
                <Box sx={{ width: 300 }} className="label-box">
                  <Typography variant="p">
                    Nama Depan & Tengah (jika ada) (ex: Budi Sentoso)
                  </Typography>
                  <TextField
                    required
                    id=""
                    defaultValue=""
                    sx={{ width: "100%" }}
                    {...register("pspFirstname", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </Box>
                <Box sx={{ width: 300 }} className="label-box">
                  <Typography variant="p">
                    Nama Belakang (ex: Saputro)
                  </Typography>
                  <TextField
                    required
                    id=""
                    defaultValue=""
                    sx={{ width: "100%" }}
                    {...register("pspLastname", {
                      required: true,
                      maxLength: 20,
                    })}
                  />
                </Box>
              </Box>
              <Box
                sx={{ width: "100%" }}
                className="flex flex-wrap items-end gap-5 justify-between"
              >
                <Box sx={{ width: 300 }} className="label-box">
                  <Typography variant="p">Tanggal Lahir</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      // label="Tanggal Pergi"
                      maxDate={maxDate}
                      value={dateValue}
                      onChange={(newValue) => setDate(newValue)}
                      {...register("pspDate")}
                    />
                  </LocalizationProvider>
                </Box>
                <Box sx={{ width: 300 }} className="label-box">
                  <Typography variant="p">Kewarganegaraan</Typography>
                  <Autocomplete
                    required
                    id="country-select-demo"
                    sx={{ width: 300 }}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    // {...register("psp-citizenship")}
                    onChange={(event, value) => setCitizen(value.label)}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        {option.label} ({option.code})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // label="Choose a country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>

              {/*  */}
              <Box
                sx={{ width: "100%" }}
                className="flex flex-wrap items-end gap-5 justify-between"
              >
                <Box sx={{ width: 300 }} className="label-box">
                  <Typography variant="p">Nomor Paspor</Typography>
                  {/* <TextField
                    type="number"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={(e) => setNum(e.target.value)}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    // onSelect={(e) => handleRegexNumber(e)}
                    value={num}
                    {...register("passport-number", { min: 18, max: 99 })}
                  /> */}
                  <TextField
                    fullWidth
                    required
                    id=""
                    defaultValue=""
                    {...register("pspPassport", {
                      required: true,
                      maxLength: 20,
                    })}
                    inputProps={{ style: { textTransform: "uppercase" } }}
                  />
                </Box>
                <Box sx={{ width: 300 }} className="label-box">
                  <Typography variant="p">Negara Penerbit</Typography>
                  <Autocomplete
                    required
                    id="country-select-demo"
                    sx={{ width: 300 }}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    // {...register("psp-issuing-country")}
                    onChange={(event, value) => setIssuing(value.label)}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        {option.label} ({option.code})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // label="Choose a country"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box sx={{ width: 300 }} className="label-box">
                <Typography variant="p">Tanggal Habis Berlaku</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // label="Tanggal Pergi"
                    // minDate={minDate}
                    value={dateValueExpire}
                    {...register("pspExpire")}
                    onChange={(newValue) => setDateExpire(newValue)}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            {phoneErr ? (
              <Typography variant="h6" color="red" sx={{ m: 2 }}>
                {phoneErr}
              </Typography>
            ) : null}
          </Card>
          {/* <input type="submit" /> */}
          <Button variant="contained" className="bg-blue-500 m-2" type="submit">
            Lanjut
          </Button>
        </Box>
      </form>
    </Layout>
  );
}

{
  /* <TextField
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
/>; */
}
