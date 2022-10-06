import React, {useEffect, useState} from 'react';
import {AssignmentCard} from './AssignmentCard';
import {AssignmentsContainer} from '../services/AssignmentsContainer';
import {LoadError} from "../../../pages/LoadError";
import {useDispatch, useSelector} from "react-redux";
import {fetchAssignments, getAllAssignments, getAssignmentsError, getAssignmentsStatus} from "../AssignmentSlice";
import Typography from "@mui/material/Typography";
import {useAxiosFetch} from "../hooks/useAxiosFetch";

export const AssignmentList = () => {
    const [assignments, setAssignments] = useState([]);

    const {data, loading, error} = useAxiosFetch({
        method: "GET",
        url: `/assignment/all`
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

    if (assignments.length > 0) {
        return (
                <div>
                    {assignments.map((assignment, index) => (
                        <AssignmentCard key={index} assignment={assignment}/>
                    ))}
                </div>
        );
    }
    else if (loading) {
        return (
            <Typography>Loading assignments...</Typography>
        )
    }
    else if (error) {
        return (
        <LoadError errorMessage={error} />
        )
    }
    else {
        return (
            <LoadError errorMessage="no assignments found, have you added one yet?" />
        )
    }
}