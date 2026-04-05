import { useMemo, useState } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { useFinance, type Role } from "./context/FinanceContext";
import Sidebar, { type SidebarItem } from "./components/Sidebar";
import Topbar from "./components/Topbar";

type Page = "dashboard" | "transactions" | "insights";

const App = () => {
  const [page, setPage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, setRole, theme, toggleTheme } = useFinance();

  const navItems: SidebarItem[] = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Pulse overview",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 13h6V4H4v9Zm10 7h6V11h-6v9Zm0-11h6V4h-6v5ZM4 20h6v-5H4v5Z"
              fill="currentColor"
            />
          </svg>
        ),
      },
      {
        id: "transactions",
        label: "Transactions",
        description: "Flow control",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 8h10M7 12h6M7 16h8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        id: "insights",
        label: "Insights",
        description: "Trends & alerts",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 18h4l2-6 4 8 2-5h4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    ],
    []
  );

  const pageMeta = {
    dashboard: { title: "Finance Overview", subtitle: "Live portfolio signal" },
    transactions: { title: "Transactions", subtitle: "Search and control cash flow" },
    insights: { title: "Insights", subtitle: "Smart read on spending patterns" },
  } satisfies Record<Page, { title: string; subtitle: string }>;

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar
        items={navItems}
        activeId={page}
        onSelect={(next) => {
          setPage(next as Page);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar
          title={pageMeta[page].title}
          subtitle={pageMeta[page].subtitle}
          role={role}
          onRoleChange={(nextRole: Role) => setRole(nextRole)}
          theme={theme}
          onThemeToggle={toggleTheme}
          onMenuToggle={() => setSidebarOpen(true)}
          actions={
            <button className="rounded-xl border border-stroke bg-surface px-4 py-2 text-sm font-semibold text-ink">
              Sync data
            </button>
          }
        />

        <main className="flex-1 px-6 py-8 lg:px-10">
          {page === "dashboard" && <Dashboard />}
          {page === "transactions" && <Transactions />}
          {page === "insights" && <Insights />}
        </main>
      </div>
    </div>
  );
};

export default App;