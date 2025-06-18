import { Category } from '../types/category';
import { CategorySpending } from '../types/categorySpending';
import { Expense } from '../types/expense';
import { monthSpending } from '../types/monthSpending.';

const API_URL = "http://localhost:8080";

// Expense

export async function getExpenses(params?: {
    categoryId?: string,
    minAmount?: number,
    maxAmount?: number,
    description: string
}): Promise<Expense[]> {
    const query = new URLSearchParams();

  if (params) {
    if (params.categoryId != null) query.append('category', String(params.categoryId));
    if (params.minAmount != null) query.append('minAmount', String(params.minAmount));
    if (params.maxAmount != null) query.append('maxAmount', String(params.maxAmount));
    if (params.description && params.description.trim() !== '') query.append('description', params.description);
  }

  const response = await fetch(`${API_URL}/expenses?${query.toString()}`);

  if (!response.ok) throw new Error("Failed to fetch expenses");

  return response.json();
}

export async function addExpense(expense: {
    amount: number;
    categoryId: number;
    description: string;
    date: string;
}): Promise<Expense> {
    const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
    });

    if (!response.ok) { throw new Error("Failed to add Expense") }

    return await response.json();
}

export async function deleteExpense(id: number): Promise<Expense> {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) { throw new Error("Failed to delete Expense"); }

    return await response.json();
}

export async function updateExpense(id: number, expense: {
    amount: number;
    categoryId: number;
    description: string;
    date: string;
}): Promise<Expense> {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
    });

    if (!response.ok) { throw new Error("Failed to update Expense") }

    return await response.json();
}

// Category

export async function getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/category`);

    if (!response.ok) { throw new Error("Failed to fetch Category"); }

    return await response.json();
}

export async function getCategoryByName(name: string): Promise<Category> {
    const response = await fetch(`${API_URL}/category/name/${name}`);

    if (!response.ok) { throw new Error("Failed to fetch Category name"); }

    return await response.json();
}

// Totals

export async function getTotal(): Promise<number> {
    const response = await fetch(`${API_URL}/total/overall`);

    if (!response.ok) { throw new Error("Failed to fetch total spending"); }

    const data = await response.json()

    return data.totalSpending; 
}

export async function getTotalMonthSpending(): Promise<monthSpending[]> {
    const response = await fetch(`${API_URL}/total/month`);

    if (!response.ok) { throw new Error("Failed to fetch monthly spending"); }

    return await response.json(); 
}

export async function getTotalCategorySpending(): Promise<CategorySpending[]> {
    const response = await fetch(`${API_URL}/total/category`);

    if (!response.ok) { throw new Error("Failed to fetch total category spending"); }

    return await response.json();
}