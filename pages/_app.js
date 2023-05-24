import '@/styles/globals.css'
import { Questrial } from 'next/font/google'
import { createTheme, ThemeProvider } from '@mui/material/'

const questrial = Questrial({
  subsets: ['latin'],
  weight: ['400'],
})

const theme = createTheme({
  typography: {
    fontFamily: questrial.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: questrial.style.fontFamily;
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});


export default function App({ Component, pageProps }) {
  return <ThemeProvider theme={theme}><Component {...pageProps} /> </ThemeProvider>
}
