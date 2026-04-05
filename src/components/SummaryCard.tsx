import type { ReactNode } from "react";

type Accent = "teal" | "amber" | "blue" | "rose";

interface Props {
  title: string;
  amount: number | string;
  hint?: string;
  accent?: Accent;
  icon?: ReactNode;
}

const accentStyles: Record<Accent, string> = {
  teal: "from-teal-500/15 via-teal-500/5",
  amber: "from-amber-500/15 via-amber-500/5",
  blue: "from-sky-500/15 via-sky-500/5",
  rose: "from-rose-500/15 via-rose-500/5",
};

const SummaryCard = ({ title, amount, hint, accent = "teal", icon }: Props) => {
  return (
    <div
      className={`rounded-3xl border border-stroke bg-surface p-6 shadow-soft transition hover:-translate-y-1 ${accentStyles[accent]
        } bg-gradient-to-br`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-ink">₹ {amount}</p>
          {hint ? <p className="mt-2 text-sm text-muted">{hint}</p> : null}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink/5 text-ink">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;