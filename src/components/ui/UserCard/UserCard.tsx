import { IUser } from '../../../types/IUser';
import styles from './UserCard.module.css';

interface IProps {
  user: IUser;
}

export default function UserCard({ user }: IProps) {
  return (
    <li className={styles.card}>
      <img className={styles.avatar} src={user.photo} alt='avatar' />
      <h3 className={styles.name}>{user.name}</h3>
      <ul className={styles.userInfo}>
        <li>{user.position}</li>
        <li>
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </li>
        <li>
          <a href={`tel:${user.phone}`}>{user.phone}</a>
        </li>
      </ul>
    </li>
  );
}
