import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../lib/api";

const initialState = {
    assignments: [],
    assignment: {},
    status: 'idle',
    individualStatus: 'idle',
    error: null
}

export const addAssignment = createAsyncThunk('assignment/add', async (initialAssignment) => {
    api.post(`assignment/add`, initialAssignment)
        .then(res => {
            console.log(res.data);
            return res.data;
        }).catch(err => {
        console.log(err);
        return err;
    })
});

export const updateAssignment = createAsyncThunk('assignment/update/', async (updatedAssignment) => {
    api.put(`assignment/update/${updatedAssignment.id}`, updatedAssignment)
        .then(res => {
            console.log(res.data);
            return res.data;
        }).catch(err => {
        console.log(err.response);
        return err.response;
    })
});

export const acceptAssignment = createAsyncThunk('assignment/accept/', async ({id, executor, executionDateTime, executionPrice}) => {
    api.post(`assignment/accept/${id}`, {executor, executionDateTime, executionPrice})
        .then(res => {
            console.log(executor);
            console.log(res.data);
            return res.data;
        }).catch(err => {
        console.log(err.response);
        return err.response;
    })
});

export const deleteAssignment = createAsyncThunk('assignment/delete/', async (id) => {
    api.delete(`assignment/delete/${id}`)
        .then(res => {
            console.log(res.data);
            return res.data;
        }).catch(err => {
        console.log(err.response);
        return err.response;
    })
});

const assignmentSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignments: (state, {payload}) => {
            state.assignments = payload;
        },
        updateAssignment: (state, {payload}) => {
            state.assignment = payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(addAssignment.fulfilled, (state, action) => {
            if (!action.payload?.id) {
                console.log('Assignment could not be added');
            }
        })
            .addCase(updateAssignment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete');
                }
            })
            .addCase(acceptAssignment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Could not accept assignment');
                }
            })
            .addCase(deleteAssignment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete');
                    console.log(action.payload)
                }
            })
    }
})

export const {addAssignments, updateAssignments, acceptAssignments, deleteAssignments} = assignmentSlice.actions;

export default assignmentSlice.reducer;