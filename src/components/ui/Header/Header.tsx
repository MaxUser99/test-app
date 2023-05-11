import LinkButton from '../Button/LinkButton';
import Container from '../Container';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.wrapper}>
        <img
          className={styles.logo}
          width={104}
          height={26}
          src={`./assets/Logo.svg`}
          alt='logo'
        />
        <nav>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <LinkButton href='#users'>Users</LinkButton>
            </li>
            <li className={styles.li}>
              <LinkButton href='#sign-up'>Sign Up</LinkButton>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
