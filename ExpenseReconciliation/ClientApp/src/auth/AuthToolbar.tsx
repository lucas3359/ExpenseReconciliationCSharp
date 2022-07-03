import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const AuthToolbar = () => {
  return (
    <div className="flex-initial relative">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            localStorage.setItem('token', credentialResponse.credential);
            console.log('Set credential');
          } else {
            console.error('No credential was found');
          }
        }}
        onError={() => {
          console.error('Login failed');
        }}
      />
    </div>
  );
};

export default AuthToolbar;
