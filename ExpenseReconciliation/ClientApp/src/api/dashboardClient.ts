import Split from '../model/split';
import {get} from './baseApiClient';
import Total from '../model/total';

export const getAllSplits = async (): Promise<Split[]> => {
  return await get<Split[]>('dashboard/GetAllAsync');
}

export const getAmounts = async (): Promise<Total[]> => {
  return await get<Total[]>('dashboard/GetAmountAsync');
}
