import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type {
  DepartmentStats,
  EmployeeTypeeCount,
  GenderCount,
  Lookup,
  SalarySummary,
} from "../types/employee";
import { getCountries } from "../api/lookupApi";
import {
  getDepartmentStatsByCountry,
  getEmployeeTypeByCountry,
  getGenderStatsByCountry,
} from "../api/employeeApi";

import GenderBreakdownCard from "./GenderBreakDownCard";
import EmployeeTypeCard from "./EmployeeTypeBreakDownCard";
import DepartmentStatsCard from "./DepartmentStatsCard";
import StatsSummary from "./StatsSummary";

const EMPTY_SUMMARY: SalarySummary = {
  headcount: 0,
  averageSalary: 0,
  minSalary: 0,
  maxSalary: 0,
  totalPayroll: 0,
};

function calculateSalarySummary(
  departments: DepartmentStats[],
): SalarySummary {
  if (!departments.length) return EMPTY_SUMMARY;

  let headcount = 0;
  let totalPayroll = 0;
  let minSalary = Number.POSITIVE_INFINITY;
  let maxSalary = Number.NEGATIVE_INFINITY;

  for (const department of departments) {
    headcount += department.headCount;
    totalPayroll += department.avgSalary * department.headCount;

    minSalary = Math.min(minSalary, department.minSalary);
    maxSalary = Math.max(maxSalary, department.maxSalary);
  }

  return {
    headcount,
    averageSalary: headcount === 0 ? 0 : Math.round(totalPayroll / headcount),
    minSalary,
    maxSalary,
    totalPayroll,
  };
}

export default function InsightsPageModal() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState<Lookup[]>([]);
  const [gender, setGender] = useState<GenderCount>();
  const [employeeType, setEmployeeType] = useState<EmployeeTypeeCount>();
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [summary, setSummary] = useState<SalarySummary>(EMPTY_SUMMARY);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await getCountries();
      setCountries(response.data);
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (!country) return;

    const countryId = Number(country);

    const loadInsights = async () => {
      try {
        const [
          genderDetails,
          employeeTypeDetails,
          departmentDetails,
        ] = await Promise.all([
          getGenderStatsByCountry(countryId),
          getEmployeeTypeByCountry(countryId),
          getDepartmentStatsByCountry(countryId),
        ]);

        console.log("Gender Details:", genderDetails);
        console.log("Employee Type Details:", employeeTypeDetails);
        console.log("Department Stats:", departmentDetails);

        setGender(genderDetails);
        setEmployeeType(employeeTypeDetails);
        setDepartmentStats(departmentDetails);
        setSummary(calculateSalarySummary(departmentDetails));
      } catch (error) {
        console.error("Failed to fetch salary insights:", error);
      }
    };

    loadInsights();
  }, [country]);

  return (
    <Box
      sx={{
        width: "50%",
        minHeight: "80vh",
        overflow: "auto",
        bgcolor: "#f5f5f5",
        py: 4,
        px: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "50vh",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "85vh",
          flex: 6,
          bgcolor: "#fff",
          borderRadius: 5,
          border: "1px solid #E5E7EB",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            Salary Insights
          </Typography>

          <FormControl sx={{ width: 260 }}>
            <Select
              value={country}
              displayEmpty
              size="small"
              onChange={(e) => setCountry(e.target.value)}
              renderValue={(selected) =>
                !selected
                  ? (
                    <Typography sx={{ color: "text.secondary" }}>
                      Select Country
                    </Typography>
                  )
                  : (
                    countries.find((c) => c.id.toString() === selected)?.name ??
                      ""
                  )}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id.toString()}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {!country
          ? (
            <Box
              sx={{
                height: 450,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="text.secondary">
                Select a country to view salary insights
              </Typography>
            </Box>
          )
          : (
            <Box sx={{ gap: 3, pb: 20 }}>
              <StatsSummary summary={summary} />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, 1fr)",
                  },
                  gap: 3,
                }}
              >
                <GenderBreakdownCard
                  male={gender?.data.male ?? 0}
                  female={gender?.data.female ?? 0}
                  other={gender?.data.other ?? 0}
                />

                <EmployeeTypeCard
                  FullTime={employeeType?.data["full-time"] ?? 0}
                  Contract={employeeType?.data.contract ?? 0}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <DepartmentStatsCard departments={departmentStats} />
              </Box>
            </Box>
          )}
      </Box>
    </Box>
  );
}
