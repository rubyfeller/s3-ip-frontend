import React, {useEffect, useState} from 'react';
import {AssignmentCard} from './AssignmentCard';
import {LoadError} from "../../../pages/LoadError";
import Typography from "@mui/material/Typography";
import {useAuth0} from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import {useApi} from "../../../hooks/use-api";

export const AssignmentList = () => {
    const {loginWithRedirect, user, isAuthenticated} = useAuth0();

    const [assignments, setAssignments] = useState([]);

    const {
        loading,
        error,
        data
    } = useApi('/assignment/all');

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
        }
    }, [error]);

        if (assignments && isAuthenticated) {
            return (
                <div>
                    {assignments.map((assignment, index) => (
                        <AssignmentCard key={index} assignment={assignment}/>
                    ))}
                    <Typography>Welcome {user.name}</Typography>
                </div>
            );

    } else if (loading) {
        return (
            <Typography>Loading assignments...</Typography>
        )
    } else if (!isAuthenticated) {
        return (
        <>
            <Typography>Login to view assignments</Typography>
            <Button variant="contained" onClick={loginWithRedirect}>Log In</Button>
            <br />
            <br />
        </>
        )
    } else if (error) {
        return (
            <LoadError errorMessage={error}/>
        )
    } else {
        return (
            <LoadError errorMessage="no assignments found, have you added one yet?"/>
        )
    }
}