import { monthSpending } from "../../types/monthSpending.";


interface TotalProps {
    totalSpending: number | undefined;
    totalMonthSpending: monthSpending[];
}

export default function Totals({ totalSpending, totalMonthSpending }: TotalProps) {
    return (
        <div>
            <p><strong>Total Spending:</strong> €{totalSpending?.toFixed(2) ?? 'Loading...'}</p>
            {totalMonthSpending.map((month) => (
                <p key={month.month}>
                    <span>Month: {month.month} — </span>
                    <span>€{month.total}</span>
                </p>
            ))}
        </div>
    )
}