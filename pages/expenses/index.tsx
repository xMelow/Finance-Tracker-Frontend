import { useEffect, useState } from "react";
import { Expense } from "../../types/expense";
import { getCategories, getExpenses, getTotal, getTotalMonthSpending } from "../../services/api";
import { Category } from "../../types/category";
import AddExpenseForm from "../../components/expense/expenseForm/addExpenseForm";
import ExpenseList from "../../components/expense/expenseList/expenseList";
import styles from './expense.module.css'
import Header from "../../components/header/header";
import Totals from "../../components/totals/totals";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [minAmount, setMinAmount] = useState<number | ''>('');
  const [maxAmount, setMaxAmount] = useState<number | ''>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const now = new Date();
  const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  useEffect(() => {
    getExpenses()
      .then(setExpenses)
      .catch((err) => setError("Error fetching expenses: " + err.message));

    getCategories()
      .then(setCategories)
      .catch((err) => setError("Error fetching categories: " + err.message));
  }, []);

  const handleDeleteExpense = (deletedId: number) => {
      setExpenses((prev) => prev.filter((exp) => exp.id !== deletedId));
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalSpendingMonth = expenses
    .filter(expense => expense.date.startsWith(currentDate))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = filterCategory === 'all' || categories.find(cat => cat.id === expense.categoryId)?.name === filterCategory;
    const matchesMin = minAmount === '' || expense.amount >= minAmount;
    const matchesMax = maxAmount === '' || expense.amount <= maxAmount;
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesMin && matchesMax && matchesSearch;
  });


  return (
    <>
      <Header></Header>
      <div className={styles.transactions}>
          <h1 className="text-2xl font-bold mb-4">Expenses</h1>
          {error && <p className="text-red-500">{error}</p>}

          <div className={styles.flexContainer}>

            <div className={styles.addTransactions}>
              <h2>Add Expense</h2>
              <AddExpenseForm categories={categories} onAddExpense={(newExpense => setExpenses((prev) => [...prev, newExpense]))}></AddExpenseForm>
            </div>

            <div className={styles.totals}>
              <h2>Totals</h2>
              <Totals totalSpending={totalSpending} totalSpendingMonth={totalSpendingMonth}></Totals>
            </div>

            <div className={styles.recentTransactions}>
              <h2>Recent Expenses</h2>
              <ExpenseList expenses={filteredExpenses} categories={categories} onDeleteExpense={handleDeleteExpense} onUpdateSucces={handleUpdateExpense}/>
            </div>

            <div className={styles.filter}>
              <h2>Filter expenses</h2>
              <div>
                <input type="number" placeholder="Min Amount" value={minAmount} onChange={(e) => setMinAmount(e.target.value === '' ? '' : Number(e.target.value))} />
                <input type="number" placeholder="Max Amount" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value === '' ? '' : Number(e.target.value))} />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <input type="text" placeholder="Description" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div> 
            </div>
          </div>
      </div>
    </>
  )
}