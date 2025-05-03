import { useState } from "react";
import { addExpense, getCategoryByName } from "../services/api";


export default function AddExpenseForm() {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(category);
        const categoryId = (await getCategoryByName(category)).id;
        try {
            await addExpense({
                amount: parseFloat(amount),
                categoryId: categoryId,
                description,
                date,
            });
            alert("Expense Added!"); // change to pop-up
            setAmount("");
            setCategory("");
            setDescription("");
            setDate("");
        } catch (error) {
            alert("Error adding exepnense"); // change
            console.error(error)
        }
    }

    // change category to dropdown with categories from api
    return (
        <form onSubmit={handleSubmit}>
            <input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="Amount" required />
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required /> 
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
            <input value={date} type="date" onChange={e => setDate(e.target.value)} required />
            <button type="submit">Add Expense</button>
        </form>
    )
}