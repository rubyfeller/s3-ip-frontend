import React from 'react';
import AssignmentCard from '../components/AssignmentCard'
import {AssignmentsContainer} from "../containers/AssignmentsContainer";

export const AssignmentList = () => {
    const assignments = AssignmentsContainer();

        return (
            <>
                <div>
                    {assignments.map((assignment) => (
                        <AssignmentCard key={assignment.id} assignment={assignment}/>
                    ))}
                </div>
            </>
        );
    }