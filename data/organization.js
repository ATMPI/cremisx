import api from "../src/api";

export async function getMany({ paginationModel, filterModel, sortModel }) {
  let response;
  try {
    response = await api.post("/organizations/list", {
      paginationModel,
      filterModel,
      sortModel,
    });
    console.log("items", response);
  } catch (error) {
    console.log(error);
  }

  console.log("response", response.data);
  return response.data;
}

export function validate(organization) {
  let issues = [];

  if (!organization.name) {
    issues = [...issues, { message: "Name is required", path: ["name"] }];
  }

  return { issues };
}
