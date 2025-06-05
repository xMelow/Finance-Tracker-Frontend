import Link from 'next/link';
import styles from './index.module.css';
import Header from '../components/header/header';

export default function HomePage() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Finna</h1>
        <p className={styles.subtitle}>
        Track your expenses, visualize your financial data, and stay in control of your budget.
        </p>
        <div className={styles.buttons}>
        <Link href="/expenses">
            <button className={styles.primaryButton}>View Expenses</button>
        </Link>
        <Link href="/charts">
            <button className={styles.secondaryButton}>See Charts</button>
        </Link>
        </div>
    </div>
  );
}
