import logo from '../../../assets/Logo.svg';
import LinkButton from '../Button/LinkButton';
import Container from '../Container';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.wrapper}>
        <img className={styles.logo} src={logo} alt='logo' />
        <nav>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <LinkButton href='#'>Users</LinkButton>
            </li>
            <li className={styles.li}>
              <LinkButton href='#'>Sign Up</LinkButton>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
