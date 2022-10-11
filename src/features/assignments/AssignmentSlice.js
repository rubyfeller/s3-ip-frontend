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
        console.log(err.response);
        return err.response;
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
            state.assignments.push(action.payload);
        })
            .addCase(updateAssignment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                }
            })
            .addCase(deleteAssignment.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                }
            })
    }
})

export const {addAssignments, updateAssignments, deleteAssignments} = assignmentSlice.actions;

export default assignmentSlice.reducer;