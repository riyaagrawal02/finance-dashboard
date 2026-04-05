/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

export type Role = "viewer" | "admin";

export type TransactionTypeFilter = "all" | "income" | "expense";

export type Filters = {
  search: string;
  type: TransactionTypeFilter;
  category: string;
};

interface FinanceContextType {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  role: Role;
  setRole: (role: Role) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
    { id: 2, date: "2026-04-02", amount: 800, category: "Food", type: "expense" },
    { id: 3, date: "2026-04-03", amount: 1200, category: "Shopping", type: "expense" },
    { id: 4, date: "2026-04-04", amount: 2000, category: "Freelance", type: "income" },
  ]);

  const [role, setRole] = useState<Role>(() => {
    if (typeof window === "undefined") {
      return "viewer";
    }
    const saved = window.localStorage.getItem("finance.role");
    return saved === "admin" ? "admin" : "viewer";
  });

  const [filters, setFilters] = useState<Filters>(() => {
    if (typeof window === "undefined") {
      return { search: "", type: "all", category: "all" };
    }
    const saved = window.localStorage.getItem("finance.filters");
    if (!saved) {
      return { search: "", type: "all", category: "all" };
    }
    try {
      const parsed = JSON.parse(saved) as Filters;
      return {
        search: parsed.search ?? "",
        type: parsed.type ?? "all",
        category: parsed.category ?? "all",
      };
    } catch {
      return { search: "", type: "all", category: "all" };
    }
  });

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light";
    }
    const saved = window.localStorage.getItem("finance.theme");
    return saved === "dark" ? "dark" : "light";
  });

  const addTransaction = useCallback((tx: Transaction) => {
    setTransactions((prev) => [...prev, tx]);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem("finance.role", role);
  }, [role]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem("finance.filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("finance.theme", theme);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      transactions,
      addTransaction,
      role,
      setRole,
      filters,
      setFilters,
      theme,
      toggleTheme,
    }),
    [transactions, addTransaction, role, filters, theme, toggleTheme]
  );

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = (): FinanceContextType => {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }

  return context;
};