import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {login, logout, selectLoggedIn, selectUser} from './authSlice';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import User from '../model/user';

const AuthToolbar = () => {
  const loggedIn: boolean = useAppSelector(selectLoggedIn);
  const user: User | null = useAppSelector(selectUser); 
  const dispatch = useAppDispatch();

  if (loggedIn) {
    return (
      <div className="flex-initial relative">
        (debug: user {JSON.stringify(user)})
        <span className="text-sm mr-2">{user?.email}</span>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    );
  }

  return (
    <div className="flex-initial relative mr-4">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          if (credentialResponse.credential) {
            dispatch(login({ token: credentialResponse.credential }));
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
