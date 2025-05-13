import { useState } from "react";
import { Pencil, Trash2 } from 'lucide-react';
import { deleteExpense } from "../../../services/api";
import { Expense } from "../../../types/expense";
import { Category } from "../../../types/category";
import EditExpense from "../editExpense/editExpense";
import styles from './expenseItem.module.css'


interface ExpenseItemProps {
    expense: Expense;
    categories: Category[];
}

export default function ExpenseItem({ expense, categories }: ExpenseItemProps) {
    const [showPopUpEdit, setShowPopUpEdit] = useState(false);
    const categoryName = categories.find((cat) => cat.id === Number(expense.categoryId))?.name ?? "Unknown";

    const onEdit = async () => {
        setShowPopUpEdit(true);
    }

    const onDelete = async (expenseId: number) => {
        try {
            await deleteExpense(expenseId);
            alert("deleted expense")
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={styles.expenseItem}>
                <h2 className="mb-1">{expense.description}</h2>

                <div className={styles.expenseItemData}>
                    <p>Amount: € {expense.amount}</p>
                    <p>Category: {categoryName}</p>
                    <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                </div>
                
                <div className={styles.expenseItemButtons}>
                    <button
                        onClick={() => onEdit()}
                        className="btn btn-outline-primary btn-sm mb-2"
                        aria-label="Edit Expense"
                    >
                        <Pencil size={20} />
                    </button>

                    <button
                        onClick={() => onDelete(expense.id)}
                        className="btn btn-outline-danger btn-sm"
                        aria-label="Delete Expense"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
            {showPopUpEdit && (
                <EditExpense
                    expense={expense}
                    categories={categories}
                    onClose={() => setShowPopUpEdit(false)}
                />
            )}
        </>
    );
}
