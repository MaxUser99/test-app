import { QueryFunction } from 'react-query';

export const fetchToken: QueryFunction<string> = () => {
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    .then((res) => res.json())
    .then((res) => res.token as string);
};
