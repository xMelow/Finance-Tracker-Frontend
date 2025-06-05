import Link from 'next/link';
import styles from './header.module.css';

export default function Header() {
    return (
        <header>
            <h1 className={styles.title}><Link href="/">Finna</Link></h1>
            <nav className={styles.nav}>
                <ul>
                    <li><Link href="/expenses">Expenses</Link></li>
                    <li><Link href="/charts">Charts</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                    <li><Link href="/about">About me</Link></li>
                    <li><Link href="/settings">Settings</Link></li>
                </ul>
            </nav>
        </header>
    )
}
