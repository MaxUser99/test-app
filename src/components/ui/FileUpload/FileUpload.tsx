import { forwardRef } from 'react';
import cx from 'classnames';
import styles from './FileUpload.module.css';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fileName: string;
  id: string;
  type?: never;
  error?: boolean;
  helperText?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, IProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      fileName,
      placeholder,
      className,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div className={cx(styles.wrapper, className, { [styles.error]: error })}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <div className={styles.inputsWrapper}>
          <input
            className={styles.fakeInput}
            type='text'
            value={fileName}
            placeholder={placeholder}
            readOnly
          />
          <input
            className={styles.fileInput}
            type='file'
            id={id}
            ref={ref}
            {...inputProps}
          />
        </div>
        {helperText && <div className={styles.helperText}>{helperText}</div>}
      </div>
    );
  }
);
