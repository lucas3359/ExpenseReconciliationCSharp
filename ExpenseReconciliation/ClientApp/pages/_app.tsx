import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { SWRConfig } from 'swr';
import {GoogleOAuthProvider} from "@react-oauth/google";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="928905841412-mp7akj5krpqotcfg4g48veh38rad3lov.apps.googleusercontent.com">
        <SWRConfig value={{ fetcher: (url) => fetch(url).then(res => res.json()) }}>
                <Component {...pageProps} />
        </SWRConfig>
    </GoogleOAuthProvider>
  )
}

export default MyApp
