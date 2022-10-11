import React, {useEffect, useState} from 'react';
import {AssignmentCard} from './AssignmentCard';
import {LoadError} from "../../../pages/LoadError";
import Typography from "@mui/material/Typography";
import {useAxiosFetch} from "../hooks/useAxiosFetch";
import {useAuth0} from "@auth0/auth0-react";
import Button from "@mui/material/Button";

export const AssignmentList = () => {
    const {loginWithRedirect, logout, user, isAuthenticated, isLoading} = useAuth0();

    const [assignments, setAssignments] = useState([]);

    const {data, loading, error} = useAxiosFetch({
        method: "GET",
        url: `/assignment/all`,
        timeout: 2000
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
        }
    }, [error]);

        if (isAuthenticated) {
            return (
                <div>
                    {assignments.map((assignment, index) => (
                        <AssignmentCard key={index} assignment={assignment}/>
                    ))}
                    <Typography>Welcome {user.name}</Typography>
                    <Button variant="outlined" onClick={() => logout({returnTo: window.location.origin})}>
                        Log Out
                    </Button>
                </div>
            );

    } else if (loading) {
        return (
            <Typography>Loading assignments...</Typography>
        )
    } else if (!isAuthenticated) {
        return (
        <>
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