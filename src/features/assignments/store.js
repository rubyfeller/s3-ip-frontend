import {configureStore} from "@reduxjs/toolkit";
import assignmentReducer from "./AssignmentSlice";

export const store = configureStore({
    reducer: {
        assignments: assignmentReducer
    },
});