import React, {useEffect, useState} from 'react';
import api from '../api';

export const AssignmentsContainer = () => {
    const [assignments, setAssignments] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        api.get(`assignment/all`)
            .then(res => {
                setAssignments(res.data);
            }).catch(err => {
            setError(err.response);
            console.log(err.response)
        })
    }, [])
}