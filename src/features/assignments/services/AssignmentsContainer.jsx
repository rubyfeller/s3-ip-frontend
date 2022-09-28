import React, {useEffect, useState} from 'react';
import api from '../../../lib/api';

export const AssignmentsContainer = () => {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        api.get(`assignment/all`)
            .then(res => {
                setAssignments(res.data);
                console.log(assignments);
            }).catch(err => {
            setError(err.response);
            console.log(err.response)
        })
    }, [])
    return assignments;
}