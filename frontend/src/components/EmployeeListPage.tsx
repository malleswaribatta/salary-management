import {
  Button,
  ButtonGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import type { Employee } from "../types/employee";
import "./EmployeeListPage.css";

type Props = {
  employees: Employee[];
  searchText: string;
  openMenuId: number | null;
  menuRef: React.RefObject<HTMLDivElement | null>;
  setOpenMenuId: (id: number | null) => void;
  setViewEmployee: (employee: Employee) => void;
  setSelectedEmployee: (employee: Employee) => void;
  handleDeleteClick: (employee: Employee) => void;
  setIsAddModalOpen: (value: boolean) => void;
  setSearchText: (value: string) => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
};

export function EmployeeList({
  employees,
  searchText,
  openMenuId,
  menuRef,
  setOpenMenuId,
  setViewEmployee,
  setSelectedEmployee,
  handleDeleteClick,
  setIsAddModalOpen,
  setSearchInput,
  onSearch,
}: Props) {
  return (
    <div className="container">
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Employees</Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="Search by name, email, role, department"
            value={searchText}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
              return;
            }}
          />

          <Button variant="contained" onClick={() => setIsAddModalOpen(true)}>
            + New Employee
          </Button>
        </Stack>
      </Stack>

      {/* <table className="employee-table"> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.role.name}</TableCell>
              <TableCell>{emp.department.name}</TableCell>
              <TableCell>{emp.country.name}</TableCell>
              <TableCell>{emp.employeeType.name}</TableCell>
              <TableCell>{emp.salary}</TableCell>

              <TableCell>
                <div
                  style={{ position: "relative" }}
                  ref={openMenuId === emp.id ? menuRef : null}
                >
                  <Button
                    onClick={() =>
                      setOpenMenuId(openMenuId === emp.id ? null : emp.id)}
                  >
                    ⋮
                  </Button>

                  {openMenuId === emp.id && (
                    <div className="actions-menu">
                      <ButtonGroup
                        orientation="vertical"
                        aria-label="Vertical button group"
                        variant="text"
                      >
                        <Button onClick={() => setViewEmployee(emp)}>
                          View
                        </Button>

                        <Button onClick={() => setSelectedEmployee(emp)}>
                          Edit
                        </Button>

                        <Button
                          onClick={() => handleDeleteClick(emp)}
                          color="error"
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </div>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
