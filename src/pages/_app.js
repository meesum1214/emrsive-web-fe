import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider>
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
