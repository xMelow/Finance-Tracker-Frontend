import { useState } from "react";
import { updateExpense } from "../../../services/api";
import { Expense } from "../../../types/expense";
import { Category } from "../../../types/category";
import styles from "./editExpense.module.css"

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
        <div>
            <form className={styles.expenseForm}>
                <input className={styles.expenseFormAmount} type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" />
                <select className={styles.expenseFormSelect} value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} required >
                    <option value="" disabled>Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <input className={styles.expenseFormDescription} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <input className={styles.expenseFormDate} type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <button className={styles.expenseFormSave} onClick={handleSave} >Save</button>
                <button className={styles.expenseFormCancel} onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}
