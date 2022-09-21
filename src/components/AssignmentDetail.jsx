import React from 'react';
import AssignmentCard from '../components/AssignmentCard'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from "./Navbar";
import {Container, Grid} from "@mui/material";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import { AssignmentContainer } from '../containers/AssignmentContainer';

export const AssignmentDetail = () => {
    const id = useParams();
    const assignment = AssignmentContainer(id);
    return (
        <>
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
                            <Button component={Link} to={`/assignments`} variant="contained">Go back</Button>
                        </Grid>
                    </Container>
                </main>
            </div>
        </>
    );
}