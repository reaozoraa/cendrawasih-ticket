import React from "react";
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

// function Forms(passangers, initialG, initialD) {

//   return (

//   );
// }

export default function FlightResult({ fpl, tpl, dtd, dta, ps, st, air, tk }) {
  const router = useRouter();
  const [dateValue, setDate] = useState(dayjs());
  const [dateValueExpire, setDateExpire] = useState(dayjs());
  const [dateError, setDateError] = useState(null);
  const [phoneErr, setPhoneErr] = useState(null);

  const [forms, setForms] = useState([]);

  useEffect(() => {
    for (let i = 0; i < parseInt(ps); i++) {
      setForms((prev) => [
        ...prev,
        {
          idx: i,
          gender: "",
          first_name: "",
          last_name: "",
          birthday: dayjs(),
          citizenship: "Indonesia",
          issuing_country: "Indonesia",
          passport: "",
          expiration_date: dayjs(),
          input_country: "Indonesia",
          input_issuing_country: "Indonesia",
        },
      ]);
    }
  }, [ps]);
  // const [num, setNum] = useState(null);

  // MANUAL
  const [phone, setPhone] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchAllFields = watch();

  const onSubmit = async (data) => {
    if (!phone || phone.length <= 6 || phone.length >= 15) {
      setPhoneErr("Invalid phone number input");
      return;
    }
    setPhoneErr(null);
    const spacelessPhone = phone.replace(/\s+/g, "");
    data.phone = spacelessPhone;
    // data.citizenship = citizen;
    // data.issuingCountry = issuing;
    let dataIds = [];
    for (const form of forms) {
      const data = {
        gender: form.gender,
        first_name: form.first_name,
        last_name: form.last_name,
        birth: form.birthday,
        citizenship: form.citizenship,
        issuing_country: form.issuing_country,
        expire_date: form.expiration_date,
      };
      const costumerIdentity = await pb
        .collection("customer_identity")
        .create(data);
      dataIds.push(costumerIdentity.id);
    }
    data.costumers = dataIds;
    const costumerData = await pb.collection("costumer_data").create(data);
  };

  // const handleGender = (e) => {
  //   setGender(e.target.value);
  // };

  const handleChangeForm = (e, idx) => {
    setForms((prev) =>
      prev.map((passanger) => {
        if (passanger.idx == idx) {
          return {
            ...passanger,
            [e.target.name]: e.target.value,
          };
        }

        return passanger;
      })
    );
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
        <Box sx={{ m: 10 }}>
          <Typography variant="h5">Detail Traveler</Typography>
          {forms.map((passangers) => (
            <Box className="" key={passangers.idx}>
              <Card sx={{ maxWidth: 800, m: "10px", paddingBottom: "20px" }}>
                <CardHeader title="Data penumpang" className="" />
                {/* DISCLAIMER */}
                {passangers == 0 ? (
                  <Box>
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
                            keberangkatan dibutuhkan untuk rute/transit ke luar
                            negeri.
                          </li>
                          <li>
                            Hindari kesalahan apapun dalam memasukkan nama,
                            karena Anda mungkin tidak diperbolehkan mengoreksi
                            setelah booking. Ketuk di bawah untuk caranya.
                          </li>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{ m: 2 }}
                      className="flex flex-wrap gap-5 justify-between"
                    >
                      <Image
                        src="/images/example-passport.png"
                        alt="the image"
                        width={530}
                        height={230}
                      />
                    </Box>
                    <Box
                      sx={{ m: 2 }}
                      className="flex flex-wrap gap-5 justify-between"
                    >
                      <Typography variant="p" className="text-green-500">
                        Penting: Paspor dengan masa berlaku min. 6 bulan dari
                        tanggal keberangkatan dibutuhkan untuk rute/transit ke
                        luar negeri.
                      </Typography>
                      <Typography variant="p" className="text-yellow-500">
                        Pastikan nama penumpang persis seperti yang tertulis di
                        KTP/Paspor/SIM yang dikeluarkan pemerintah.
                      </Typography>
                      <Typography variant="p" className="text-yellow-500">
                        Hindari kesalahan apa pun, karena beberapa maskapai
                        tidak mengizinkan koreksi nama setelah pemesanan.
                      </Typography>
                    </Box>
                  </Box>
                ) : null}

                {/* PASSPORT FORM */}
                <Box
                  sx={{ m: 2 }}
                  className="flex flex-wrap gap-5 justify-between"
                >
                  <FormControl sx={{ width: "120px" }}>
                    <InputLabel id="simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      label="Gender"
                      name="gender"
                      value={passangers.gender}
                      onChange={(e) => handleChangeForm(e, passangers.idx)}
                      // {...register("pspGender")}
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
                        name="first_name"
                        value={passangers.first_name}
                        onChange={(e) => handleChangeForm(e, passangers.idx)}
                        // {...register("pspFirstname", {
                        //   required: true,
                        //   maxLength: 20,
                        // })}
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
                        name="last_name"
                        value={passangers.last_name}
                        onChange={(e) => handleChangeForm(e, passangers.idx)}
                        // {...register("pspLastname", {
                        //   required: true,
                        //   maxLength: 20,
                        // })}
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
                          value={passangers.birthday}
                          onChange={(e) => {
                            e = {
                              ...e,
                              target: {
                                ...e.target,
                                name: "birthday",
                              },
                            };
                            handleChangeForm(e, passangers.idx);
                          }}
                          // {...register("pspDate")}
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
                        getOptionLabel={(option) =>
                          option.label ?? passangers.citizenship
                        }
                        inputValue={passangers.input_country}
                        onInputChange={(e, value) => {
                          e = {
                            ...e,
                            target: {
                              name: "input_country",
                              value: value ?? "",
                            },
                          };
                          handleChangeForm(e, passangers.idx);
                        }}
                        value={passangers.citizenship}
                        onChange={(e, value) => {
                          console.log(value);
                          e = {
                            ...e,
                            target: {
                              name: "input_country",
                              value: value ?? "",
                            },
                          };
                          handleChangeForm(e, passangers.idx);
                          e = {
                            ...e,
                            target: {
                              name: "citizenship",
                              value: value ?? "",
                            },
                          };
                          handleChangeForm(e, passangers.idx);
                        }}
                        // {...register("psp-citizenship")}
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
                      <TextField
                        fullWidth
                        required
                        id=""
                        name="passport"
                        value={passangers.passport}
                        onChange={(e) => handleChangeForm(e, passangers.idx)}
                        // {...register("pspPassport", {
                        //   required: true,
                        //   maxLength: 20,
                        // })}
                        inputProps={{
                          style: { textTransform: "uppercase" },
                        }}
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
                        getOptionLabel={(option) =>
                          option.label ?? passangers.issuing_country
                        }
                        inputValue={passangers.input_issuing_country}
                        onInputChange={(e, value) => {
                          e = {
                            ...e,
                            target: {
                              name: "input_issuing_country",
                              value: value ?? "",
                            },
                          };
                          handleChangeForm(e, passangers.idx);
                        }}
                        value={passangers.issuing_country}
                        onChange={(e, value) => {
                          console.log(value);
                          e = {
                            ...e,
                            target: {
                              name: "input_issuing_country",
                              value: value ?? "",
                            },
                          };
                          handleChangeForm(e, passangers.idx);
                          e = {
                            ...e,
                            target: {
                              name: "issuing_country",
                              value: value ?? "",
                            },
                          };
                          handleChangeForm(e, passangers.idx);
                        }}
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
                        value={passangers.expiration_date}
                        onChange={(e) => {
                          e = {
                            ...e,
                            target: {
                              ...e.target,
                              name: "expiration_date",
                            },
                          };
                          handleChangeForm(e, passangers.idx);
                        }}
                        // {...register("pspExpire")}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Card>
              {/* <input type="submit" /> */}
            </Box>
          ))}
        </Box>

        <Button variant="contained" className="bg-blue-500 m-2" type="submit">
          Lanjut
        </Button>
        {phoneErr ? (
          <Typography variant="h6" color="red" sx={{ m: 2 }}>
            {phoneErr}
          </Typography>
        ) : null}
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
