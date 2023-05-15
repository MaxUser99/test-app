import styles from './UserCreated.module.css';
import successImage from '../../../../../public/assets/success-image.svg';

export default function UserCreated() {
  return <img className={styles.image} src={successImage} alt='success' />;
}
