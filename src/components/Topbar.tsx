import type { ReactNode } from "react";
import type { Role } from "../context/FinanceContext";

type TopbarProps = {
    title: string;
    subtitle: string;
    role: Role;
    onRoleChange: (role: Role) => void;
    theme: "light" | "dark";
    onThemeToggle: () => void;
    onMenuToggle: () => void;
    actions?: ReactNode;
};

const Topbar = ({
    title,
    subtitle,
    role,
    onRoleChange,
    theme,
    onThemeToggle,
    onMenuToggle,
    actions,
}: TopbarProps) => {
    return (
        <header className="sticky top-0 z-20 border-b border-stroke bg-panel/80 px-6 py-4 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuToggle}
                        className="rounded-xl border border-stroke bg-surface p-2 text-muted lg:hidden"
                        aria-label="Open menu"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M4 7H20M4 12H20M4 17H20"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                    <div>
                        <h2 className="text-xl font-semibold text-ink">{title}</h2>
                        <p className="text-sm text-muted">{subtitle}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {actions}

                    <button
                        onClick={onThemeToggle}
                        className="flex items-center gap-2 rounded-xl border border-stroke bg-surface px-3 py-2 text-sm font-medium text-ink"
                    >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ink/5">
                            {theme === "dark" ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M21 12.79A9 9 0 1 1 11.21 3c.45 0 .9.03 1.34.1a1 1 0 0 1 .43 1.82A7 7 0 1 0 19.08 14a1 1 0 0 1 1.82.43c.07.44.1.89.1 1.36Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M12 3v2.5M12 18.5V21M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M3 12h2.5M18.5 12H21M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                    />
                                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                                </svg>
                            )}
                        </span>
                        {theme === "dark" ? "Night" : "Day"}
                    </button>

                    <div className="flex items-center gap-2 rounded-xl border border-stroke bg-surface px-3 py-2">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted">Role</span>
                        <select
                            value={role}
                            onChange={(event) => onRoleChange(event.target.value as Role)}
                            className="bg-transparent text-sm font-medium text-ink outline-none"
                        >
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
