import { useEffect, useState } from "react";
import { Expense } from "../../types/expense";
import { getCategories, getExpenses, getTotal, getTotalMonthSpending } from "../../services/api";
import { Category } from "../../types/category";
import AddExpenseForm from "../../components/expense/expenseForm/addExpenseForm";
import ExpenseList from "../../components/expense/expenseList/expenseList";
import styles from './expense.module.css'
import Header from "../../components/main/header/header";
import { monthSpending } from "../../types/monthSpending.";
import Totals from "../../components/totals/totals";


export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalSpending, setTotalSpending] = useState<number>();
    const [totalSpendingMonth, setTotalSpendingMonth] = useState<monthSpending[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      getExpenses()
        .then(setExpenses)
        .catch((err) => setError("Error fetching expenses: " + err.message));

      getCategories()
        .then(setCategories)
        .catch((err) => setError("Error fetching categories: " + err.message));

      getTotal()
          .then(setTotalSpending)
          .catch((err) => setError("Error fetching totals: " + err.message));

      getTotalMonthSpending()
          .then(setTotalSpendingMonth)
          .catch((err) => setError("Error fetching month totals: " + err.message));
        
    }, []);

    return (
      <>
        <Header></Header>
        <div className={styles.transactions}>
            <h1 className="text-2xl font-bold mb-4">Expenses</h1>
            {error && <p className="text-red-500">{error}</p>}

            <div className={styles.flexContainer}>

              <div className={styles.addTransactions}>
                <h2>Add Expense</h2>
                <AddExpenseForm categories={categories} onAddExpense={(newExpense => setExpenses((prev) => [...prev, newExpense]))}></AddExpenseForm>
              </div>

              <div className={styles.totals}>
                <h2>Totals</h2>
                <Totals totalSpending={totalSpending} totalMonthSpending={totalSpendingMonth}></Totals>
              </div>

               <div className={styles.recentTransactions}>
                <h2>Recent Expenses</h2>
                <ExpenseList expenses={expenses} categories={categories}/>
              </div>
            </div>
        </div>
      </>
    )
}