import { setToken } from '@/API/add'
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    if (localStorage.getItem("emrsive-token")) {
      setToken(localStorage.getItem("emrsive-token"));
    }
  }, [])

  return (
    <MantineProvider>
      <ModalsProvider>
        <Notifications />
        <Component {...pageProps} />
      </ModalsProvider>
    </MantineProvider>
  )
}
