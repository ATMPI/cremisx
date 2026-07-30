import React from "react";
import PageContainer from "../PageContainer";
import { Stack } from "@mui/material";

export default function OrganizationList() {
  const pageTitle = "Organizations";
  return (
    <PageContainer
      title="Organization List"
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center" }}
        ></Stack>
      }
    ></PageContainer>
  );
}
