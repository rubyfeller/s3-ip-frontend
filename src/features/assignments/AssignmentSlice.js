import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../lib/api";

const initialState = {
    assignments: [],
    assignment: {},
    status: 'idle',
    individualStatus: 'idle',
    error: null
}

export const addAssignment = createAsyncThunk('assignment/add', async (initialAssignment) =>
    api.post(`assignment/add`, initialAssignment)
        .then(res => {
            console.log(res.data);
            return res.data;
        }).catch(err => {
        console.log(err.response);
        return err.response;
    })
)

export const updateAssignment = createAsyncThunk('assignment/update/${id}', async (updatedAssignment, id) =>
    api.put(`assignment/update/${id}`, updatedAssignment)
        .then(res => {
            console.log(res.data);
        }).catch(err => {
        console.log(err.response);
    })
)

const assignmentSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignments: (state, {payload}) => {
            state.assignments = payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(addAssignment.fulfilled, (state, action) => {
            state.assignments.push(action.payload);
        })
    }
});

export const {addAssignments} = assignmentSlice.actions;
export const getAllAssignments = (state) => state.assignments.assignments;
export const getAssignmentsStatus = (state) => state.assignments.status;
export const getAssignmentsError = (state) => state.assignments.error;

export default assignmentSlice.reducer;