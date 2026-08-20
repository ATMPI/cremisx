import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function OrganizationForm({
  formState,
  onSubmit,
  onFieldChange,
}) {
  const handleCheckboxFieldChange = React.useCallback((event, checked) => {
    console.log(event);
  });

  const handleFieldTextChange = (e) => {
    console.log("name", e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const name = formData.get("name");
    console.log(name);
    try {
      await onSubmit({ name: null });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              onChange={handleFieldTextChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              type="email"
              name="emailaddress"
              label="Email Address"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField name="address" label="Address" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField name="contact" label="Contact Number" fullWidth />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField name="contactperson" label="Contact Person" fullWidth />
          </Grid>
          <Grid>
            <FormControl>
              <FormControlLabel
                name="isFullTime"
                label="Main Branch"
                control={
                  <Checkbox
                    size="large"
                    checked={false}
                    onChange={handleCheckboxFieldChange}
                  />
                }
              >
                <FormHelperText></FormHelperText>
              </FormControlLabel>
            </FormControl>
          </Grid>
        </Grid>
      </FormGroup>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between" }}
        spacing={2}
      >
        <Button variant="contained" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
        <Button variant="contained" type="submit" size="large">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
