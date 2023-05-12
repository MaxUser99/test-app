import cx from 'classnames';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import Container from '../../ui/Container';
import styles from './Users.module.css';
import UserCard from '../../ui/UserCard';
import Button from '../../ui/Button';
import { IUser } from '../../../types/IUser';
import { fetchUsers } from '../../../queries/userQueries';

export default function UsersList() {
  const [containerRef, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const { data: queryResponse } = useQuery(['users', page], fetchUsers, {
    enabled: inView,
    onSuccess: (data) => {
      setUsers((prev) => {
        const newUsers = data.users.filter(
          (user) => !prev.some((prevUser) => prevUser.id === user.id)
        );
        return [...prev, ...newUsers];
      });
    },
  });

  function loadMoreClickHandler() {
    setPage((prev) => prev + 1);
  }

  const hideLoadMoreButton = page >= (queryResponse?.total_pages || 0);

  return (
    <Container
      className={styles.section}
      ref={containerRef}
      as='section'
      id='users'>
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
