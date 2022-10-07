import React, {useEffect, useState} from 'react';
import {AssignmentCard, useAxiosFetch} from '../features/assignments';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from "../layouts/Navbar";
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {LoadError} from "./LoadError";
import api from "../lib/api";
import {useDispatch, useSelector} from "react-redux";
import {getAllAssignments, getAssignmentsStatus, getAssignmentsError, fetchAssignments} from "../features/assignments/AssignmentSlice";

export const Assignments = () => {

    const [assignments, setAssignments] = useState([]);

    const {data, loading, error} = useAxiosFetch({
        method: "GET",
        url: `/assignment/all`,
        timeout: 1000
    });

    useEffect(() => {
        if (loading) {
            console.log("Getting assignments");
        }
    }, [loading]);

    useEffect(() => {
        if (data) {
            setAssignments(data);
            console.log(data);
        } else {
            setAssignments(null);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(error);
        }
    }, [error]);

    if (assignments.length > 0) {
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
                                Assignments
                            </Typography>
                            {assignments.map((assignment, index) => (
                                <AssignmentCard key={index} assignment={assignment}/>))}
                            <Button component={Link} to={`/`} variant="contained">Go back</Button>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    } else if (error) {
        return (
            <LoadError errorMessage={error}/>
        )
    }
    else {
        return (
            <Typography>Something went wrong. Are there any assignments added?</Typography>
        )
    }
}