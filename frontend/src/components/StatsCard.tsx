import { Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        // height: "100%",
        border: "1px solid #E5E7EB",
        borderRadius: 3,
        // width:150,
      }}
    >
      <CardContent
        sx={{
          //   height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 1,
          //   px: 3,
          //   py: 2.5,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: "10%",
            // mb: 1,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
