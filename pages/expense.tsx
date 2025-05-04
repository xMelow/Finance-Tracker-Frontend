import { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { getCategories, getExpenses } from "../services/api";
import ExpenseList from "../components/expenseList";
import { Category } from "../types/category";
import AddExpenseForm from "../components/addExpenseForm";

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
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">My Finance Tracker</h1>
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <h1>Recent Transactions</h1>
              <ExpenseList expenses={expenses} categories={categories}/>
            </div>

            <div>
              <h1>Add Expense</h1>
              <AddExpenseForm categories={categories}></AddExpenseForm>
            </div>
            
        </div>
    )
}