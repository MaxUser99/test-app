import cx from 'classnames';
import styles from './TextField.module.css';
import { forwardRef } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // input props
  id: string;
  placeholder?: never;

  // text field props
  helperText?: string;
  label: string;
  error?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, IProps>(
  ({ helperText, label, error, className, id, ...inputProps }, ref) => {
    return (
      <div
        className={cx(styles.textField, className, {
          [styles.textFieldError]: error,
        })}>
        <input
          className={styles.input}
          id={id}
          placeholder=' ' // is necessary to make placeholder work properly
          {...inputProps}
          ref={ref}
        />
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        {helperText && <div className={styles.helperText}>{helperText}</div>}
      </div>
    );
  }
);
