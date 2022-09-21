import React from 'react';
import {Outlet} from "react-router-dom";
import {Grid, Typography} from "@mui/material";

export default function PageNotFound() {
    return (
        <div>
            <Outlet/>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{minHeight: '100vh'}}
            >
                <Typography>
                    <p>Something went wrong...</p>
                </Typography>
            </Grid>
        </div>
    )
}