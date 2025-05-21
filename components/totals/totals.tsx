

interface TotalProps {
    totalSpending: number;
    totalSpendingMonth: number;
}

export default function Totals({ totalSpending, totalSpendingMonth }: TotalProps) {
    return (
        <div>
            <p><strong>Total Spending:</strong> €{totalSpending?.toFixed(2) ?? 'Loading...'}</p>
            <p><strong>Total Spending this month:</strong> €{totalSpendingMonth?.toFixed(2) ?? 'Loading...'}</p>
        </div>
    )
}