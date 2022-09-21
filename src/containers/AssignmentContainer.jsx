import React, {useEffect, useState} from 'react';
import api from '../api';
import {useParams} from "react-router";

export const AssignmentContainer = () => {
    const [assignment, setAssignment] = useState(0);
    let { id } = useParams();
    useEffect(() => {
        api.get(`assignment/${id}`)
            .then(res => {
                setAssignment(res.data);
            })
    }, [])
    return assignment;
}