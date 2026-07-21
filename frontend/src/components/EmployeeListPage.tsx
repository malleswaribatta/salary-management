import { useState } from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import type { Employee } from "../types/employee";
import { getProfileImageUrl } from "../api/employeeApi";
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
  setSearchText,
  setSearchInput,
  onSearch,
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedEmployees = employees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <div className="employee-list-container">
      <div className="employee-list-header">
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
              onChange={(e) => {
                setSearchInput(e.target.value);
                setSearchText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
                return;
              }}
            />

            <Button
              variant="contained"
              onClick={() => setIsAddModalOpen(true)}
            >
              + New Employee
            </Button>
          </Stack>
        </Stack>
      </div>

      <div className="employee-table-wrapper">
        <TableContainer sx={{ height: "100%" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
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
              {paginatedEmployees.map((emp) => {
                const imageUrl = getProfileImageUrl(emp.profileImageKey);
                return (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <Avatar
                        src={imageUrl ?? undefined}
                        sx={{ width: 36, height: 36, bgcolor: "#1976d2" }}
                      >
                        {emp.name.charAt(0).toUpperCase()}
                      </Avatar>
                    </TableCell>
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
                            setOpenMenuId(
                              openMenuId === emp.id ? null : emp.id,
                            )}
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
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <TablePagination
        className="employee-pagination"
        component="div"
        count={employees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
}
