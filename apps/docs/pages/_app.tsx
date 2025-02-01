import type { AppProps } from 'next/app'

import { components } from '../components/MDXComponents'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component components={components} {...pageProps} />;
}