import React, {useState} from 'react';
import {Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Navbar} from "../layouts/Navbar";
import Typography from "@mui/material/Typography";
import {Link, useNavigate} from "react-router-dom";
import {addAssignment} from "../features/assignments/AssignmentSlice";
import {useDispatch} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import {AlertHandler} from "../layouts/AlertHandler";


export const AssignmentAdd = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useAuth0();

    const [assignment, setAssignment] = useState({title: "", description: "", creator: user.name, userId: user.sub});
    const [submitted, setSubmitted] = useState(null);
    const [addRequestStatus, setAddRequeststatus] = useState('idle');
    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertStatus, setAlertStatus] = useState(null);

    const error = "";

    const onTitleChange = (event) => {
        setAssignment((prevState) => ({
            ...prevState,
            title: event.target.value,
        }));
    }

    const onDescriptionChange = (event) => {
        setAssignment((prevState) => ({
            ...prevState,
            description: event.target.value,
        }));
    }

    const redirectWithTimeout = () => {
        setTimeout(() => {
            navigate("../");
        }, 2000);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);

        const canSave = [assignment.title, assignment.description, assignment.userId].every(Boolean) && addRequestStatus === 'idle';

        if (canSave) {
            try {
                setAddRequeststatus('pending');
                dispatch(addAssignment(assignment));
                setAlertMessage("Assignment successfully added! Redirecting...");
                setAlertStatus("success");
                setAlertShow(true);
                redirectWithTimeout();
            } catch (err) {
                setAlertMessage("Assignment could not be added. Make sure all fields are filled in");
                setAlertStatus("error");
                setAlertShow(true);
                redirectWithTimeout();
                console.log(err);
            } finally {
                setAddRequeststatus('idle');
            }
        }
    }

    return (
        <div>
            <Navbar/>
            <Grid style={{textAlign: "center"}}>
                {alertShow &&
                    <AlertHandler message={alertMessage} status={alertStatus}/>
                }
                <Typography sx={{pt: 3}} variant="h3" gutterBottom>
                    Add assignment
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        onChange={onTitleChange}
                        error={!!(submitted && !assignment.title)}
                        helperText={submitted && !assignment.title ? "Please enter a title" : null}
                        style={{width: "200px", margin: "5px"}}
                        type="text"
                        label="Title"
                        variant="outlined"
                    />
                    <TextField
                        onChange={onDescriptionChange}
                        error={!!(submitted && !assignment.description)}
                        helperText={submitted && !assignment.description ? "Please enter a description" : null}
                        style={{width: "200px", margin: "5px"}}
                        type="text"
                        label="Description"
                        variant="outlined"
                    />
                    <br/>
                    <br/>
                    <Button type="submit" variant="contained" color="primary">
                        Add
                    </Button>
                    <br/>
                    <br/>
                    <Button component={Link} to={`/`} type="submit" variant="outlined" color="primary">
                        Return
                    </Button>
                </form>
                {error && <p>{error.message}</p>}
            </Grid>
        </div>
    )
}