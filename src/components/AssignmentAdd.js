import React, {useState} from 'react';
import {Grid, Input} from "@mui/material";
import Button from "@mui/material/Button";
import api from "../api";
import Navbar from "./Navbar";

export const AssignmentAdd = () => {

    const [assignment, setAssignment] = useState(null);

    const onTitleChange = (event) => {
        setAssignment((prevState) => ({
            ...prevState,
            title: event.target.value,
        }));
    }

    const onDescriptionChange = (event) => {
        setAssignment((prevState) => ({
            ...prevState,
            description: event.target.value,
        }));
    }

    const onUserIdChange = (event) => {
        setAssignment((prevState) => ({
            ...prevState,
            userId: event.target.value,
        }));
    }

    const handleSubmit = event => {
        event.preventDefault();
        api.post(`assignment/add`, assignment)
            .then(res => {
                console.log(res);
                console.log(res.data)
            });
    }

    return (
        <div>
            <Navbar/>
            <Grid
                container
                spacing={0}
                direction="column"
                sx={{pl: 1}}
                style={{minHeight: '100vh'}}
            >
                <form onSubmit={handleSubmit}>
                    <Input placeholder="Title" type="text" title="title" onChange={onTitleChange}/>
                    <Input placeholder="Description" type="text" description="description"
                           onChange={onDescriptionChange}/>
                    <Input placeholder="userId" type="number" title="userId" onChange={onUserIdChange}/>
                    <Button variant="contained" type="submit">Add</Button>

                </form>
            </Grid>
        </div>
    )
}