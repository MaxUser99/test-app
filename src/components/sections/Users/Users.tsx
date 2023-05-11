import cx from 'classnames';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Container from '../../ui/Container';
import styles from './Users.module.css';
import UserCard from '../../ui/UserCard';
import Button from '../../ui/Button';
import { IUser } from '../../../types/IUser';
import { fetchUsers } from '../../../queries/userQueries';

export default function UsersList() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const { data: queryResponse } = useQuery(['users', page], fetchUsers, {
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
