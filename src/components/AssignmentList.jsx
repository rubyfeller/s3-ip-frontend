import React, {useEffect, useState} from 'react';
import {AssignmentCard} from '../components/AssignmentCard';
import {LoadError} from "./LoadError";
import api from "../api";

export const AssignmentList = (props) => {
    //const assignments = AssignmentsContainer();

    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`assignment/all`, {timeout: 1000})
            .then(res => {
                setAssignments(res.data);
            }).catch(err => {
            if(err.code === 'ECONNABORTED'){
                setError('assignments could not be loaded');
            }
            console.log(err.message)
        })
    }, [])

    if (assignments.length !== 0) {
        return (
                <div>
                    {assignments.map((assignment) => (
                        <AssignmentCard key={assignment.id} assignment={assignment}/>
                    ))}
                </div>
        );
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