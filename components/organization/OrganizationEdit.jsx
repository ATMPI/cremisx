import React from "react";
import PropTypes from "prop-types";
import PageContainer from "../PageContainer";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import OrganizationForm from "./OrganizationForm";
import { validate as validateOrganization } from "../../data/organization";
import useNotifications from "../../hooks/useNotifications/useNotifications";
import {
  getOne as getOrganization,
  updateOne as updateOrganization,
} from "../../data/organization";
function OrganizationEditForm({ initialValues, onSubmit }) {
  const { orgId } = useParams();
  const notifications = useNotifications();
  const [formState, setFormState] = React.useState({
    values: initialValues,
    errors: {},
  });
  const formValues = formState.values;
  const formErrors = formState.errors;

  const setFormValues = React.useCallback((newFormValues) => {
    setFormState((prevState) => ({
      ...prevState,
      values: newFormValues,
    }));
  }, []);

  const setFormErrors = React.useCallback((newFormErrors) => {
    setFormState((prevState) => ({
      ...prevState,
      errors: newFormErrors,
    }));
  }, []);

  const handleFormFieldChange = React.useCallback(
    (name, value) => {
      const validateField = (values) => {
        const { issues } = validateOrganization(values);
        console.log("issues", issues);
        setFormErrors({
          ...formErrors,
          [name]: issues?.find((issue) => issue.path?.[0] === name)?.message, //issue.message
        });
      };
      const newFormValues = { ...formValues, [name]: value };
      setFormValues(newFormValues);
      validateField(newFormValues);
    },
    [formValues, setFormValues, setFormErrors, formErrors]
  );
  const handleFormReset = React.useCallback(() => {
    setFormValues(initialValues);
  }, [initialValues, setFormValues]);

  const handleFormSubmit = React.useCallback(
    async (formValues) => {
      const { issues } = validateOrganization(formValues);

      if (issues && issues.length > 0) {
        setFormErrors(
          Object.fromEntries(
            issues.map((issue) => [issue.path?.[0], issue.message])
          )
        );

        return;
      }
      setFormErrors({});
      try {
        await onSubmit(formValues);
      } catch (error) {
        notifications.show(`Error Updating! ${error.message}`, {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    },
    [setFormErrors, onSubmit, notifications]
  );
  return (
    <OrganizationForm
      formState={formState}
      onSubmit={handleFormSubmit}
      onFieldChange={handleFormFieldChange}
      onReset={handleFormReset}
      backButtonPath={`/org/list`}
      submitButtonLabel="Save"
    />
  );
}

OrganizationEditForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    emailaddress: PropTypes.string,
    address: PropTypes.string,
    contact: PropTypes.string,
    contactperson: PropTypes.string,
    isMainBranch: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default function OrganizationEdit() {
  const notifications = useNotifications();
  const [error, setError] = React.useState();
  const [organization, setOrganization] = React.useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState();
  const { orgId } = useParams();

  const handleSubmit = React.useCallback(
    async (formValues) => {
      try {
        const updatedData = await updateOrganization(orgId, formValues);
        console.log("updatedData", updatedData);

        notifications.show("Organization edited successfully.", {
          severity: "success",
          autoHideDuration: 3000,
        });
        console.log("data", updatedData);
        setOrganization(updatedData);
        navigate("/org/list");
      } catch (response) {
        setError(response);
        notifications.show(`Error Updating! ${error}`, {
          severity: "error",
          autoHideDuration: 3000,
        });
      }
    },
    [orgId, notifications, setOrganization, navigate, setError, error]
  );

  const renderEdit = React.useMemo(() => {
    if (isLoading) {
      return (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            m: 1,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      );
    }
    return organization ? (
      <OrganizationEditForm
        initialValues={organization}
        onSubmit={handleSubmit}
      />
    ) : null;
  }, [error, handleSubmit, isLoading, organization]);

  const loadData = React.useCallback(async () => {
    try {
      const data = await getOrganization(orgId);
      console.log("showData", data);
      setOrganization({
        name: data.company_name,
        id: data.recordno,
        company_id: data.company_id,
        contact: data.telephone1,
        emailaddress: data.emailaddress,
        address: data.address,
        contactperson: data.contact_person,
        isMainBranch: false,
      });
    } catch (showDataError) {
      setError(showDataError);
    }
  }, [orgId]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);
  React.useEffect(() => {
    if (organization) {
      console.log("Organization loaded:", organization);
      console.log("Name:", organization.name);
      console.log("address:", organization.address);
      console.log("Company ID:", organization.company_id);
    }
  }, [organization]);

  return (
    <PageContainer title={`Edit Organization `}>
      <Box sx={{ display: "flex", flex: 1 }}>{renderEdit}</Box>
    </PageContainer>
  );
}
