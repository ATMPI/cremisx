import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Stack,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

export default function OrganizationForm({
  formState,
  onSubmit,
  onFieldChange,
  onReset,
  submitButtonLabel,
  backButtonPath,
}) {
  const handleFieldTextChange = React.useCallback(
    (event) => {
      onFieldChange(event.target.name, event.target.value);
    },
    [onFieldChange]
  );
  const formValues = formState.values;
  const formErrors = formState.errors;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // const handleFieldNumberChange = React.useCallback(
  //   (e) => {
  //     onFieldChange(e.target.name, Number(e.target.value));
  //   },
  //   [onFieldChange]
  // );

  const handleCheckboxFieldChange = React.useCallback(
    (e, checked) => {
      onFieldChange(e.target.name, checked);
    },
    [onFieldChange]
  );

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(formValues);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, formValues]
  );

  const handleReset = React.useCallback(() => {
    if (onReset) {
      onReset(formValues);
    }
  }, [formValues, onReset]);

  const handleBack = React.useCallback(() => {
    navigate(backButtonPath ?? "/organization");
  }, [navigate, backButtonPath]);

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      noValidate
      autoComplete="off"
      onReset={handleReset}
      sx={{ width: "100%" }}
    >
      <FormGroup>
        <Grid container spacing={2} sx={{ mb: 2, width: "100%" }}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.name ?? ""}
              name="name"
              label="Name"
              fullWidth
              onChange={handleFieldTextChange}
              error={!!formErrors.name}
              helperText={formErrors.name ?? " "}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.emailaddress ?? ""}
              type="email"
              name="emailaddress"
              label="Email Address"
              fullWidth
              onChange={handleFieldTextChange}
              error={!!formErrors.emailaddress}
              helperText={formErrors.emailaddress ?? " "}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.address ?? ""}
              name="address"
              label="Address"
              onChange={handleFieldTextChange}
              fullWidth
              error={!!formErrors.address}
              helperText={formErrors.address ?? " "}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.contact ?? ""}
              name="contact"
              label="Contact Number"
              onChange={handleFieldTextChange}
              fullWidth
              error={!!formErrors.contact}
              helperText={formErrors.contact ?? " "}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <TextField
              value={formValues.contactperson ?? ""}
              name="contactperson"
              label="Contact Person"
              onChange={handleFieldTextChange}
              fullWidth
              error={!!formErrors.person}
              helperText={formErrors.person ?? " "}
            />
          </Grid>
          <Grid>
            <FormControl>
              <FormControlLabel
                name="isMainBranch"
                label="Main Branch"
                control={
                  <Checkbox
                    size="large"
                    checked={formValues.isMainBranch ?? false}
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
        <Button
          variant="contained"
          onClick={handleBack}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Button
          variant="contained"
          type="submit"
          size="large"
          loading={isSubmitting}
        >
          {submitButtonLabel}
        </Button>
      </Stack>
    </Box>
  );
}
