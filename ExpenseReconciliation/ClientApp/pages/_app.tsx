import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url) => fetch(url).then(res => res.json()) }}>
        <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
        </SessionProvider>
    </SWRConfig>
  )
}

export default MyApp
