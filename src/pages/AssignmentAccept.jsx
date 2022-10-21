import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Navbar} from "../layouts/Navbar";
import {Container, Grid} from "@mui/material";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {LoadError} from "./LoadError";
import {acceptAssignment} from "../features/assignments/AssignmentSlice";
import {useDispatch} from "react-redux";
import {useApi} from "../hooks/use-api";
import {useAuth0} from "@auth0/auth0-react";
import {AlertHandler} from "../layouts/AlertHandler";

export const AssignmentAccept = () => {
    const id = useParams();
    const navigate = useNavigate();

    const {user} = useAuth0();

    const [assignment, setAssignment] = useState([]);

    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertStatus, setAlertStatus] = useState(null);

    const {
        loading,
        error,
        data
    } = useApi(`/assignment/${id.id}`);

    const dispatch = useDispatch();
    const [acceptRequestStatus, setAcceptRequestStatus] = useState('idle');

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

    const redirectWithTimeout = () => {
        setTimeout(() => {
            navigate("../");
        }, 2000);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            setAcceptRequestStatus('pending');
            dispatch(acceptAssignment({id: id.id, executor: user.name}));
            setAlertMessage("Successfully accepted assignment! Redirecting...");
            setAlertStatus("success");
            setAlertShow(true);
            redirectWithTimeout();
        } catch (err) {
            setAlertMessage("Assignment could not be accepted. Make sure the assignment is still available. Redirecting...");
            setAlertStatus("error");
            setAlertShow(true);
            redirectWithTimeout();
            console.log(err);
        } finally {
            setAcceptRequestStatus('idle');
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
                            {alertShow &&
                                <AlertHandler message={alertMessage} status={alertStatus}/>
                            }
                            <Typography sx={{mt: 2}} variant="h5" align="center" color="textPrimary" gutterBottom>
                                {assignment.title}, {assignment.id}
                            </Typography>
                            <Typography sx={{mt: 2}} variant="h5" align="center" color="textSecondary" gutterBottom>
                                Are you sure you want to accept assignment {assignment.id}?
                            </Typography>

                            <Button component={Link} onClick={handleSubmit} variant="contained"
                                    color="success">Accept assignment</Button>
                            <br/>
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