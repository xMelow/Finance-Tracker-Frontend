import { Category } from '../types/category';
import { Expense } from '../types/expense';

const API_URL = "http://localhost:8080"

export async function getExpenses(): Promise<Expense[]> {
    const response = await fetch(`${API_URL}/expenses`);

    if (!response.ok) {  throw new Error("Failed to fetch Expenses"); }

    return await response.json();
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