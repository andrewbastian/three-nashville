import Head from 'next/head'

export default function DefaultLayout({ children }) {
  return (
    <>
      <Head>
        <title>Layout State!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main className="mainWrapper">
          {children}
        </main>
      </div>
    </>
  )
}
