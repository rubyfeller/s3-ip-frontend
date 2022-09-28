import React, {useState} from 'react';
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import api from "../lib/api";
import Navbar from "../layouts/Navbar";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";


export const AssignmentAdd = () => {
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState({title: "", description: "", userId: null});
    const [submitted, setSubmitted] = useState(null);
    const [error, setError] = useState(null);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        if (assignment.title && assignment.description && assignment.userId != null) {
            api.post(`assignment/add`, assignment)
                .then(res => {
                    navigate("/");
                    console.log(res);
                    console.log(res.data);
                }).catch(err => {
                setError(err);
                console.log(err.response);
            })
        }
    }

    return (
        <div>
            <Navbar/>
                <Grid style={{textAlign: "center"}}>
                    <Typography sx={{pt: 3}} variant="h3" gutterBottom>
                        Add assignment
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            onChange={onTitleChange}
                            error={!!(submitted && !assignment.title)}
                            helperText={submitted && !assignment.title ? "Please enter a title" : null}
                            style={{width: "200px", margin: "5px"}}
                            type="text"
                            label="Title"
                            variant="outlined"
                        />
                        <TextField
                            onChange={onDescriptionChange}
                            error={!!(submitted && !assignment.description)}
                            helperText={submitted && !assignment.description ? "Please enter a description" : null}
                            style={{width: "200px", margin: "5px"}}
                            type="text"
                            label="Description"
                            variant="outlined"
                        />
                        <TextField
                            onChange={onUserIdChange}
                            error={!!(submitted && !assignment.userId)}
                            helperText={submitted && !assignment.userId ? "Please enter a user ID" : null}
                            style={{width: "200px", margin: "5px"}}
                            type="number"
                            label="userId"
                            variant="outlined"
                        />
                        <br />
                        <br />
                        <Button type="submit" variant="contained" color="primary">
                            Add
                        </Button>
                        <br />
                        <br />
                        <Button component={Link} to={`/`} type="submit" variant="outlined" color="primary">
                            Return
                        </Button>
                    </form>
                    {error && <p>{error.message}</p>}
                </Grid>
        </div>
    )
}