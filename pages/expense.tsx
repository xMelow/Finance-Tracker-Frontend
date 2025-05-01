import { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { getExpenses } from "../services/api";

export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getExpenses()
            .then(setExpenses)
            .catch(err => setError(err.message));
    }, []);

    return (
        <div>
            <h1>Expenses</h1>
            {error && <p style={{ color: "red"}}>{error}</p>}
            <ul>
                {expenses.map(expense => (
                    <li key={expense.id}>
                        {expense.description}: {expense.amount} ({expense.category})
                    </li>
                ))}
            </ul>
        </div>
    )
}