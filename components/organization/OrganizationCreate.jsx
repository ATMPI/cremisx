import * as React from "react";
import PageContainer from "../PageContainer";
import OrganizationForm from "./OrganizationForm";
import { useNavigate } from "react-router";
import {
  validate as validateOrganization,
  createOne as createOrganization,
} from "../../data/organization";
import useNotifications from "../../hooks/useNotifications/useNotifications";

export default function OrganizationCreate() {
  const INITIAL_FORM_VALUES = {
    isMainBranch: false,
  };

  const [formState, setFormState] = React.useState(() => ({
    values: INITIAL_FORM_VALUES,
    errors: {},
  }));

  const notifications = useNotifications();
  const navigate = useNavigate();

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
      const validateField = async (values) => {
        const { issues } = validateOrganization(values);
        setFormErrors({
          ...formErrors,
          [name]: issues?.find((issue) => issue.path?.[0] === name)?.message,
        });
      };

      const newFormValues = { ...formValues, [name]: value };

      validateField(newFormValues);
      setFormValues(newFormValues);
    },
    [setFormErrors, formErrors, formValues, setFormValues]
  );

  const handleFormSubmit = React.useCallback(async () => {
    const { issues } = validateOrganization(formValues);
    console.log("issues", issues);
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
      await createOrganization(formValues);
      notifications.show("Organization Created successfully!", {
        severity: "success",
        autoHideDuration: 3000,
      });

      navigate("/org/list");
    } catch (error) {
      notifications.show("Organization Creation Failed!", {
        severity: "error",
        autoHideDuration: 3000,
      });
      console.error("Error creating organization:", error);
    }
  }, [setFormErrors, formValues, notifications, navigate]);

  return (
    <PageContainer
      title="New Organization"
      breadcrumbs={[
        { title: "Organizations", path: "/org/list" },
        { title: "New Organization" },
      ]}
    >
      <OrganizationForm
        formState={formState}
        onSubmit={handleFormSubmit}
        submitButtonLabel={"Create"}
        onFieldChange={handleFormFieldChange}
      />
    </PageContainer>
  );
}
