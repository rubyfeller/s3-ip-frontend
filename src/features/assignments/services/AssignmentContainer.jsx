import {useEffect, useState} from 'react';
import api from '../../../lib/api';

export const AssignmentContainer = (id) => {
    const [data, setData] = useState({});
    const [error, setError] = useState("");

    const getAssignment = () => {
        console.log(id.id);
        api.get(`assignment/${id.id}`)
            .then(res => {
                setData(res.data);
                console.log(data);
            }).catch(err => {
            setError(err.response);
            console.log(err.response)
        })
    };

    useEffect( () => {
        getAssignment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {getAssignment, data, error};
}