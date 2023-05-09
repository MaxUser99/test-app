import Container from '../../ui/Container';
import TextField from '../../ui/TextField';
import styles from './UserForm.module.css';

export default function UserForm() {
  return (
    <Container className={styles.container} as='section'>
      <h2 className={styles.heading}>Working with POST request</h2>
      <form>
        <TextField id='name-input' label='Your name' />
        <TextField id='email-input' label='Email' />
        <TextField id='phone-input' label='Phone' />
      </form>
    </Container>
  );
}
