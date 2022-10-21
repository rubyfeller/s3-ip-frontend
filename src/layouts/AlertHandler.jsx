import * as React from 'react';
import {useEffect, useState} from "react";
import {Alert} from "@mui/material";

export const AlertHandler = (props) => {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowAlert(false);  // Disable your alert after 5 seconds
        }, 5000);

        return () => {
            clearTimeout(timeout); // Clears timer in case you close your alert somewhere else.
        }
    }, [])

    if (showAlert) {
        return (
                <Alert variant="filled" severity={props.status}>
                    {props.message}
                </Alert>
        )
    }
}