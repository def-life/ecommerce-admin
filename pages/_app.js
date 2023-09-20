import { CartProvider } from '@/components/CartContext'
import { trackLiveQueries } from '@/hooks/swr/swrMiddleware'
import '@/styles/globals.css'
import axios from 'axios'
import { SessionProvider } from "next-auth/react"
import { SWRConfig } from 'swr/_internal'


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  console.log(session)

  return (
    <SessionProvider session={session}>
      <SWRConfig value={
        {
          fetcher: async (...args) => (await axios.get(...args)).data
          // use:[trackLiveQueries]
        }
      }>
        <CartProvider>
          <Component {...pageProps} />

        </CartProvider>

      </SWRConfig>
    </SessionProvider>
  )
}

