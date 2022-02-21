import React, { useRef } from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
  const rootRef = useRef(null)

  return (
    <div className='bg-gradient-to-tl bg-gradient-to-r from-indigo-100 via-red-100 to-yellow-100'>
      <div id='app-root' ref={rootRef} className='flex flex-col min-h-screen backdrop-filter backdrop-saturate-50'>
        <Header rootRef={rootRef} />
        <main className='container mx-auto py-5 px-2 flex-grow'>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
