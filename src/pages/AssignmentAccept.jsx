import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Navbar} from "../layouts/Navbar";
import {Container, Grid, TextField} from "@mui/material";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {LoadError} from "./LoadError";
import {acceptAssignment} from "../features/assignments/AssignmentSlice";
import {useDispatch} from "react-redux";
import {useApi} from "../hooks/use-api";
import {useAuth0} from "@auth0/auth0-react";
import {AlertHandler} from "../layouts/AlertHandler";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePickerMui} from "../layouts/DateTimePickerMui";

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
    const [selectedDate, setSelectedDate] = useState(null);
    const [price, setPrice] = useState(0);


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

    const handlePriceChange = (event) => {
        setPrice(() => ({
            price: event.target.value,
        }));
    };

    const getNewDateTime = (newDateTime) => {
        console.log("Coming from DateTimePicker:", newDateTime)
        setSelectedDate(newDateTime);

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            dispatch(acceptAssignment({id: id.id, executor: user.name, executionDateTime: selectedDate, executionPrice: price.price}));
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
                            <Typography>Select date and time</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePickerMui onChange={getNewDateTime}/>
                            </LocalizationProvider>
                            <Typography>Price for execution of assignment</Typography>
                            <TextField
                                onChange={handlePriceChange}
                                style={{width: "200px", marginBottom: "3px"}}
                                type="number"
                                defaultValue={0}
                                InputProps={{
                                    inputProps: {min: 0}
                                }}
                                label="Price in euro"
                                variant="outlined"
                            />
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