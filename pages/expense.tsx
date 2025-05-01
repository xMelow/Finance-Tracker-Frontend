import { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { getCategories, getExpenses } from "../services/api";
import ExpenseList from "../components/expenseList";
import { Category } from "../types/category";

export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
          try {
            const [txs, cats] = await Promise.all([
              getExpenses(),
              getCategories(),
            ]);
            setExpenses(txs);
            setCategories(cats);
          } catch (err: any) {
            setError(err.message);
          }
        };
        loadData();
      }, []);

      const categoryMap: Record<number, string> = Object.fromEntries(
        categories.map((cat) => [cat.id, cat.name])
      );

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">My Finance Tracker</h1>
            {error && <p className="text-red-500">{error}</p>}
            <ExpenseList expenses={expenses} categories={categoryMap} />
        </div>
    )
}