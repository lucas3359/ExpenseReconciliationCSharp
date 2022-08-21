import React, {useContext} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import useAuth from '../hooks/useAuth';
import {AuthContext} from './AuthProvider';

const AuthToolbar = () => {
  const { login, logout } = useAuth();
  const session = useContext(AuthContext);
  
  if (session?.loggedIn) {
    return(
      <div className="flex-initial relative">
        <span className="text-sm mr-2">{session?.user?.email}</span>
        <button onClick={() => logout()}>Logout</button>
      </div>
    );
  }
  
  return (
    <div className="flex-initial relative mr-4">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (credentialResponse.credential) {
            await login(credentialResponse.credential)
            console.debug('Logged in');
          } else {
            console.error('No credential retrieved from Google');
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
