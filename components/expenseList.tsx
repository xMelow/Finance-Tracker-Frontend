import { Expense } from "../types/expense";
import styles from '../styles/expenseList.module.css';

interface ExpenseListProps {
    expenses: Expense[],
    categories: Record<number, string>,
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, categories }) => {
    console.log(expenses);
    return ( 
        <div className={styles.container}>
            <h2 className={styles.title}>Expenses</h2>
            {expenses.length === 0 ? (
                <p className={styles.noExpenses}>No expenses found.</p>
            ) : (
                <ul className={styles.list}>
                {expenses.map((ex) => (
                    <li key={ex.id} className={styles.item}>
                    <article className={styles.row}>
                        <h2>{ex.description}</h2>
                        <p className={styles.category}>{categories[ex.categoryId] ?? 'Unknown'}</p>
                        <p className={styles.amountPositive}>€ {ex.amount}</p>
                        <p>{ex.date.toString()}</p>
                    </article>
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}

export default ExpenseList