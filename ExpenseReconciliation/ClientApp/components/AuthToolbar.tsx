import { signIn, signOut, useSession } from 'next-auth/client'
import React, { useRef, MouseEventHandler, useEffect, useState } from 'react'
import Icon from './Icon'

const AuthToolbar = ({ rootRef }) => {
  const [session, loading] = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  const authRef = useRef(null)

  useEffect(() => {
    function handleOutsideClick(event: any) {
      if (!authRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [rootRef])

  const dropDownButton = (text: string, enabled: boolean, onClick?: MouseEventHandler<HTMLButtonElement>) => {
    return (
      <button
        onClick={onClick}
        className={`block py-3 px-4 w-60 ${
          enabled
            ? 'hover:bg-purple-100 hover:border hover:border-bg-purple-300'
            : 'bg-white text-gray-500 border-0 hover:bg-white cursor-default focus:outline-none'
        }`}>
        {text}
      </button>
    )
  }

  const authDropdown = () => {
    if (showDropdown) {
      return (
        <div className='absolute right-0 mt-2 bg-white bg-opacity-75 border rounded py-2 w-60 z-20 overflow-hidden'>
          {session ? dropDownButton(session?.user?.email, false) : ''}
          <hr />
          {session ? dropDownButton('Log out', true, () => signOut()) : dropDownButton('Sign in', true, () => signIn())}
        </div>
      )
    } else {
      return
    }
  }

  return (
    <div className='flex-initial relative' ref={authRef}>
      <div
        className={`cursor-pointer text-right ${
          session && session.user ? 'text-blue-400 hover:text-blue-700' : 'text-red-600 hover:text-red-300'
        }`}
        onClick={() => setShowDropdown(!showDropdown)}>
        <Icon icon='profile' classes='h-10 w-10' />
      </div>
      {authDropdown()}
    </div>
  )
}

export default AuthToolbar
