import React from "react";
import PageContainer from "../PageContainer";
import { Stack } from "@mui/material";
import { getMany as getOrganizations } from "../../data/organization";
import Box from "@mui/material/Box";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrganizationList() {
  const pageTitle = "Organizations";
  const { pathname } = useLocation();
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const INITIAL_PAGE_SIZE = 10;
  const [rowsState, setRowsState] = React.useState({
    rows: [],
    rowCount: 0,
  });

  const [paginationModel, setPaginationModel] = React.useState({
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 0,
    pageSize: searchParams.get("pageSize")
      ? Number(searchParams.get("pageSize"))
      : INITIAL_PAGE_SIZE,
  });
  const [filterModel, setFilterModel] = React.useState(
    searchParams.get("filter")
      ? JSON.parse(searchParams.get("filter") ?? "")
      : { items: [] }
  );

  const [sortModel, setSortModel] = React.useState(
    searchParams.get("sort") ? JSON.parse(searchParams.get("sort") ?? "") : []
  );

  const initialState = React.useMemo(
    () => ({
      pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
    }),
    []
  );

  // const handleRowEdit = React.useCallback();

  const handlePaginationModelChange = React.useCallback(
    (model) => {
      setPaginationModel(model);

      searchParams.set("page", String(model.page));
      searchParams.set("pageSize", String(model.pageSize));

      const newSearchParamString = searchParams.toString();

      navigate(
        `${pathname}${newSearchParamString ? "?" : ""}${newSearchParamString}`
      );
    },
    [navigate, pathname, searchParams]
  );
  const handleFilterModelChange = React.useCallback(
    (model) => {
      console.log("search params");
      console.log("filter model change", model);
      setFilterModel(model);
      try {
        if (
          model.items.length > 0 ||
          (model.quickFilterValues && model.quickFilterValues.length > 0)
        ) {
          searchParams.set("filter", JSON.stringify(model));
        } else {
          searchParams.delete("filter");
        }

        const newSearchParamString = searchParams.toString();

        navigate(
          `${pathname}${newSearchParamString ? "?" : ""}${newSearchParamString}`
        );
      } catch (error) {
        console.log(error);
      }
    },
    [navigate, pathname, searchParams]
  );
  // debugger;

  const handleSortModelChange = React.useCallback(
    (model) => {
      setSortModel(model);

      if (model.length > 0) {
        searchParams.set("sort", JSON.stringify(model));
      } else {
        searchParams.delete("sort");
      }

      const newSearchParamString = searchParams.toString();

      navigate(
        `${pathname}${newSearchParamString ? "?" : ""}${newSearchParamString}`
      );
    },
    [navigate, pathname, searchParams]
  );

  const handleRowEdit = React.useCallback(
    (org) => () => {
      navigate(`/org/${org.recordno}/edit`);
    },
    [navigate]
  );

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(null);

    try {
      const listData = await getOrganizations({
        paginationModel,
        filterModel,
        sortModel,
      });
      setRowsState({
        rows: listData.items,
        rowCount: listData.itemCount,
      });
    } catch (listDataError) {
      console.log(listDataError);
    }
    setIsLoading(false);
  }, [paginationModel, filterModel, sortModel]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const columns = React.useMemo(
    () => [
      { field: "recordno", headerName: "ID" },
      { field: "company_name", headerName: "Company Name", width: 200 },
      { field: "company_id", headerName: "Company ID", width: 140 },
      { field: "contact_person", headerName: "Contact Person", width: 200 },
      {
        field: "actions",
        type: "actions",
        flex: 1,
        align: "right",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="edit-item"
            icon={<EditIcon />}
            label="Edit"
            onClick={handleRowEdit(row)}
          />,
          <GridActionsCellItem
            key="delete-item"
            icon={<DeleteIcon />}
            label="Delete"
            // onClick={handleRowEdit(row)}
          />,
        ],
      },
    ],
    [handleRowEdit]
  );

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
          rowCount={rowsState.rowCount}
          columns={columns}
          paginationMode="server"
          filterMode="server"
          pageSizeOptions={[5, INITIAL_PAGE_SIZE, 20]}
          initialState={initialState}
          paginationModel={paginationModel}
          filterModel={filterModel}
          loading={isLoading}
          disableRowSelectionOnClick
          onPaginationModelChange={handlePaginationModelChange}
          onFilterModelChange={handleFilterModelChange}
          onSortModelChange={handleSortModelChange}
          getRowId={(row) => row.recordno}
          showToolbar
          sx={{
            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
              outline: "transparent",
            },
            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
              {
                outline: "none",
              },
            [`& .${gridClasses.row}:hover`]: {
              cursor: "pointer",
            },
          }}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
            baseIconButton: {
              size: "small",
            },
          }}
        />
      </Box>
    </PageContainer>
  );
}
