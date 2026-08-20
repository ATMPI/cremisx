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

  const setFormValues = () => {};

  const handleFromFieldChange = () => {};
  const handleFormSubmit = () => {
    const { issues } = validateOrganization({ email: "cummi" });
    console.log("issues", issues);
  };
  return (
    <OrganizationForm
      formState={formState}
      onSubmit={handleFormSubmit}
      onFieldChange={handleFromFieldChange}
    />
  );
}

export default function OrganizationEdit() {
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();

  const renderEdit = () => {
    console.log("redered");
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
