import { useSearchParams } from "next/navigation";
import Header from "../../components/main/header/header";
import styles from "./totals.module.css";
import { useEffect, useState } from "react";
import { getTotals } from "../../services/api";

export default function Totals() {
    const [totals, setTotals] = useState<string>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTotals()
            .then(setTotals)
            .catch((err) => setError("Error fetching totals: " + err.message))
    }, []);

    return (
         <>
            <Header></Header>
            <div>
                <h1 className="text-2xl font-bold mb-4">Totals</h1>
                {error && <p className="text-red-500">{error}</p>}
            </div>
            <div>
                
            </div>
        </>
        
    )
}