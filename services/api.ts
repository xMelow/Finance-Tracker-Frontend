import { Expense } from '../types/expense';

const API_URL = "http://localhost:8080"

export async function getExpenses(): Promise<Expense[]> {
    const response = await fetch(`${API_URL}/expenses`);
    if (!response.ok) {
        throw new Error("Failed to fetch Expenses");
    }

    const data = await response.json();
    return data;
}