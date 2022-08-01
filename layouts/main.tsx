import Head from 'next/head'
import { KeyProvider } from '../context/main-context';

export default function MainLayout({ children }) {
  return (
    <KeyProvider>
      <Head>
        <title>Layout State</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main className="mainWrapper">{children}</main>
      </div>
    </KeyProvider>
  )
}
