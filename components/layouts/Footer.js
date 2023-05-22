import {
    AppBar, Box, Toolbar, CssBaseline, IconButton, Typography, Menu, 
    Container, Avatar, Button, Tooltip, MenuItem, Card, CardActions,
    CardContent, Tabs, Tab, Paper } 
from '@mui/material/'

import { styled } from '@mui/material/styles';


export default function Footer() {
    return (<>
    <Paper sx={{
    width: '100%',
    position: 'relative',
    top: "100%",
    zIndex: "999"
    }} component="footer" square variant="outlined" className='bg-blue-500'>
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my:1
          }}
        >
            <div>
            {/* <Image priority src="/Logo.svg" width={75} height={30} alt="Logo" /> */}
            </div>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            mb: 2,
          }}
          className=' flex flex-wrap justify-evenly'
        >
          <Box>
            <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
            <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
            <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
            <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
            <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
            <h3>aaaaaaaaaaaaaaaaaaaaaaaaaaa</h3>
          </Box>
          
          <Box>
            <h3>bbbbbbbbbbbbbbbbbbbbbbbbbbbbb</h3>
            <h3>bbbbbbbbbbbbbbbbbbbbbbbbbbbbb</h3>
            <h3>bbbbbbbbbbbbbbbbbbbbbbbbbbbbb</h3>
            <h3>bbbbbbbbbbbbbbbbbbbbbbbbbbbbb</h3>
            <h3>bbbbbbbbbbbbbbbbbbbbbbbbbbbbb</h3>
            <h3>bbbbbbbbbbbbbbbbbbbbbbbbbbbbb</h3>
          </Box>
          
          <Box>
            <h3>cccccccccccccccccccccccccccccccc</h3>
            <h3>cccccccccccccccccccccccccccccccc</h3>
            <h3>cccccccccccccccccccccccccccccccc</h3>
            <h3>cccccccccccccccccccccccccccccccc</h3>
            <h3>cccccccccccccccccccccccccccccccc</h3>
            <h3>cccccccccccccccccccccccccccccccc</h3>
          </Box>
          
          <Box>
            <h3>ddddddddddddddddddddddddddddddddd</h3>
            <h3>ddddddddddddddddddddddddddddddddd</h3>
            <h3>ddddddddddddddddddddddddddddddddd</h3>
            <h3>ddddddddddddddddddddddddddddddddd</h3>
            <h3>ddddddddddddddddddddddddddddddddd</h3>
            <h3>ddddddddddddddddddddddddddddddddd</h3>
          </Box>
        </Box>
        <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          display: "flex",
          mb: 2,
        }}
        className="" 
        >
          <Typography variant="caption" color="initial">
              Copyright ©2022. [] Limited
          </Typography>
        </Box>

      </Container>
    </Paper>    
    </>)
}