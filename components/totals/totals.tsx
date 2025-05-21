import { monthSpending } from "../../types/monthSpending.";


interface TotalProps {
    totalSpending: number | undefined;
    totalMonthSpending: monthSpending[];
}

export default function Totals({ totalSpending, totalMonthSpending }: TotalProps) {
    return (
        <div>
            <p>Total Spending {totalSpending}</p>

            {totalMonthSpending.map((month) => (
                <p key={month.month}>month: {month.month}, Amount: {month.total}</p>
            ))}
        </div>
    )
}