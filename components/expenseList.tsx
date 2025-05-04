import { Expense } from "../types/expense";
import styles from '../styles/expenseList.module.css';
import { Category } from "../types/category";
import { JSX } from "react";

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
}

export default function ExpenseList({ expenses, categories }: ExpenseListProps): JSX.Element {
  return (
    <div className={styles.container}>
      {expenses.length === 0 ? (
        <p className={styles.noExpenses}>No expenses found.</p>
      ) : (
        <ul className={styles.list}>
          {expenses.map((ex) => (
            <li key={ex.id} className={styles.item}>
              <article className={styles.row}>
                <h2>{ex.description}</h2>
                <p className={styles.category}>
                  {categories.find((cat) => cat.id === Number(ex.categoryId))?.name ?? "Unknown"}
                </p>
                <p className={styles.amountPositive}>€ {ex.amount}</p>
                <p>{new Date(ex.date).toLocaleDateString()}</p> {/* Date formatting */}
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}