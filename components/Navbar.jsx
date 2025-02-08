'use client'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Browse Hotels', path: '/browse-hotels' },
    { label: 'Browse Reviews', path: '/reviews' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Wallet', path: '/wallet' }
  ]

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: 'white',
                  backgroundColor: pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent'
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
