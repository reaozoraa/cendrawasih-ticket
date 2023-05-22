import * as React from 'react';

import {
    AppBar, Box, Toolbar, CssBaseline, IconButton, Typography, Menu, 
    Container, Avatar, Button, Tooltip, MenuItem, Card, CardActions,
    CardContent, Tabs, Tab  } 
from '@mui/material/'

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { BookmarkBorder, Route } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
// import logo from '../public/brand/logo.png';

const pages = ['Saved'];
const settings = [
{
    label: "Profile",
    link: ""
},
{
    label: "Logout",
    link: "sign-in"
}];
const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>•</Box>
);

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };
    return (      
    <AppBar position="static" sx={{ backgroundColor:"white", color: "black"}}>
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            LOGO
            </Typography> */}

            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                display: { xs: 'block', md: 'none' },
                }}
            >
                {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Image
                src="/brand/title.png"
                alt="the logo"
                width={230}
                height={230}
                />
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Image
                src="/brand/logoonly.png"
                alt="the logo"
                width={50}
                height={50}
                />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}} className="flex justify-end">
            {pages.map((page) => (
                <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block'}}
                >
                <BookmarkBorder/>
                {page}
                </Button>
            ))}
            </Box>

            {/* UNAUTHENTICATED */}
            {/* <Box sx={{ flexGrow: 0 }}>
                <Button className='mx-1' color="inherit" >Login</Button>
                <Button variant="contained" className='bg-blue-500 mx-1' >Register</Button>
            </Box> */}

            {/* AUTHENTICATED */}
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                    ))} */}
                    {settings.map((option) => (
                        <MenuItem key={option.label} >
                            <Link href={option.link}>{option.label}</Link>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Toolbar>
        </Container>
    </AppBar>)
}