import type { Employee } from "../types/employee";
import { getProfileImageUrl } from "../api/employeeApi";
import "./ViewEmployeeModal.css";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  employee: Employee;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function ViewEmployeeModal({
  employee,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 530,
              color: "#090909",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {employee.name}
          </Typography>

          <IconButton onClick={onClose}></IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* PROFILE */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Stack spacing={3}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={getProfileImageUrl(employee.profileImageKey) ?? undefined}
                  sx={{
                    width: 64,
                    height: 64,
                    fontSize: 28,
                    bgcolor: "#1976d2",
                  }}
                >
                  {employee.name.charAt(0).toUpperCase()}
                </Avatar>

                <Box>
                  <Typography variant="h6">{employee.name}</Typography>

                  <Typography color="text.secondary">
                    {employee.email}
                  </Typography>
                </Box>
              </Stack>

              {/* Role Chips */}
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                <Chip label={employee.role.name} color="primary" />

                <Chip label={employee.department.name} color="secondary" />

                <Chip label={employee.employeeType.name} variant="outlined" />
              </Stack>

              {/* Actions */}
              {
                /* <Stack
              direction="row"
              spacing={2}
            >
              <Button
                variant="contained"
                onClick={onEdit}
              >
                Edit
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={onDelete}
              >
                Delete
              </Button>
            </Stack> */
              }
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button variant="contained" onClick={onEdit}>
                  Edit
                </Button>

                <Button variant="outlined" color="error" onClick={onDelete}>
                  Delete
                </Button>
              </Box>
            </Stack>
          </Paper>

          {/* PERSONAL INFO */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 500,
                color: "#078dda",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Personal Information
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Gender
                </Typography>

                <Typography>{employee.gender ?? "N/A"}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Joining Date
                </Typography>

                <Typography>{employee.joiningDate ?? "N/A"}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* ROLE & EMPLOYMENT */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 500,
                color: "#078dda",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Role & Employment
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Country
                </Typography>

                <Typography>{employee.country.name}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Employment Type
                </Typography>

                <Typography>{employee.employeeType.name}</Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* COMPENSATION */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 500,
                color: "#078dda",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Compensation
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body2" color="text.secondary">
              Salary
            </Typography>

            <Typography variant="h6">₹{employee.salary}</Typography>
          </Paper>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
