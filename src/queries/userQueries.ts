import { MutationFunction, QueryFunction } from 'react-query';
import { IUsersQueryResponse } from '../types/IUsersQueryResponse';

const USERS_PER_PAGE = 6;

export const fetchUsers: QueryFunction<
  IUsersQueryResponse,
  [string, number]
> = ({ queryKey }) => {
  const [, page] = queryKey;
  return new Promise((r) => {
    return r({
      count: 0,
      page: 0,
      success: false,
      total_pages: 0,
      total_users: 0,
      users: [],
    });
  });
  // return fetch(
  //   `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${USERS_PER_PAGE}`
  // ).then((res) => res.json());
};

export const createUser: MutationFunction<number, [string, FormData]> = (
  params
) => {
  const [token, formData] = params;
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
    method: 'POST',
    headers: { Token: token },
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => res.user_id);
};
