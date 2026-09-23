import { configureStore } from "@reduxjs/toolkit";
import savedComplaintReducer
  from "../features/savedComplaintSlice";

export const store = configureStore({
  reducer: {
    savedComplaints: savedComplaintReducer
  }
});