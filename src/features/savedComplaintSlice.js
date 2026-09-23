import { createSlice } from "@reduxjs/toolkit";

const savedComplaintSlice = createSlice({
  name: "savedComplaints",

  initialState: [],

  reducers: {

    addComplaint: (state, action) => {

      const exists = state.find(
        complaint =>
          complaint.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
      }
    },

    removeComplaint: (state, action) => {

      return state.filter(
        complaint =>
          complaint.id !== action.payload
      );
    },

    clearSaved: () => []
  }
});

export const {
  addComplaint,
  removeComplaint,
  clearSaved
} = savedComplaintSlice.actions;

export default savedComplaintSlice.reducer;