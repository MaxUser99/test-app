import { IUser } from './IUser';

export interface IUsersQueryResponse {
  count: number;
  page: number;
  success: boolean;
  total_pages: number;
  total_users: number;
  users: IUser[];
}
