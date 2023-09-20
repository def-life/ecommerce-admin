import React, { useState } from 'react'
import NavBar from './navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from './Logout';

function Layout({ children }) {
  console.log("rendering layout component")
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false)
  const router = useRouter()

  function toggleMenu() {
    setShow(prev => !prev)
  }

  if (status === "loading") {
    return "loading..."
  }

  if (session == null) {
    router.push("/auth/signin")
    return null
  }



  return (
    <div className='max max-w-7xl m-auto'>
      {!show && <div className='lg:hidden'>
        <div className='flex p-3 justify-between items-center' >
          <MenuIcon className='text-lg' onClick={toggleMenu} />
          <p className='text-lg font-semibold'>Ecommerce Admin</p>
          <div className='font-semibold'>
          <Logout />
          </div>
        </div>

      </div>}
      <div className="lg:grid lg:grid-cols-[25%_75%] min-h-screen h-full bg-gray-100/70 items-start">
        <NavBar show={show} toggleMenu={toggleMenu} />
        <div className="lg:rounded-lg mt-2 p-3 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout

// background: #5542F6
// highlight: #eae8fb
