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

export async function getOne(id) {
  let response;
  try {
    response = await api.get(`/organizations/view/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function validate(organization) {
  let issues = [];

  if (!organization.name) {
    issues = [...issues, { message: "Name is required", path: ["name"] }];
  }

  if (!organization.contact) {
    issues = [
      ...issues,
      { message: "Contact Number is required", path: ["contact"] },
    ];
  } else if (isNaN(organization.contact)) {
    issues = [
      ...issues,
      {
        message: "Contact must be a number",
        path: ["contact"],
      },
    ];
  }

  if (!organization.emailaddress) {
    issues = [
      ...issues,
      { message: "Email is required", path: ["emailaddress"] },
    ];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organization.emailaddress)) {
    issues = [
      ...issues,
      {
        message: "Must be a valid email address",
        path: ["emailaddress"],
      },
    ];
  }
  return { issues };
}

export async function updateOne(id, organization) {
  try {
    const result = await api.put(`/organizations/update/${id}`, organization);
    console.log("result from organization.js", result);
    return result.data;
  } catch (error) {
    console.log("response", error);
    throw error;
  }
}

export async function createOne(organization) {
  try {
    const result = await api.post("/organizations/create", organization);
    console.log("result from organization.js", result);
    return result.data;
  } catch (error) {
    console.log("response", error);
    throw error;
  }
}

export async function deleteOne(id) {
  try {
    const result = await api.delete(`/organizations/delete/${id}`);
    return result.data;
  } catch (error) {
    console.log("response", error);
    throw error;
  }
}
