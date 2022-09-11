import jwtDecode, { JwtPayload } from 'jwt-decode';

export const baseUrl = `http://localhost:5000`; // TODO: Configurable

export const fetcher = (url: string, token: string) => {
  const apiUrl = `${baseUrl}${url}`;
  
  console.debug(`Making a fetch to ${apiUrl}${url} with token ${token?.length}`);
  if (!token || token.length < 5) {
    return Promise.reject('Made request with no token');
  }

  return fetch(apiUrl, {
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }),
  }).then((r) => r.json());
};

export const isJwtStillActive = (token: string | null): boolean => {
  if (!token) return false;
  let decoded: JwtPayload;
  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch {
    console.error(`Failed to decode JWT token from storage`);
    return false;
  }
  const expiry = decoded?.exp;

  if (!expiry) {
    return false;
  }

  return Date.now() < expiry * 1000;
};
