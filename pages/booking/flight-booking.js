import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import {
    AppBar, Box, Toolbar, CssBaseline, IconButton, Typography, Menu, 
    Container, Avatar, Button, Tooltip, MenuItem, Card, CardActions,
    CardContent, Tabs, Tab, ThemeProvider, createTheme, CardHeader, 
    TextField, Checkbox, FormControlLabel, FormControl, InputLabel,
    Select,  } 
from '@mui/material/'
import MuiPhoneNumber from 'material-ui-phone-number-2'

import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'

// import Footer from '../../components/layouts/Footer';
// import NavbarExc from '../../components/layouts/NavbarExc';
import Warning from '@mui/icons-material/Warning';

import style  from '../../styles/Home.module.css';
import Layout from './layout'
import Image from 'next/image';



export default function FlightResult() {
  const [phone, setPhone] = useState("+62");
  const [gender, setGender] = useState("male");

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const handleForm = (e) => {
    e.preventDefault;
    alert(e.target.value);
  }

  const handleGender = (e) => {
    setGender(e.target.value)
  }

  function handleOnChange(value) {
    setPhone(value)
  }


  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* FIRST CARD */}
        <Typography variant="h5">Data Pemesan</Typography>
        <Card sx={{ maxWidth: 800, m: "10px", paddingBottom: "20px" }}>
          <CardHeader
            title="Data Pemesanan (untuk E-tiket)"
            // subheader=""
            className="border-b"
          />
          <Box sx={{ m: 2 }} className="flex flex-wrap gap-5 justify-between">
            <Box sx={{ width: 300 }} className="label-box" >
              <Typography variant='h6'>Nama Depan & Tengah (jika ada) (ex: Budi Setiawan)</Typography>
              <TextField
                required
                id=""
                label="Required"
                defaultValue=""
                {...register("testOne")} 
              />
            </Box>
            <Box sx={{ width: 300 }} className="label-box" >
              <Typography variant='h6'>Nama Belakang (ex: Genjorsaputro)</Typography>
              <TextField
                required
                id=""
                label="Required"
                defaultValue=""
                {...register("testTwo")} 
              />
            </Box>
          </Box>
          <FormControlLabel sx={{ marginLeft: "10px" }} required control={<Checkbox />} label="Required" />
          <Box sx={{ m: 2 }} className="flex flex-wrap gap-5 justify-between">
            <Box sx={{ width: 300 }} className="label-box" >
              <Typography variant='h6'>No. Handphone</Typography>
              <MuiPhoneNumber 
                variant="outlined" 
                defaultCountry={'id'}  
                // excludeCountries={[]}
                onChange={handleOnChange} 
                Width={500}
              />
              {/* <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={handleOnChange}
                className='border'
                style={{ p: "50px" }}
              /> */}
              {/* <TextField
                required
                id=""
                label="Required"
                defaultValue=""
                {...register("testThree")} 
              /> */}
            </Box>
            <Box sx={{ width: 300 }} className="label-box" >
              <Typography variant='h6'>Email</Typography>
              <TextField
                required
                id=""
                label="Required"
                defaultValue=""
                {...register("testFour")} 
              />
            </Box>
          </Box>
        </Card>
        <Box sx={{ m: 10 }}></Box>



        {/* SECOND CARD */}
        <Typography variant="h5">Detail Traveler</Typography>
        <Card sx={{ maxWidth: 800, m: "10px", paddingBottom: "20px"  }}>
          <CardHeader
            title="Dewasa 1"
            // subheader=""
            className="border-b"
          />
          <Box sx={{ p: 0 }} className="flex ">
            <Box sx={{ p: 0, m: 0, width: "5px", height: "100" }} className=" bg-orange-400" />
            <Box sx={{ p: 2 }} className=" bg-yellow-100">
              <Box>
                <Typography variant="p"><Warning className='text-yellow-500' />Detail Traveler</Typography>
                <li>Paspor dengan masa berlaku min. 6 bulan dari tanggal keberangkatan dibutuhkan untuk rute/transit ke luar negeri.</li>
                <li>Hindari kesalahan apapun dalam memasukkan nama, karena Anda mungkin tidak diperbolehkan mengoreksi setelah booking. Ketuk di bawah untuk caranya.</li>
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
            <Typography variant="p" className='text-green-500'>Penting: Paspor dengan masa berlaku min. 6 bulan 
              dari tanggal keberangkatan dibutuhkan untuk rute/transit ke luar negeri.
            </Typography>
            <Typography variant="p" className='text-yellow-500'>Pastikan nama penumpang persis seperti 
            yang tertulis di KTP/Paspor/SIM yang dikeluarkan pemerintah.
            </Typography>
            <Typography variant="p" className='text-yellow-500'>Hindari kesalahan apa pun, karena beberapa 
            maskapai tidak mengizinkan koreksi nama setelah  pemesanan.
            </Typography>
          </Box>


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
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ width: "100%" }} className="flex flex-wrap items-end gap-5 justify-between">
              <Box sx={{ width: 300 }} className="label-box" >
                <Typography variant='p'>Nama Depan & Tengah (jika ada) (ex: Budi Sentoso)</Typography>
                <TextField
                  required
                  id=""
                  label="Required"
                  defaultValue=""
                  sx={{ width: "100%" }}
                  {...register("testFive")} 
                />
              </Box>
              <Box sx={{ width: 300 }} className="label-box" >
                <Typography variant='p'>Nama Belakang (ex: Saputro)</Typography>
                <TextField
                  required
                  id=""
                  label="Required"
                  defaultValue=""
                  sx={{ width: "100%" }}
                  {...register("testSix")} 
                />
              </Box>
            </Box>
          </Box>
        </Card>
        {/* <input type="submit" /> */}
      </form>
    </Layout>
  )
}