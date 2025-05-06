import { Expense } from "../types/expense";
import { Category } from "../types/category";
import { JSX } from "react";
import ExpenseItem from "../components/expenseItem"

interface ExpenseListProps {
  expenses: Expense[];
  categories: Category[];
}

export default function ExpenseList({ expenses, categories }: ExpenseListProps): JSX.Element {
  return (
    <div className="">
      {expenses.length === 0 ? (
        <p className="">No expenses found.</p>
      ) : (
        <ul className="">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} categories={categories}></ExpenseItem>
          ))}
        </ul>
      )}
    </div>
  );
}