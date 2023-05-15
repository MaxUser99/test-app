import cx from 'classnames';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Container from '../../ui/Container';
import styles from './Users.module.css';
import UserCard from '../../ui/UserCard';
import Button from '../../ui/Button';
import { IUser } from '../../../types/IUser';
import { fetchUsers } from '../../../queries/userQueries';

interface IProps {
  page: number;
  resetData: boolean;
  incrementPage: () => void;
}

export default function UsersList({ page, resetData, incrementPage }: IProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const { data: queryResponse } = useQuery(['users', page], fetchUsers, {
    onSuccess: (data) => {
      setUsers((prev) => {
        if (resetData) {
          return [...data.users].sort(
            (a, b) => b.registration_timestamp - a.registration_timestamp
          );
        }

        const newUsers = data.users.filter(
          (user) => !prev.some((prevUser) => prevUser.id === user.id)
        );
        return [...prev, ...newUsers].sort(
          (a, b) => b.registration_timestamp - a.registration_timestamp
        );
      });
    },
  });

  const hideLoadMoreButton = page >= (queryResponse?.total_pages || 0);

  return (
    <Container className={styles.section} as='section' id='users'>
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
        onClick={incrementPage}>
        Show more
      </Button>
    </Container>
  );
}
