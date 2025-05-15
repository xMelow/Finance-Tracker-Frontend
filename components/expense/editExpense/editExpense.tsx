import { useState } from "react";
import { updateExpense } from "../../../services/api";
import { Expense } from "../../../types/expense";
import { Category } from "../../../types/category";

interface EditExpenseProps {
    expense: Expense;
    categories: Category[];
    onClose: () => void;
}

export default function EditExpense({ expense, categories, onClose }: EditExpenseProps) {
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);
    const [categoryId, setCategoryId] = useState(expense.categoryId);
    const [date, setDate] = useState(expense.date);

    const handleSave = async () => {
        const updatedExpense = {
            amount,
            categoryId,
            description,
            date: date.toString(),
        };
        try {
            await updateExpense(expense.id, updatedExpense);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content p-4 bg-white shadow rounded">
                <h2>Edit Expense</h2>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" />
                <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} required >
                    <option value="" disabled>Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <button onClick={handleSave} className="btn btn-primary">Save</button>
                <button onClick={onClose} className="btn btn-secondary">Cancel</button>
            </div>
        </div>
    );
}
