import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {getUser, login, logout, selectAuthStatus, selectUser} from './authSlice';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import User from '../model/user';
import {AuthStatus} from './authStatus';

const AuthToolbar = () => {
  const authStatus: AuthStatus = useAppSelector(selectAuthStatus);
  const user: User | null = useAppSelector(selectUser); 
  const dispatch = useAppDispatch();
  
  if (authStatus == AuthStatus.Unknown) {
    dispatch(getUser());
  }

  if (authStatus == AuthStatus.LoggedIn) {
    return (
      <div className="flex-initial relative">
        <span className="text-sm mr-2">{user?.email}</span>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    );
  }
  
  // TODO: Some spinner or something
  if (authStatus == AuthStatus.Pending) {
    return (
      <div className="flex-initial relative">
        Loading...
      </div>
    )
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
