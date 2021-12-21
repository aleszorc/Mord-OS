import { fetcher } from './fetcher';
import useSWR from 'swr';

const URL = 'https://jsonplaceholder.typicode.com';

export const useComments = () => {
  const { data, error } = useSWR(`${URL}/comments`, fetcher);

  return { data, error };
};

export const usePhotos = () => {
  const { data, error } = useSWR(`${URL}/photos`, fetcher);

  return { data, error };
};
