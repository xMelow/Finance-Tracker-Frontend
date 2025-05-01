import { Expense } from "../types/expense";
import styles from '../styles/expenseList.module.css';

interface ExpenseListProps {
    expenses: Expense[]
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
    return ( 
        <div className={styles.container}>
            <h2 className={styles.title}>Expenses</h2>
            {expenses.length === 0 ? (
                <p className={styles.noExpenses}>No expenses found.</p>
            ) : (
                <ul className={styles.list}>
                {expenses.map((ex) => (
                    <li key={ex.id} className={styles.item}>
                    <div className={styles.row}>
                        <span>{ex.description}</span>
                        <span
                        className={
                            ex.amount < 0 ? styles.amountNegative : styles.amountPositive
                        }
                        >
                        {ex.amount}€
                        </span>
                    </div>
                    <div className={styles.category}>{ex.category}</div>
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}

export default ExpenseList