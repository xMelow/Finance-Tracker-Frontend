import { deleteExpense } from "../services/api";
import { Category } from "../types/category";
import { Expense } from "../types/expense";
import { ConstructionIcon, Pencil, Trash2 } from 'lucide-react';

interface ExpenseItemProps {
    expense: Expense;
    categories: Category[];
}

export default function ExpenseItem({ expense, categories }: ExpenseItemProps) {
    const categoryName = categories.find((cat) => cat.id === Number(expense.categoryId))?.name ?? "Unknown";

    const onEdit = async (expense: Expense) => {
        //ToDo
    }

    const onDelete = async (expenseId: number) => {
        try {
            await deleteExpense(expenseId);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start shadow-sm rounded p-3 mb-3">
            <div>
                <h5 className="mb-1">{expense.description}</h5>

                <div className="bg-light p-3 rounded text-muted">
                    <p>- Amount: € {expense.amount}</p>
                    <p>- Category: {categoryName}</p>
                    <p>- Date: {new Date(expense.date).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center">
                <button
                    onClick={() => onEdit(expense)}
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
        </li>
    );
}
