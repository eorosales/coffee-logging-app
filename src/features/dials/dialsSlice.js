import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDialsRequest } from "./dialsApi";

const initialState = {
  dials: [],
  dialsStatus: "idle",
};

export const fetchDials = createAsyncThunk("dials/fetchDials", async () => {
  try {
    const response = await fetchDialsRequest();
    return response.dials;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});

export const dialsSlice = createSlice({
  name: "dials",
  initialState,
  reducers: {
    addDial: (state, { payload }) => {
      state.dials.push(payload);
    },
    deleteDial: (state, { payload }) => {
      state.dials = state.dials.filter((dial) => dial.id !== payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDials.pending, (state) => {
        state.dialsStatus = "loading";
      })
      .addCase(fetchDials.fulfilled, (state, { payload }) => {
        state.dialsStatus = "success";
        state.dials = payload;
      });
  },
});

// |===========|
// |  Actions  |
// |===========|

export const { addDial, deleteDial } = dialsSlice.actions;

// |============|
// |  Selector  |
// |============|

export const dialsSelector = (state) => state.dials.dials;
export const dialsStatusSelector = (state) => state.dials.dialsStatus;

// Export reducer
export default dialsSlice.reducer;
