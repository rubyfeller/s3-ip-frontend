import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Navbar} from "../layouts/Navbar";
import {Container, Grid} from "@mui/material";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {LoadError} from "./LoadError";
import {deleteAssignment} from "../features/assignments/AssignmentSlice";
import {useDispatch} from "react-redux";
import {useApi} from "../hooks/use-api";

export const AssignmentDelete = () => {
    const id = useParams();
    const navigate = useNavigate();

    const [assignment, setAssignment] = useState([]);

    // const {data, loading, error} = useAxiosFetch({
    //     method: "GET",
    //     url: `/assignment/${id.id}`
    // });

    const {
        loading,
        error,
        data
    } = useApi(`/assignment/${id.id}`);

    const dispatch = useDispatch();
    const [deleteRequestStatus, setDeleteRequeststatus] = useState('idle');

    useEffect(() => {
        if (loading) {
            console.log("Getting assignment");
        }
    }, [loading]);

    useEffect(() => {
        if (data) {
            setAssignment(data);
            console.log(data);
        } else {
            setAssignment(null);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            setDeleteRequeststatus('pending');
            dispatch(deleteAssignment(id.id));
            navigate("../");
        } catch (err) {
            console.log(err);
        } finally {
            setDeleteRequeststatus('idle');
        }
    }

    if (assignment) {
        return (
            <div>
                <main>
                    <Navbar/>
                    <Container maxWidth="sm">
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            sx={{pl: 1}}
                            style={{minHeight: '100vh'}}
                        >
                            <Typography sx={{mt: 2}} variant="h5" align="center" color="textPrimary" gutterBottom>
                                {assignment.title}, {assignment.id}
                            </Typography>
                            <Typography sx={{mt: 2}} variant="h5" align="center" color="textSecondary" gutterBottom>
                                Are you sure you want to delete assignment {assignment.id}?
                            </Typography>

                            <Button component={Link} onClick={handleSubmit} variant="contained"
                                    color="error">Delete
                                assignment</Button>
                            <br />
                            <Button component={Link} to={`/`} navigate="../" variant="contained">Return</Button>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    } else {
        return (
            <div>
                <Navbar/>
                <LoadError errorMessage="Assignment could not be loaded"/>
            </div>
        )
    }
}