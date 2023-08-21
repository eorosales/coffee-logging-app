import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDialRequest, fetchDialsRequest } from "./dialsApi";

const initialState = {
  dials: [],
  dialsStatus: "idle",
};

export const fetchDialsThunk = createAsyncThunk(
  "dials/fetchDials",
  async () => {
    try {
      const response = await fetchDialsRequest();
      return response.dials;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const addDialThunk = createAsyncThunk(
  "dials/addDials",
  async (formData) => {
    try {
      const response = await addDialRequest(formData);
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

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
    deleteAllDialsByCoffeeId: (state, { payload }) => {
      state.dials = state.dials.filter((dial) => dial.coffee !== payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDialsThunk.pending, (state) => {
        state.dialsStatus = "loading";
      })
      .addCase(fetchDialsThunk.fulfilled, (state, { payload }) => {
        state.dialsStatus = "success";
        state.dials = payload;
      })
      .addCase(addDialThunk.fulfilled, (state, { payload }) => {
        state.dials.push(payload);
      });
  },
});

// |===========|
// |  Actions  |
// |===========|

export const { addDial, deleteDial, deleteAllDialsByCoffeeId } =
  dialsSlice.actions;

// |============|
// |  Selector  |
// |============|

export const dialsSelector = (state) => state.dials.dials;
export const dialsStatusSelector = (state) => state.dials.dialsStatus;

// Export reducer
export default dialsSlice.reducer;
