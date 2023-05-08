import cx from 'classnames';
import styles from './Container.module.css';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'main' | 'section' | 'article' | 'aside' | 'header' | 'nav';
}

export default function Container(props: IProps) {
  const { as: Component = 'div', className, ...rest } = props;

  return <Component className={cx(styles.container, className)} {...rest} />;
}
