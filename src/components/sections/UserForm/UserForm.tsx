import { useMutation, useQuery } from 'react-query';
import { fetchToken } from '../../../queries/tokenQueries';
import { createUser } from '../../../queries/userQueries';
import { fetchPositions } from '../../../queries/positionQueries';
import Container from '../../ui/Container';
import CreateUserForm from './CreateUserForm';
import styles from './UserForm.module.css';
import UserCreated from './UserCreated';
import { useInView } from 'react-intersection-observer';

interface IProps {
  resetPage: () => void;
}

export default function UserForm({ resetPage }: IProps) {
  const [containerRef, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });
  const { data: token = '', refetch } = useQuery('token', fetchToken, {
    enabled: inView,
    refetchInterval: 40 * 60 * 1000, // 40 minutes
  });
  const { data: positions = [] } = useQuery('positions', fetchPositions, {
    enabled: inView,
  });
  const mutation = useMutation(createUser, {
    onSuccess: () => resetPage(),
    onSettled: () => refetch(),
  });

  const submitHandler = (form: HTMLFormElement) => {
    mutation.reset();
    const formData = new FormData(form);
    mutation.mutate([token, formData]);
  };

  return (
    <Container
      className={styles.container}
      ref={containerRef}
      as='section'
      id='sign-up'>
      {mutation.isSuccess ? (
        <>
          <h2>User successfully registered</h2>
          <UserCreated />
        </>
      ) : (
        <>
          <h2>Working with POST request</h2>
          <CreateUserForm onSubmit={submitHandler} positions={positions} />
        </>
      )}
    </Container>
  );
}
