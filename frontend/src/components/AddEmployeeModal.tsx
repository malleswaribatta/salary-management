import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { CreateEmployeePayload, Lookup } from "../types/employee";
import { getCountries, getEmployeeTypes } from "../api/lookupApi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Dayjs } from "dayjs";



type Props = {
  onClose: () => void;
  onCreate: (data: CreateEmployeePayload) => void;
};

export function AddEmployeeModal({ onClose, onCreate }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    role: "",
    department: "",
    countryId: "",
    employeeTypeId: "",
    salary: "",
    joiningDate: "",
  });

  const [employeeTypes, setEmployeeTypes] = useState<Lookup[]>([]);
  const [countries, setCountries] = useState<Lookup[]>([]);
  const [joiningDate, setJoiningDate] = useState<Dayjs | null>(null);
  const [_profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    setProfileImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function loadLookups() {
      const countriesData = await getCountries();
      const employeeTypesData = await getEmployeeTypes();

      setCountries(countriesData.data);
      setEmployeeTypes(employeeTypesData.data);
    }

    loadLookups();
  }, []);

  const handleSave = () => {
    if (!joiningDate) {
      alert("Joining date is required");
      return;
    }

    onCreate({
      ...formData,
      countryId: Number(formData.countryId),
      employeeTypeId: Number(formData.employeeTypeId),
      salary: Number(formData.salary),
      joiningDate: joiningDate.toISOString().split("T")[0],
      profileImage: _profileImage,
    });

    onClose();
  };

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
              fontWeight: 400,
              color: "#101010",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            New Employee
          </Typography>

          <IconButton onClick={onClose}>{/* <CloseIcon /> */}</IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* Toolbar */}
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Box
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: previewUrl ? "transparent" : "#1976d2",
                  border: previewUrl ? "2px solid #1976d2" : "none",
                }}
              >
                {previewUrl ? (
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Profile preview"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Typography sx={{ color: "white", fontSize: 20 }}>+</Typography>
                )}
              </Box>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />

              <Typography variant="h6">Create Employee</Typography>
            </Stack>
          </Stack>

          {/* PERSONAL */}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#078dda",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            PERSONAL
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>

                <MenuItem value="Female">Female</MenuItem>

                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Joining Date"
                    value={joiningDate}
                    onChange={(newValue) => {
                      console.log("DatePicker onChange:", newValue);
                      setJoiningDate(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          {/* ROLE & EMPLOYMENT */}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#078dda",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            ROLE & EMPLOYMENT
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Country"
                name="countryId"
                value={formData.countryId}
                onChange={handleChange}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Employee Type"
                name="employeeTypeId"
                value={formData.employeeTypeId}
                onChange={handleChange}
              >
                {employeeTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* COMPENSATION */}
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#078dda",
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            COMPENSATION
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "black",
            borderColor: "black",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
          }}
          onClick={handleSave}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
