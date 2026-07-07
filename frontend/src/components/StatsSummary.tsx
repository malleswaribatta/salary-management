import { Box } from "@mui/material";
import StatCard from "./StatsCard";

export interface SalarySummary {
  headcount: number;
  averageSalary: number;
  minSalary: number;
  maxSalary: number;
  totalPayroll: number;
}

interface StatsSummaryProps {
  summary: SalarySummary;
}

export default function StatsSummary({ summary }: StatsSummaryProps) {
  const stats = [
    {
      title: "Headcount",
      value: summary.headcount.toLocaleString(),
    },
    {
      title: "Avg Salary",
      value: `₹${summary.averageSalary.toLocaleString("en-IN")}`,
    },
    {
      title: "Min Salary",
      value: `₹${summary.minSalary.toLocaleString("en-IN")}`,
    },
    {
      title: "Max Salary",
      value: `₹${summary.maxSalary.toLocaleString("en-IN")}`,
    },
    {
      title: "Total Payroll",
      value: `₹${(summary.totalPayroll / 1_000_000_000).toFixed(1)}B`,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(5, 1fr)",
        },
        gap: 2,
        paddingBottom: 3,
      }}
    >
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </Box>
  );
}
