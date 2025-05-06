import { useState } from "react";
import { addExpense, getCategoryByName } from "../services/api";
import { Category } from "../types/category";
import { Expense } from "../types/expense";

interface AddExpenseFormProps {
    categories: Category[];
    onAddExpense: (expense: Expense) => void;
}

export default function AddExpenseForm({ categories, onAddExpense }: AddExpenseFormProps) {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const categoryId = (await getCategoryByName(category)).id;
        try {
            const newExpense = await addExpense({
                amount: parseFloat(amount),
                categoryId: categoryId,
                description,
                date,
            });
            onAddExpense(newExpense);
            setAmount("");
            setCategory("");
            setDescription
            setDate("");
        } catch (error) {
            alert("Error adding exepnense"); // change
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="Amount" required />
            <select value={category} onChange={e => setCategory(e.target.value)} required>
                <option value="" disabled>Select Category</option>
                {categories.map((cat, id) => (
                    <option key={id} value={cat.name}>{cat.name}</option>
                ))}
            </select>
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
            <input value={date} type="date" onChange={e => setDate(e.target.value)} required />
            <button type="submit">Add Expense</button>
        </form>
    )
}