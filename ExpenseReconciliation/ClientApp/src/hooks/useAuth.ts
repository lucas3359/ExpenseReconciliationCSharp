import { useContext, useState } from 'react';
import { AuthContext, AuthDispatchContext } from '../auth/AuthProvider';
import Session from '../model/session';
import { fetcher, isJwtStillActive } from '../services/auth';

export default function useAuth() {
  const session = useContext(AuthContext);
  const setSession = useContext(AuthDispatchContext);
  const [error, setError] = useState(null);

  const login = async (token) => {
    console.log(`Logging in user with token ${token?.length}`);

    const runningSession: Session = {
      loggedIn: false,
      user: null,
      token: 'temporary',
    };

    setSession(runningSession);

    const response: any = await fetcher(`/api/user/me`, token);

    const newSession: Session = {
      loggedIn: true,
      user: {
        id: response.id,
        name: response.name,
        email: response.email,
      },
      token: token,
    };

    setSession(newSession);
    localStorage.setItem('authToken', JSON.stringify(newSession));
  };

  const logout = () => {
    console.debug(`Logging out`);
    const newSession: Session = {
      loggedIn: false,
      user: null,
      token: null,
    };
    setSession(newSession);
  };

  const getSession = (): Session => {
    if (!session.loggedIn) {
      const savedSession = localStorage.getItem('authToken');
      if (!savedSession) return session;
      const decodedSession = JSON.parse(savedSession) as Session;
      if (isJwtStillActive(decodedSession.token)) {
        console.debug('Restoring session from local storage');
        setSession(decodedSession);
      }
    }
    return session;
  };

  return {
    getSession,
    login,
    logout,
    error,
  };
}
