import React, {useEffect, useState} from 'react';
import api from '../api';
import {useParams} from "react-router";
import { useNavigate } from 'react-router-dom';

export default function AssignmentDeleteContainer() {
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.delete(`assignment/delete/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                    navigate("/assignments");
            })
    }, [])

}