import { Card, CardContent, Divider, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface EmployeeTypeCardProps {
  Contract: number;
  FullTime: number;
}

const COLORS = {
  FullTime: "#5fbc08",
  Contract: "#d8801b",
};

export default function EmployeeTypeCard({
  FullTime,
  Contract,
}: EmployeeTypeCardProps) {
  const chartData = [
    {
      id: 0,
      value: FullTime,
      label: "FullTime",
      color: COLORS.FullTime,
    },
    {
      id: 1,
      value: Contract,
      label: "Contract",
      color: COLORS.Contract,
    },
  ].filter((item) => item.value > 0); // Optional: hide genders with 0 employees

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          // flex: 1,
          // display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          EmployeeType Breakdown
        </Typography>
      </CardContent>

      <Divider />

      <CardContent
        sx={{
          py: 4,
        }}
      >
        <PieChart
          width={100}
          height={100}
          series={[
            {
              data: chartData,
            },
          ]}
          slotProps={{
            legend: {
              direction: "horizontal",
              position: {
                vertical: "bottom",
                horizontal: "center",
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
