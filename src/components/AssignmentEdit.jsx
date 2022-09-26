import React, {useEffect, useState} from 'react';
import {Container, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import api from "../api";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {AssignmentContainer} from "../containers/AssignmentContainer";
import {LoadError} from "./LoadError";


export const AssignmentEdit = () => {
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    let {id} = useParams();
    const currentAssignment = AssignmentContainer(id);

    const [assignment, setAssignment] = useState({title: "", description: "", userId: ""});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getAssignment();
    }, []);

    const getAssignment = async () => {
        api.get(`assignment/${id}`)
            .then(res => {
                setAssignment(res.data);
            })
        setAssignment(assignment);
    };

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

            api.put(`assignment/update/${id}`, assignment)
                .then(res => {
                    console.log("Updated successfully!");
                    navigate("/");
                    console.log(res);
                    console.log(res.data);
                }).catch(err => {
                setError(err);
                console.log(err.response);
            })
        }

    return (
        <div>
            <Navbar/>
            <Container>
                <Grid style={{textAlign: "center"}}>
                    <Typography sx={{pt: 3}} variant="h3" gutterBottom>
                        Edit assignment
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            onChange={onTitleChange}
                            error={submitted && !assignment.title ? true : false}
                            helperText={submitted && !assignment.title ? "Please enter a title" : null}
                            style={{width: "200px", margin: "5px"}}
                            type="text"
                            label="Title"
                            variant="outlined"
                            value={assignment.title}
                        />
                        <br/>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            onChange={onDescriptionChange}
                            error={submitted && !assignment.description ? true : false}
                            helperText={submitted && !assignment.description ? "Please enter a description" : null}
                            style={{width: "200px", margin: "5px"}}
                            type="text"
                            label="Description"
                            variant="outlined"
                            value={assignment.description}
                        />
                        <br/>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            onChange={onUserIdChange}
                            error={submitted && !assignment.userId ? true : false}
                            helperText={submitted && !assignment.userId ? "Please enter a user ID" : null}
                            style={{width: "200px", margin: "5px"}}
                            type="number"
                            label="user ID"
                            variant="outlined"
                            value={assignment.userId}
                        />
                        <br/>
                        <Button type="submit" variant="contained" color="primary">
                            Edit
                        </Button>
                        <br/>
                        <br/>
                        <Button component={Link} to={`/`} type="submit" variant="outlined" color="primary">
                            Return
                        </Button>
                    </form>
                    {error && <LoadError errorMessage="something went wrong. Did you fill in all required fields?" />}
                </Grid>
            </Container>
        </div>
    )
}