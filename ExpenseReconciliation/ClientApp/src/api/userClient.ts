import { get } from "./baseApiClient"
import User from '../model/user';

export const getCurrentUser = async (): Promise<User> => {
  return await get<User>('user/me');
}

export const getAllUsers = async (): Promise<User[]> => {
  return await get<User[]>('user');
}