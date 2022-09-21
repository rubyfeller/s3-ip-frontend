import React, {useEffect, useState} from 'react';
import api from '../api';

export const AssignmentsContainer = () => {
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        api.get(`assignment/all`)
            .then(res => {
                setAssignments(res.data);
            })
    }, [])
    return assignments;
}