import { BalanceLine, SpendingPie } from "../components/Charts";
import SummaryCard from "../components/SummaryCard";
import { useFinance } from "../context/FinanceContext";

const Dashboard = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const savingsRate = income ? Math.round((balance / income) * 100) : 0;

  const expenseByCategory = (() => {
    const totals = transactions.reduce<Record<string, number>>((acc, tx) => {
      if (tx.type !== "expense") {
        return acc;
      }
      acc[tx.category] = (acc[tx.category] ?? 0) + tx.amount;
      return acc;
    }, {});
    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount,
    }));
  })();

  const balanceSeries = (() => {
    const sorted = [...transactions].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    return sorted.reduce<{ date: string; balance: number }[]>((acc, tx) => {
      const previous = acc.length ? acc[acc.length - 1].balance : 0;
      const next = previous + (tx.type === "income" ? tx.amount : -tx.amount);
      acc.push({ date: tx.date.slice(5), balance: next });
      return acc;
    }, []);
  })();

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-4">
        <SummaryCard
          title="Total Balance"
          amount={balance.toLocaleString()}
          hint="Net position"
          accent="blue"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12h18M12 3v18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Income"
          amount={income.toLocaleString()}
          hint="This cycle"
          accent="teal"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 13l5-5 5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Expenses"
          amount={expense.toLocaleString()}
          hint="Run rate"
          accent="rose"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 11l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Savings Rate"
          amount={`${savingsRate}%`}
          hint="Balance / Income"
          accent="amber"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 12h4l2-4 4 8 2-4h4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-stroke bg-panel p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-ink">Balance trajectory</h3>
              <p className="text-sm text-muted">Daily net change over the week</p>
            </div>
            <span className="rounded-full bg-ink/5 px-3 py-1 text-xs text-muted">
              Live
            </span>
          </div>
          <div className="mt-6 overflow-x-auto">
            <BalanceLine data={balanceSeries} />
          </div>
        </div>

        <div className="rounded-3xl border border-stroke bg-panel p-6 shadow-card">
          <div>
            <h3 className="text-lg font-semibold text-ink">Spending pulse</h3>
            <p className="text-sm text-muted">Category split for the period</p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4">
            {expenseByCategory.length ? (
              <SpendingPie data={expenseByCategory} />
            ) : (
              <p className="text-sm text-muted">No expense data yet.</p>
            )}
            <div className="flex flex-wrap justify-center gap-2">
              {expenseByCategory.map((item) => (
                <span
                  key={item.category}
                  className="rounded-full border border-stroke bg-surface px-3 py-1 text-xs text-muted"
                >
                  {item.category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;