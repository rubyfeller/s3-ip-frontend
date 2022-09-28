import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from "../layouts/Navbar";
import {Box, Container, Grid} from "@mui/material";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {AssignmentContainer, AssignmentCard} from '../features/assignments';

export const AssignmentDetail = () => {
    const id = useParams();
    const assignment = AssignmentContainer(id);
    if (assignment !== 0) {
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
            <Box textAlign="center">
                <Typography sx={{mt: 2}} variant="h5" gutterBottom>Assignment not
                    found.
                    The assignment might be deleted</Typography>
                <Button component={Link} to={`/`} variant="contained">Go back</Button>
            </Box>
        )
    }
}