import { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { getExpenses } from "../services/api";
import ExpenseList from "../components/expenseList";

export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getExpenses()
            .then(setExpenses)
            .catch(err => setError(err.message));
    }, []);

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">My Finance Tracker</h1>
            {error && <p className="text-red-500">{error}</p>}
            <ExpenseList expenses={expenses} />
        </div>
    )
}