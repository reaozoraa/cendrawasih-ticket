import {
    AppBar, Box, Toolbar, CssBaseline, IconButton, Typography, Menu, 
    Container, Avatar, Button, Tooltip, MenuItem, Card, CardActions,
    CardContent, Tabs, Tab, Paper  } 
from '@mui/material/'

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
            justifyContent: "center",
            display: "flex",
            mb: 2,
          }}
          className='border flex flex-wrap'
        >
          <Box>
            
          </Box>
        </Box>
      </Container>
    </Paper>    
    </>)
}