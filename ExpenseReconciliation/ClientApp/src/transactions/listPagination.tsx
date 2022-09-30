import useSWRInfinite from 'swr/infinite';
import { fetcher } from '../services/auth';

const listPagination = (path, token) => {
  if (!path) {
    throw new Error('Path is required');
  }
  if (!token) {
    throw new Error('Token is required');
  }

  const baseUrl = '/api/transaction/GetByDateAsync';
  const url = baseUrl + path;
  const PAGE_LIMIT = 5;
  const {
    data,
    error: transactionError,
    size,
    setSize,
    mutate,
  } = useSWRInfinite(
    (index) => [`${url}?_page=${index + 1}&_limit=${PAGE_LIMIT}`, token],
    fetcher,
  );

  const transactionData = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !transactionError;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

  return {
    posts: transactionData,
    error: transactionError,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd,
    mutate,
  };
};

export default listPagination;
