import { useDispatch, useSelector } from "react-redux";
import { deleteDial, dialsSelector, baseDial } from "./dialsSlice";
import { deleteDialByIdRequest, toggleFavoriteDialRequest } from "./dialsApi";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Button } from "@mui/material";
import { formatDate } from "../../utils/formatting";
import StarIcon from "@mui/icons-material/Star";

const DialsTable = ({ coffee }) => {
  const dispatch = useDispatch();
  const dials = useSelector(dialsSelector);
  const [selected, setSelected] = useState([]);

  const sortedDials = () => {
    const filteredDials = Object.values(dials).filter(
      (dial) => dial.coffee === coffee
    );
    filteredDials.sort((a, b) => b.createdAt - a.createdAt);
    return filteredDials.map((dial) => ({
      ...dial,
      createdAt: formatDate(dial.createdAt),
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "temp", headerName: "Temperature", flex: 1 },
    { field: "weight", headerName: "Weight (g)", flex: 1 },
    { field: "grind", headerName: "Grind", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
    { field: "yield", headerName: "Yield", flex: 1 },
    { field: "createdAt", headerName: "Created On", flex: 1 },
    {
      field: "favorite",
      headerName: "Favorite",
      flex: 0.5,
      align: "center",
      renderCell: (params) => {
        return params.row.favorite && <StarIcon />;
      },
    },
  ];

  const handleDelete = (dialId) => {
    dialId.forEach((dial) => {
      dispatch(deleteDial(dial));
      deleteDialByIdRequest(dial);
    });
  };

  const handleBaseDial = async (selectedDialId) => {
    const selectedDial = dials.find((dial) => dial.id === selectedDialId);

    const toggleBaseDial = await toggleFavoriteDialRequest(
      selectedDial.id,
      selectedDial.favorite
    );
    dispatch(baseDial(toggleBaseDial));
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={sortedDials()}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(ids) => {
            setSelected(ids);
          }}
        />
      </div>
      <Button
        disabled={selected.length === 0}
        onClick={() => handleDelete(selected)}>
        Delete
      </Button>
      <Button
        disabled={selected.length > 1 || selected.length === 0}
        onClick={() => handleBaseDial(selected[0])}>
        {selected.length !== 0 &&
        dials.find((dial) => dial.id === selected[0] && dial.favorite !== true)
          ? "Favorite"
          : "Undo Favorite"}
      </Button>
    </>
  );
};

export default DialsTable;
