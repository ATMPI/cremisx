import React from "react";
import PageContainer from "../PageContainer";
import { Stack } from "@mui/material";
import {
  deleteOne as deleteEmployee,
  getMany as getEmployees,
} from '../../data/employees';
import Box from "@mui/material/Box";
import {useLocation, useNavigate, useSearchParams} from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../src/api";

export default function OrganizationList() {
  const pageTitle = "Organizations";
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();
  const [searchParams] = useSearchParams();
  const INITIAL_PAGE_SIZE = 10;
  const [rowsState, setRowsState] = React.useState(
    {
      rows:[],
      rowCount:0
    }
  )
  console.log(searchParams.get("page"))

  const [paginationModel, setPaginationModel] = React.useState({
    page:searchParams.get("page") ? Number(searchParams.get("page")) : 0,
    pageSize: searchParams.get("pageSize") ? Number(searchParams.get("pageSize")) : INITIAL_PAGE_SIZE 
  })

    const initialState = React.useMemo(
      () => ({
        pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
      }),
      []
    );
  
  

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(null);

    try {
      const listData = await getEmployees({paginationModel})
      console.log("listdata", listData);
      setRowsState({
        rows: listData.items,
        rowCount: listData.itemCount,
      });
      console.log("rowsState", rowsState);
    } catch (listDataError) {
      console.log(listDataError)

    }
    setIsLoading(false);

    
  }, [paginationModel]);
  // const loadData = React.useCallback(async () => {
  //   setError(null);
  //   setIsLoading(true);

  //   try {
  //       const response = await api.post("/organizations/list",{paginationModel});
  //       console.log("items", response.data);
  //       setRowsState({
  //         rows: response.data.items,
  //         rowCount: response.data.count,
  //       });

  //       console.log("rowsState", rowsState);
  //   } catch (listDataError) {
  //     console.log(listDataError)

  //   }
  //   setIsLoading(false);

    
  // }, [paginationModel]);
  
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const columns = React.useMemo(
    () => [
       { field: "id", headerName: "ID" },
      { field: "name", headerName: "Name", width: 140 },
      { field: "age", headerName: "Age", type: "number" },
      // { field:"recordno", headerName: "ID"},
      // { field:"company_id", headerName:"Name"},
      // { field:"company_name", headerName:"Age"},
      {field:"joinDate", headerName:"Join Date"},
      {field:"role", headerName:"Role"},
      {field:"isFullTime", headerName:"Full Time"},
      {field:"actions", headerName:"Actions"}
    ]
  )



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
    >

      <Box>
        <DataGrid
          rows={rowsState.rows}
          rowCount={rowsState.rows}
          columns={columns}
          // pagination
          // getRowId={(row) => row.recordno}
          // paginationModel={paginationModel}
          // paginationMode="server"
          pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
          // loading={isLoading}
          initialState={initialState}
        />
      </Box>
    </PageContainer>
  );
}
