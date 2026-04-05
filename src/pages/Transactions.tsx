import { useMemo } from "react";
import { useFinance } from "../context/FinanceContext";

const Transactions = () => {
  const { transactions, role, filters, setFilters } = useFinance();

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((t) => t.category));
    return ["all", ...Array.from(unique)];
  }, [transactions]);

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return transactions.filter((tx) => {
      if (filters.type !== "all" && tx.type !== filters.type) {
        return false;
      }
      if (filters.category !== "all" && tx.category !== filters.category) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        tx.category.toLowerCase().includes(query) ||
        tx.date.includes(query) ||
        String(tx.amount).includes(query)
      );
    });
  }, [filters, transactions]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  }, [filtered]);

  const totalAmount = filtered.reduce(
    (sum, t) => sum + (t.type === "expense" ? -t.amount : t.amount),
    0
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-stroke bg-panel p-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-ink">Transactions</h3>
            <p className="text-sm text-muted">
              {filtered.length} entries • Net ₹ {totalAmount.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {role === "admin" ? (
              <button className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-paper">
                Add transaction
              </button>
            ) : (
              <span className="rounded-full border border-stroke bg-surface px-3 py-1 text-xs text-muted">
                Viewer mode
              </span>
            )}
            <button className="rounded-xl border border-stroke bg-surface px-4 py-2 text-sm font-semibold text-ink">
              Export CSV
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-[1.4fr_0.6fr_0.6fr]">
          <input
            type="text"
            value={filters.search}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, search: event.target.value }))
            }
            placeholder="Search by category, date, or amount"
            className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          />
          <select
            value={filters.type}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                type: event.target.value as typeof filters.type,
              }))
            }
            className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={filters.category}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                category: event.target.value,
              }))
            }
            className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-stroke bg-panel shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/80 text-xs uppercase tracking-[0.2em] text-muted">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Amount</th>
                {role === "admin" ? <th className="px-6 py-4">Actions</th> : null}
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke">
              {sorted.map((t) => (
                <tr key={t.id} className="transition hover:bg-surface/70">
                  <td className="px-6 py-4 text-ink">{t.date}</td>
                  <td className="px-6 py-4 text-ink">{t.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${t.type === "income"
                          ? "bg-teal-500/15 text-teal-700 dark:text-teal-200"
                          : "bg-rose-500/15 text-rose-700 dark:text-rose-200"
                        }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-ink">
                    ₹ {t.amount.toLocaleString()}
                  </td>
                  {role === "admin" ? (
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="rounded-lg border border-stroke bg-surface px-3 py-1 text-xs text-ink">
                          Edit
                        </button>
                        <button className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-xs text-rose-600 dark:text-rose-200">
                          Archive
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!sorted.length ? (
          <div className="px-6 py-10 text-center text-sm text-muted">
            No transactions match your filters.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Transactions;