import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
    return (
        <header>
            <h1 className={styles.title}>Finna</h1>
            <nav className={styles.nav}>
                <ul>
                    <li><Link href="/expenses">Expenses</Link></li>
                    <li><Link href="/charts">Charts</Link></li>
                    <li><Link href="/totals">Totals</Link></li>
                </ul>
            </nav>
        </header>
    )
}
