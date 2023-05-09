import cx from 'classnames';
import styles from './TextField.module.css';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // input props
  id: string;
  placeholder?: never;

  // text field props
  helperText?: string;
  label: string;
  error?: boolean;
}

export default function TextField({
  helperText,
  label,
  error,
  className,
  id,
  ...inputProps
}: IProps) {
  return (
    <div
      className={cx(styles.textField, className, {
        [styles.textFieldError]: error,
      })}>
      <input className={styles.input} id={id} {...inputProps} />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      {helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
}
