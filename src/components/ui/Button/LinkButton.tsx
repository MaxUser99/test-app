import cx from 'classnames';
import styles from './Button.module.css';

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function LinkButton({ className, children, ...props }: IProps) {
  return (
    <a className={cx(styles.button, styles.link, className)} {...props}>
      {children}
    </a>
  );
}
