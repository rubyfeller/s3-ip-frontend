import React, {useEffect, useState} from 'react';
import {createUpdateAssignment, configureStore} from 'redux';
import api from '../../../lib/api';
import {useParams} from "react-router";

export const AssignmentUpdateContainer = (assignment, id) => {

    const [updatedAssignment, setUpdatedAssignment] = useState([]);
    const [error, setError] = useState(null);

    const updateAssignment = () => {
        api.put(`assignment/update/${id}`, assignment)
            .then(res => {
                console.log("Updated successfully!");
                //navigate("/");
                console.log(res);
                console.log(res.data);
            }).catch(err => {
            //setError(err);
            console.log(err.response);
        })
    }

    useEffect(() => {
        updateAssignment();
    }, []);

    return {updateAssignment, updatedAssignment, error}
}