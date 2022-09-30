import User from './user';
import {AuthStatus} from '../auth/authStatus';

export default interface Session {
  status: AuthStatus;
  user: User | null;
  token: string | null;
}
