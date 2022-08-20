import User from './user';

export default interface Session {
  loggedIn: boolean;
  user: User | null;
  token: string | null;
}
