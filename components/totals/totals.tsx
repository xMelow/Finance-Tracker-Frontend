

interface TotalProps {
    totalSpending: number | undefined;
}

export default function Totals({ totalSpending }: TotalProps) {
    return (
        <div>
            <p><strong>Total Spending:</strong> €{totalSpending?.toFixed(2) ?? 'Loading...'}</p>
            {/* <p><strong>Total Spending this month:</strong> €{totalSpendingMonth?.toFixed(2) ?? 'Loading...'}</p> */}
        </div>
    )
}