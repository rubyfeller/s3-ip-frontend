import React, {useEffect, useState} from 'react';
import {AssignmentCard} from '../features/assignments';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Navbar} from "../layouts/Navbar";
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {LoadError} from "./LoadError";
import {useApi} from '../hooks/use-api';
import {useAuth0} from "@auth0/auth0-react";

export const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const {user} = useAuth0();

    const {
        loading,
        error,
        data
    } = useApi(`/assignment/getByUserId/${user.sub}`);

    useEffect(() => {
        if (loading) {
            console.log("Getting assignments");
        }
    }, [loading]);

    useEffect(() => {
        if (data && data.length > 0) {
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

    function AssignmentCards() {
        if (assignments) {
            return (
                <div>
                    {assignments.map((assignment, index) => (
                        <AssignmentCard key={index} assignment={assignment}/>
                    ))}
                </div>
            )
        } else {
            return (
                <div>
                    <Typography sx={{mt: 2}} variant="h6" align="center">Something went wrong. Are there any assignments
                        added?</Typography>
                </div>
            )
        }
    }

    if (!loading) {
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
                                My assignments
                            </Typography>
                            <AssignmentCards/>
                            <Button component={Link} to={`/`} variant="contained">Go back</Button>
                        </Grid>
                    </Container>
                </main>
            </div>
        )
    } else if (loading) {
        return (
            <Typography>Loading assignments...</Typography>
        )
    } else if (error) {
        return (
            <LoadError errorMessage={error}/>
        )
    }
}