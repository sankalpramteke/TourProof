'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './Navbar'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
})

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main className="container">
        {children}
      </main>
    </ThemeProvider>
  )
}
