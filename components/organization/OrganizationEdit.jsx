import React from "react";
import PageContainer from "../PageContainer";
import { Box } from "@mui/material";
import { Navigate, useParams } from "react-router";
import api from "../../src/api";
import OrganizationForm from "./OrganizationForm";
import { validate as validateOrganization } from "../../data/organization";

function OrganizationEditForm() {
  const { orgId } = useParams();
  const [formState, setFormState] = React.useState({});
  const formValues = formState.value;

  const setFormValues = React.useCallback((newFormValues) => {
    setFormState((prevState) => ({
      ...prevState,
      values: newFormValues,
    }));
    console.log("formValues", formValues);
  }, []);

  const handleFormFieldChange = React.useCallback(
    (name, value) => {
      const newFormValues = { ...formValues, [name]: value };
      setFormValues(newFormValues);
    },
    [formValues, setFormValues]
  );
  const handleFormSubmit = () => {
    const { issues } = validateOrganization({ email: "cummi" });
  };
  return (
    <OrganizationForm
      formState={formState}
      onSubmit={handleFormSubmit}
      onFieldChange={handleFormFieldChange}
    />
  );
}

export default function OrganizationEdit() {
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  const renderEdit = () => {
    return <OrganizationEditForm />;
  };

  //   const loadData = React.useCallBack(
  //     async () =>{
  //         setError(null);
  //         setIsLoading(true);

  //         try {
  //             const showData = await api.get("/organization/show")
  //         } catch (error) {

  //         }

  //     }
  //   )

  return (
    <PageContainer title={`Edit Organization `}>
      <Box sx={{ display: "flex", flex: 1 }}>{renderEdit()}</Box>
    </PageContainer>
  );
}
