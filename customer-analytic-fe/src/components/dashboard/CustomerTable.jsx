// CustomerTable component to display customer data in a table format
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material";
import { ButtonGroup, Button } from "@mui/material";
import Loading from "@/app/loading";

const CustomerTable = ({ data, isLoading, onPageChange }) => {
  //Table theme and styles states
  const theme = useTheme();
  const dataGridTheme = createTheme({
    palette: {
      mode: theme.palette.mode,
      DataGrid: {
        bg: "#E5D9F2",
        border: "1px solid #d9d9d9",
      },
    },
  });

  //Columns definition for the DataGrid
  const columns = [
    { field: "Number", headerName: "ID", width: 70 },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Age", headerName: "Age", width: 90 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "Email", headerName: "Email", width: 250 },
    { field: "Brand Device", headerName: "Brand", width: 130 },
    { field: "Digital Interest", headerName: "Interest", width: 150 },
    { field: "Location Type", headerName: "Location Type", width: 150 },
    {
      field: "Date",
      headerName: "Date",
      width: 120,
      valueFormatter: (params) => params.value,
    },
  ];

  //Data validation function
  const validateData = () => {
    if (!data) {
      console.log("Data is null/undefined");
      return false;
    }
    if (!data.customers) {
      console.log("data.customers is missing");
      return false;
    }
    if (!Array.isArray(data.customers)) {
      console.log("data.customers is not an array");
      return false;
    }
    if (typeof data.totalItems !== "number") {
      console.log("totalItems is not a number");
      return false;
    }
    if (typeof data.currentPage !== "number") {
      console.log("currentPage is not a number");
      return false;
    }
    if (typeof data.totalPages !== "number") {
      console.log("totalPages is not a number");
      return false;
    }
    return true;
  };

  if (isLoading || !validateData()) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loading size={48} />
      </div>
    );
  }

  const pageSize = 20;

  return (
    <article className="space-y-4 ">
      {/* Table data */}
      <div style={{ height: 500, width: "100%" }}>
        <ThemeProvider theme={dataGridTheme}>
          <DataGrid
            rows={data.customers}
            getRowId={(row) => row._id || row.number}
            columns={columns}
            loading={isLoading}
            pagination
            paginationMode="server"
            rowCount={data.totalItems}
            pageSizeOptions={[pageSize]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize,
                  page: data.currentPage - 1,
                },
              },
            }}
            paginationModel={{
              page: data.currentPage - 1,
              pageSize,
            }}
            onPaginationModelChange={(model) => {
              onPageChange(model.page + 1);
            }}
            disableRowSelectionOnClick
          />
        </ThemeProvider>
      </div>

      {/* Pagination Controls */}
      <nav className="flex justify-center mt-4 ">
        <ButtonGroup variant="outlined" aria-label="Pagination">
          <Button
            disabled={data.currentPage === 1}
            onClick={() => onPageChange(data.currentPage - 1)}
          >
            Previous
          </Button>
          <Button disabled>
            Page {data.currentPage} of {data.totalPages}
          </Button>
          <Button
            disabled={data.currentPage === data.totalPages}
            onClick={() => onPageChange(data.currentPage + 1)}
          >
            Next
          </Button>
        </ButtonGroup>
      </nav>
    </article>
  );
};

export default CustomerTable;
