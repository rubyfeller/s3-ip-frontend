import React from 'react';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const LoadError = (props) => {
    const refresh = (event) => {
        window.location.reload();
    }

    return (
        <div>
            <Typography variant="p" sx={{fontWeight: 'bold'}}>
                Error: { props.errorMessage }
            </Typography>
            <br />
            <br />
            <Button onClick={refresh} variant="outlined">Try again</Button>
            <br />
            <br />
        </div>
    )
}