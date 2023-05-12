import cx from 'classnames';
import styles from './Container.module.css';
import { forwardRef } from 'react';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'main' | 'section' | 'article' | 'aside' | 'header' | 'nav';
}

export const Container = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { as: Component = 'div', className, ...rest } = props;

  return (
    <Component
      className={cx(styles.container, className)}
      {...rest}
      ref={ref}
    />
  );
});
