import { useEffect, useState } from "react";
import { Expense } from "../../types/expense";
import { getCategories, getExpenses } from "../../services/api";
import { Category } from "../../types/category";
import AddExpenseForm from "../../components/expense/expenseForm/addExpenseForm";
import ExpenseList from "../../components/expense/expenseList/expenseList";
import styles from './expense.module.css'


export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      getExpenses()
        .then(setExpenses)
        .catch((err) => setError("Error fetching expenses: " + err.message));

      getCategories()
        .then(setCategories)
        .catch((err) => setError("Error fetching categories: " + err.message))
    }, []);

    return (
        <div className={styles.transactions}>
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            {error && <p className="text-red-500">{error}</p>}

            <div className={styles.flexContainer}>

              <div className={styles.addTransactions}>
                <h2>Add Expense</h2>
                <AddExpenseForm categories={categories} onAddExpense={(newExpense => setExpenses((prev) => [...prev, newExpense]))}></AddExpenseForm>
              </div>

               <div className={styles.recentTransactions}>
                <h2>Recent Expenses</h2>
                <ExpenseList expenses={expenses} categories={categories}/>
              </div>
            </div>
        </div>
    )
} 