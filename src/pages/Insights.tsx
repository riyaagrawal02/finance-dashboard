import { useMemo } from "react";
import SummaryCard from "../components/SummaryCard";
import { useFinance } from "../context/FinanceContext";

const Insights = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions.filter((t) => t.type === "expense");
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const highest = expenses.reduce(
    (max, t) => (!max || t.amount > max.amount ? t : max),
    null as null | (typeof expenses)[number]
  );

  const categoryTotals = useMemo(() => {
    return transactions.reduce<Record<string, number>>((acc, t) => {
      if (t.type !== "expense") {
        return acc;
      }
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {});
  }, [transactions]);

  const topCategory = useMemo(() => {
    const entries = Object.entries(categoryTotals);
    if (!entries.length) {
      return null;
    }
    return entries.sort((a, b) => b[1] - a[1])[0];
  }, [categoryTotals]);

  const avgExpense = expenses.length
    ? Math.round(totalExpense / expenses.length)
    : 0;

  const expenseRatio = income ? Math.round((totalExpense / income) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-ink">Insights</h3>
        <p className="text-sm text-muted">
          Signals and patterns based on recent activity.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SummaryCard
          title="Top Category"
          amount={topCategory ? topCategory[0] : "None"}
          hint={
            topCategory
              ? `₹ ${topCategory[1].toLocaleString()} spent`
              : "No expense data yet"
          }
          accent="blue"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12h16M4 7h10M4 17h7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Avg Expense"
          amount={avgExpense.toLocaleString()}
          hint="Per transaction"
          accent="amber"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 7h10v10H7z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Expense Ratio"
          amount={`${expenseRatio}%`}
          hint="Expenses vs income"
          accent="rose"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 18L18 6M6 6h12v12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-stroke bg-panel p-6 shadow-card">
          <h4 className="text-base font-semibold text-ink">Notable spend</h4>
          {highest ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted">Largest single expense</p>
              <p className="text-xl font-semibold text-ink">{highest.category}</p>
              <p className="text-sm text-muted">₹ {highest.amount.toLocaleString()}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">No expense data yet.</p>
          )}
        </div>

        <div className="rounded-3xl border border-stroke bg-panel p-6 shadow-card">
          <h4 className="text-base font-semibold text-ink">Category mix</h4>
          <div className="mt-4 space-y-3">
            {Object.entries(categoryTotals).length ? (
              Object.entries(categoryTotals).map(([category, amount]) => (
                <div
                  key={category}
                  className="flex items-center justify-between rounded-2xl border border-stroke bg-surface px-4 py-3"
                >
                  <span className="text-sm font-medium text-ink">{category}</span>
                  <span className="text-sm text-muted">₹ {amount.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">No expense categories to show.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;