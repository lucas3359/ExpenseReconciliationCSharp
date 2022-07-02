export const baseUrl = `http://localhost:5000`; // TODO: Configurable

export const getCurrentToken = (): string => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  } else {
    throw new Error('No token found');
  }
};

export const fetcher = (url: string) => {
  const apiUrl = `${baseUrl}${url}`;
  return fetch(apiUrl, {
    headers: new Headers({
      Authorization: 'Bearer ' + getCurrentToken(),
      'Content-Type': 'application/json',
    }),
  }).then((r) => r.json());
};
