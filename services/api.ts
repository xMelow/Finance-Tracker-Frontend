import { Category } from '../types/category';
import { Expense } from '../types/expense';

const API_URL = "http://localhost:8080"

// Expense

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

export async function getTotals(): Promise<string> {
    const response = await fetch(`${API_URL}/total/overall`);

    if (!response.ok) { throw new Error("Failed to fetch Category"); }

    return await response.json(); 
}