import { useFinance } from "../context/FinanceContext";

const TransactionTable = () => {
    const { transactions, filters, setFilters } = useFinance();

    const filtered = transactions.filter((t) =>
        t.category.toLowerCase().includes(filters.search.toLowerCase())
    );

    return (
        <div>
            <input
                placeholder="Search category..."
                className="border p-2 mb-4"
                value={filters.search}
                onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
            />

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((t) => (
                        <tr key={t.id} className="text-center">
                            <td>{t.date}</td>
                            <td>{t.amount}</td>
                            <td>{t.category}</td>
                            <td>{t.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;