import User from '../model/user';

const baseUrl = `/api`; // TODO: Configurable

const get = async <T>(url: string): Promise<T> => {
  const apiUrl = `${baseUrl}/${url}`;
  console.debug(`Making a get call to ${apiUrl}`);

  const token = localStorage.getItem('token');

  if (!token || token.length < 5) {
    return Promise.reject('No token');
  }

  return fetch(apiUrl, {
    headers: new Headers({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    }),
  }).then((r) => r.json());
}

export const getCurrentUser = async (): Promise<User> => {
  return await get<User>('user/me');
}
