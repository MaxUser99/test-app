import Button from '../../ui/Button';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <main className={styles.hero}>
      <section className={styles.content}>
        <h1 className={styles.heading}>
          Test&nbsp;assignment for front-end developer
        </h1>
        <p className={styles.text}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <Button>Sign up</Button>
      </section>
    </main>
  );
}
