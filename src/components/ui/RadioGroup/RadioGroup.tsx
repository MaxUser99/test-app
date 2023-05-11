import cx from 'classnames';
import styles from './RadioGroup.module.css';
import { forwardRef } from 'react';

interface IProps<Value = string | number, InputLable = string | number>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  legend: string;
  name: string;
  data: Array<Value> | Array<[Value, InputLable]>;
  error?: boolean;
  className?: string;
}

export const RadioGroup = forwardRef<HTMLInputElement, IProps>(
  ({ legend, data, name, className, error, ...props }, ref) => {
    return (
      <div className={cx(styles.root, className, { [styles.error]: error })}>
        <legend className={styles.legend}>{legend}</legend>
        {data.map((pairOrValue) => {
          const [value, inputLabel] = Array.isArray(pairOrValue)
            ? pairOrValue
            : [pairOrValue, pairOrValue];
          return (
            <label key={value} className={styles.label}>
              <input
                ref={ref}
                name={name}
                value={value}
                className={styles.input}
                type='radio'
                {...props}
              />
              {inputLabel}
            </label>
          );
        })}
      </div>
    );
  }
);
