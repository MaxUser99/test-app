import cx from 'classnames';
import styles from './Button.module.css';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...props }: IProps) {
  return <button className={cx(styles.button, className)} {...props} />;
}
