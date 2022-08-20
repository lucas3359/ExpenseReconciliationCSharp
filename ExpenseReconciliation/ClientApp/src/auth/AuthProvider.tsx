import { createContext, Dispatch, SetStateAction, useState } from 'react';
import Session from '../model/session';

const defaultSession = { loggedIn: false, user: null, token: null };

const AuthContext = createContext<Session>(defaultSession);
const AuthDispatchContext = createContext<Dispatch<SetStateAction<Session>>>(
  () => {},
);

function AuthProvider({ children }) {
  const [session, setSession] = useState<Session>(defaultSession);

  return (
    <AuthContext.Provider value={session}>
      <AuthDispatchContext.Provider value={setSession}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext, AuthDispatchContext };
