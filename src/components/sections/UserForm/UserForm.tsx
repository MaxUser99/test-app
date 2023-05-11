import { useMutation, useQuery } from 'react-query';
import { fetchToken } from '../../../queries/tokenQueries';
import { createUser } from '../../../queries/userQueries';
import Container from '../../ui/Container';
import CreateUserForm from './CreateUserForm';
import styles from './UserForm.module.css';
import UserCreated from './UserCreated';

export default function UserForm() {
  const { data: token = '', refetch } = useQuery('token', fetchToken, {
    refetchInterval: 40 * 60 * 1000, // 40 minutes
  });
  const mutation = useMutation(createUser, {
    onSettled: () => refetch(),
  });

  const submitHandler = (form: HTMLFormElement) => {
    mutation.reset();
    const formData = new FormData(form);
    mutation.mutate([token, formData]);
  };

  return (
    <Container className={styles.container} as='section' id='sign-up'>
      {mutation.isSuccess ? (
        <>
          <h2>User successfully registered</h2>
          <UserCreated />
        </>
      ) : (
        <>
          <h2>Working with POST request</h2>
          <CreateUserForm onSubmit={submitHandler} />
        </>
      )}
    </Container>
  );
}
