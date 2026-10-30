import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PageContainer from "../PageContainer";
import React from "react";
import { useNavigate, useParams } from "react-router";
import {
  getOne as getOrganization,
  deleteOne as deleteOrganization,
} from "../../data/organization";
import { useDialogs } from "../../hooks/useDialogs/useDialogs";
import useNotifications from "../../hooks/useNotifications/useNotifications";

export default function OrganizationShow() {
  const { orgId } = useParams();
  const pageTitle = `Organization ${orgId}`;
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();
  const [organization, setOrganization] = React.useState(null);
  const navigate = useNavigate();
  const dialogs = useDialogs();
  const notifications = useNotifications();

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const showData = await getOrganization(Number(orgId));
      console.log("showData", showData);
      setOrganization(showData);
    } catch (e) {
      setError(e);
    }
  }, [orgId]);

  const handleEdit = React.useCallback(() => {
    navigate(`/org/${orgId}/edit`);
  }, [orgId, navigate]);
  const handleBack = React.useCallback(() => {
    navigate(`/org/${orgId}/edit`);
  }, [orgId, navigate]);
  const handleDelete = React.useCallback(async () => {
    const confirmed = await dialogs.confirm(
      `Do you wish to delete ${organization.company_name}`,
      {
        severity: "error",
        title: "Delete Organization",
        okText: "Delete",
        cancelText: "Cancel",
      }
    );
    if (confirmed) {
      setIsLoading(true);
      try {
        await deleteOrganization(orgId);
        notifications.show("Organization deleted successfully.", {
          severity: "success",
          autoHideDuration: 3000,
        });
        navigate("/org/list");
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  }, [setIsLoading, orgId, organization, dialogs, navigate, notifications]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const renderShow = React.useMemo(() => {
    return organization ? (
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Name</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {organization.company_name}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Email Address</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {organization.emailaddress}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Address</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {organization.address}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Contact Number</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {organization.telephone1}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Contact Person</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {organization.contact_person}
              </Typography>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper sx={{ px: 2, py: 1 }}>
              <Typography variant="overline">Main Branch</Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {organization.emailaddress}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between" }}
          spacing={2}
        >
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    ) : null;
  }, [organization, handleBack, handleEdit, handleDelete]);
  return (
    <PageContainer
      title={pageTitle}
      breadcrumbs={[
        { title: "Organizations", path: "/org/list" },
        { title: pageTitle },
      ]}
    >
      <Box sx={{ display: "flex", flex: 1, width: "100%" }}>{renderShow}</Box>
    </PageContainer>
  );
}
