import React, {useState} from 'react';
import {AssignmentCard} from './AssignmentCard';
import {AssignmentsContainer} from '../services/AssignmentsContainer';
import {LoadError} from "../../../pages/LoadError";

export const AssignmentList = () => {
    const assignments = AssignmentsContainer();
    console.log(assignments);
    const [error, setError] = useState(null);

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