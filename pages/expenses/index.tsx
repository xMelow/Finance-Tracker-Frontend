import { useEffect, useState } from "react";
import { Expense } from "../../types/expense";
import { getCategories, getExpenses, getTotal, getTotalMonthSpending } from "../../services/api";
import { Category } from "../../types/category";
import AddExpenseForm from "../../components/expense/expenseForm/addExpenseForm";
import ExpenseList from "../../components/expense/expenseList/expenseList";
import styles from './expense.module.css'
import Header from "../../components/header/header";
import Totals from "../../components/totals/totals";

export default function ExpensePage() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const now = new Date();
    const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    useEffect(() => {
      getExpenses()
        .then(setExpenses)
        .catch((err) => setError("Error fetching expenses: " + err.message));

      getCategories()
        .then(setCategories)
        .catch((err) => setError("Error fetching categories: " + err.message));
    }, []);

    const handleDeleteExpense = (deletedId: number) => {
        setExpenses((prev) => prev.filter((exp) => exp.id !== deletedId));
    };

    const handleUpdateExpense = (updatedExpense: Expense) => {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      );
    };

    const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const totalSpendingMonth = expenses
      .filter(expense => expense.date.startsWith(currentDate))
      .reduce((sum, expense) => sum + expense.amount, 0);

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
                <Totals totalSpending={totalSpending} totalSpendingMonth={totalSpendingMonth}></Totals>
              </div>

               <div className={styles.recentTransactions}>
                <h2>Recent Expenses</h2>
                <ExpenseList expenses={expenses} categories={categories} onDeleteExpense={handleDeleteExpense} onUpdateSucces={handleUpdateExpense}/>
              </div>
            </div>
        </div>
      </>
    )
}