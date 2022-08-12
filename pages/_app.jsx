import React , { useEffect, useState } from 'react';
import { Layout } from '../components'
import '../styles/globals.css'

import "../styles/globlas.scss"
// import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
