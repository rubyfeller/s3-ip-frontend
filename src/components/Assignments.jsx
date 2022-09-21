import React from 'react';
import AssignmentCard from '../components/AssignmentCard'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from "./Navbar";
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import { AssignmentsContainer } from "../containers/AssignmentsContainer";

export const Assignments = () => {
    const assignments = AssignmentsContainer();
        return (<>
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
        </>);
    }