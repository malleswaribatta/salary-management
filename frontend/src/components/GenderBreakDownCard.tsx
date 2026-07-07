import { Card, CardContent, Divider, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface GenderCardProps {
  male: number;
  female: number;
  other: number;
}

const COLORS = {
  Female: "#6D28D9",
  Male: "#2563EB",
  Other: "#9E9E9E",
};

export default function GenderCard({ male, female, other }: GenderCardProps) {
  const chartData = [
    {
      id: 0,
      value: female,
      label: "Female",
      color: COLORS.Female,
    },
    {
      id: 1,
      value: male,
      label: "Male",
      color: COLORS.Male,
    },
    {
      id: 2,
      value: other,
      label: "Other",
      color: COLORS.Other,
    },
  ].filter((item) => item.value > 0); // Optional: hide genders with 0 employees

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Gender Breakdown
        </Typography>
      </CardContent>

      <Divider />

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        <PieChart
          width={100}
          height={100}
          series={[
            {
              data: chartData,
              // outerRadius: 90,
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
