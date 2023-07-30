import { setToken } from '@/API/add'
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { useLayoutEffect } from 'react'

export default function App({ Component, pageProps }) {
  
  useLayoutEffect(() => {
    if (localStorage.getItem("emrsive-token")) {
      setToken(localStorage.getItem("emrsive-token"));
    }
  }, [])
  
  return (
    <MantineProvider>
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
