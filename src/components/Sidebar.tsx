import type { ReactNode } from "react";

export type SidebarItem = {
    id: string;
    label: string;
    description: string;
    icon?: ReactNode;
};

type SidebarProps = {
    items: SidebarItem[];
    activeId: string;
    onSelect: (id: string) => void;
    isOpen: boolean;
    onClose: () => void;
};

const Sidebar = ({ items, activeId, onSelect, isOpen, onClose }: SidebarProps) => {
    return (
        <>
            <div
                className={`fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm transition lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                onClick={onClose}
            />
            <aside
                className={`fixed left-0 top-0 z-40 h-full w-72 border-r border-stroke bg-panel/95 p-6 shadow-card backdrop-blur transition lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted">Pulse</p>
                        <h1 className="text-2xl font-semibold text-ink">Finance Lab</h1>
                    </div>
                    <button
                        className="rounded-full border border-stroke p-2 text-muted lg:hidden"
                        onClick={onClose}
                        aria-label="Close menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M5 5L15 15M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                <nav className="mt-10 space-y-3">
                    {items.map((item) => {
                        const active = item.id === activeId;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={`group w-full rounded-2xl border p-4 text-left transition ${active
                                        ? "border-transparent bg-ink text-paper shadow-soft"
                                        : "border-stroke bg-surface text-ink hover:border-accent/30 hover:bg-surface"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold tracking-wide">{item.label}</p>
                                        <p
                                            className={`mt-1 text-xs ${active ? "text-paper/70" : "text-muted"
                                                }`}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${active
                                                ? "bg-paper/10 text-paper"
                                                : "bg-ink/5 text-muted group-hover:text-ink"
                                            }`}
                                    >
                                        {item.icon}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-10 rounded-2xl border border-stroke bg-surface p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Status</p>
                    <p className="mt-2 text-sm font-semibold text-ink">All systems steady</p>
                    <p className="mt-1 text-xs text-muted">Last sync 4 min ago</p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
