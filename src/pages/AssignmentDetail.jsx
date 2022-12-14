import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Navbar} from "../layouts/Navbar";
import {Container, Grid} from "@mui/material";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {AssignmentCard} from '../features/assignments';
import {LoadError} from "./LoadError";
import {useApi} from "../hooks/use-api";

export const AssignmentDetail = () => {
    const id = useParams();

    const [assignment, setAssignment] = useState([]);

    const {
        loading,
        error,
        data
    } = useApi(`/assignment/${id.id}`);

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
                            <Typography sx={{mt: 2}} variant="h3" align="center" color="textPrimary" gutterBottom>
                                Assignment {assignment.id}
                            </Typography>
                            <AssignmentCard key={assignment.id} assignment={assignment}/>
                            <Button component={Link} to={`/`} variant="contained">Go back</Button>
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