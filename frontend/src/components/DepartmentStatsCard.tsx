import {
  Card,
  CardContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { DepartmentStats } from "../types/employee";

interface DepartmentStatsCardProps {
  departments: DepartmentStats[];
}

const tableHeaderCellStyle = {
  fontWeight: 700,
};

export default function DepartmentStatsCard({
  departments,
}: DepartmentStatsCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ py: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Department Breakdown
        </Typography>
      </CardContent>

      <Divider />

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          height: 250,
          overflowY: "auto",
          border: "1px solid #E5E7EB",
          borderRadius: 2,
        }}
      >
        <Table sx={{ width: 780, m: 2 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderCellStyle}>Department</TableCell>
              <TableCell sx={tableHeaderCellStyle}>Headcount</TableCell>
              <TableCell sx={tableHeaderCellStyle}>Avg Salary</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.department} hover>
                <TableCell>{department.department}</TableCell>
                <TableCell>{department.headCount}</TableCell>
                <TableCell>
                  ₹{department.avgSalary.toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}