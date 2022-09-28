import React, {useEffect, useState} from 'react';
import {AssignmentCard} from '../features/assignments';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from "../layouts/Navbar";
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {LoadError} from "./LoadError";
import api from "../lib/api";

export const Assignments = () => {

    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`assignment/all`, {timeout: 1000})
            .then(res => {
                setAssignments(res.data);
            }).catch(err => {
            if (err.code === 'ECONNABORTED') {
                setError('assignments could not be loaded');
            }
            console.log(err.message)
        })
    }, [])

    if (assignments.length !== 0) {
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
                            {assignments.map((assignment) => (
                                <AssignmentCard key={assignment.id} assignment={assignment}/>))}
                            <Button component={Link} to={`/`} variant="contained">Go back</Button>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    } else if (error) {
        return (
            <div>
                <Navbar/>
                <LoadError errorMessage={error}/>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar/>
                <LoadError errorMessage="no assignments found, have you added one yet?"/>
            </div>
        )
    }
}