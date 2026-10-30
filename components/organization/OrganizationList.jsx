import React from "react";
import PageContainer from "../PageContainer";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import {
  getMany as getOrganizations,
  deleteOne as deleteOrganization,
} from "../../data/organization";
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
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import { useDialogs } from "../../hooks/useDialogs/useDialogs";
import useNotifications from "../../hooks/useNotifications/useNotifications";

export default function OrganizationList() {
  const pageTitle = "Organizations";
  const { pathname } = useLocation();
  const [error, setError] = React.useState();
  const [isLoading, setIsLoading] = React.useState();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const dialog = useDialogs();
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

  const handleRowClick = React.useCallback(
    ({ row }) => {
      navigate(`/org/${row.recordno}/view`);
    },
    [navigate]
  );

  const loadData = React.useCallback(async () => {
    setError(null);
    setIsLoading(true);

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

  const handleRowDelete = React.useCallback(
    (organization) => async () => {
      const confirmed = await dialog.confirm(
        `Do you wish to delete ${organization.company_name}?`,
        {
          title: `Delete Organization?`,
          severity: "warning",
          okText: "Yes, Delete it",
          cancelText: "No, Cancel",
        }
      );
      console.log("organization", organization);
      if (confirmed) {
        setIsLoading(true);
        try {
          await deleteOrganization(Number(organization.recordno));

          notifications.show("Organization deleted successfully.", {
            severity: "success",
            autoHideDuration: 3000,
          });
          loadData();
        } catch (deleteError) {
          notifications.show(
            `Failed to delete Organization. Reason: ${deleteError}`,
            {
              severity: "error",
              autoHideDuration: 3000,
            }
          );
        }
      }
    },
    [dialog, notifications, loadData]
  );

  const handleRowEdit = React.useCallback(
    (org) => () => {
      navigate(`/org/${org.recordno}/edit`);
    },
    [navigate]
  );

  React.useEffect(() => {
    loadData();
  }, [loadData]);
  const handleRefresh = React.useCallback(() => {
    if (!isLoading) {
      loadData();
    }
  }, [isLoading, loadData]);
  const handleCreateClick = React.useCallback(() => {
    navigate("/org/new");
  }, [navigate]);

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
            onClick={handleRowDelete(row)}
          />,
        ],
      },
    ],
    [handleRowEdit, handleRowDelete]
  );

  return (
    <PageContainer
      title="Organization List"
      breadcrumbs={[{ title: pageTitle }]}
      actions={
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleCreateClick}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Stack>
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
          onRowClick={handleRowClick}
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
