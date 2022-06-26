import React from 'react';
import {GoogleLogin} from '@react-oauth/google';

const AuthToolbar = ({ rootRef }) => {
  return (
    <div className='flex-initial relative'>
      <GoogleLogin onSuccess={credentialResponse => {
        console.log(credentialResponse)
      }}
        onError={() => {
          console.log('Login failed')
        }}
      />
    </div>
  )
}

export default AuthToolbar
