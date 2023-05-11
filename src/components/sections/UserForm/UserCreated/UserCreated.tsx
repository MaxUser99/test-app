import styles from './UserCreated.module.css';
// import successImage from '../../../../assets/success-image.svg';

export default function UserCreated() {
  return (
    <img
      className={styles.image}
      src='/assets/success-image.svg'
      // src={`${process.env.PUBLIC_URL}/assets/Logo.svg`}
      //  src={successImage}
      alt='success'
    />
  );
}
