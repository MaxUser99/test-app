import logo from '../../../assets/Logo.svg';
import LinkButton from '../Button/LinkButton';
import Container from '../Container';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <Container as='header' className={styles.header}>
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
    </div>
  );
}
