import { Expense } from "../../../types/expense";
import { Category } from "../../../types/category";
import { JSX } from "react";
import ExpenseItem from "../expenseItem/expenseItem";

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
  onDeleteExpense: (expenseId: number) => void;
  onUpdateSucces: (expense: Expense) => void;
}

export default function ExpenseList({ expenses, categories, onDeleteExpense, onUpdateSucces }: ExpenseListProps): JSX.Element {
  return (
    <div className="">
      {expenses.length === 0 ? (
        <p className="">No expenses found.</p>
      ) : (
        <ul className="">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} categories={categories} onDeleteSucces={onDeleteExpense} onUpdateSucces={onUpdateSucces}></ExpenseItem>
          ))}
        </ul>
      )}
    </div>
  );
}