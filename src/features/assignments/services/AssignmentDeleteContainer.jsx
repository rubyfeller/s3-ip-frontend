import React, {useEffect} from 'react';
import api from '../../../lib/api';
import {useParams} from "react-router";
import {useNavigate} from 'react-router-dom';

export const AssignmentDeleteContainer = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.delete(`assignment/delete/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("../");
            })
    }, [])
}