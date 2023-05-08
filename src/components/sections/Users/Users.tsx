import cx from 'classnames';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Container from '../../ui/Container';
import styles from './Users.module.css';
import UserCard from '../../ui/UserCard';
import { IUsersQueryResponse } from '../../../types/IUsersQueryResponse';
import Button from '../../ui/Button';
import { IUser } from '../../../types/IUser';

const USERS_PER_PAGE = 6;

export default function UsersList() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const { data: queryResponse } = useQuery<IUsersQueryResponse>({
    queryKey: ['users', page],
    queryFn: () =>
      fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${USERS_PER_PAGE}`
      ).then((res) => res.json()),
    onSuccess: (data) => setUsers((prev) => [...prev, ...data.users]),
  });

  function loadMoreClickHandler() {
    setPage((prev) => prev + 1);
  }

  const hideLoadMoreButton = page >= (queryResponse?.total_pages || 0);

  return (
    <Container className={styles.section} as='section'>
      <h2 className={styles.heading}>Working with GET request</h2>
      <ul className={styles.usersList}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
      <Button
        className={cx(styles.moreButton, {
          [styles.hidden]: hideLoadMoreButton,
        })}
        disabled={hideLoadMoreButton}
        onClick={loadMoreClickHandler}>
        Show more
      </Button>
    </Container>
  );
}
