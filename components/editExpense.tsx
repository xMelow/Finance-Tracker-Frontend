import { useState } from "react";
import { getCategoryByName, updateExpense } from "../services/api";
import { Expense } from "../types/expense";
import { Category } from "../types/category";

interface EditExpenseProps {
    expense: Expense;
    categories: Category[];
    onClose: () => void;
}

export default function EditExpense({ expense, categories, onClose }: EditExpenseProps) {
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.categoryId);
    const [date, setDate] = useState(expense.date);

    const handleSave = async () => {
        const categoryId = (await getCategoryByName(category)).id;
        
        const updatedExpense = {
            amount: parseFloat(amount),
            categoryId: categoryId,
            description,
            date,
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
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
                <select value={category} onChange={e => setCategory(e.target.value)} required>
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat, id) => (
                        <option key={id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
                <input value={description} onChange={(e) => setDescription(e.target.value)} />
                <input value={date} type="date" onChange={e => setDate(e.target.value)} required />
                <button onClick={handleSave} className="btn btn-primary">Save</button>
                <button onClick={onClose} className="btn btn-secondary">Cancel</button>
            </div>
        </div>
    );
}
