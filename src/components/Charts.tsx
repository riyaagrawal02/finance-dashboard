import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type SpendingDatum = {
  category: string;
  amount: number;
};

type BalanceDatum = {
  date: string;
  balance: number;
};

type SpendingPieProps = {
  data: SpendingDatum[];
  colors?: string[];
};

type BalanceLineProps = {
  data: BalanceDatum[];
};

export const SpendingPie = ({ data, colors }: SpendingPieProps) => {
  const palette = colors ?? [
    "#0ea5a4",
    "#38bdf8",
    "#f59e0b",
    "#f97316",
    "#14b8a6",
  ];
  return (
    <PieChart width={300} height={250}>
      <Pie data={data} dataKey="amount" nameKey="category" outerRadius={80}>
        {data.map((entry, index) => (
          <Cell
            key={`${entry.category}-${index}`}
            fill={palette[index % palette.length]}
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export const BalanceLine = ({ data }: BalanceLineProps) => {
  return (
    <LineChart width={400} height={250} data={data}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="balance" />
    </LineChart>
  );
};