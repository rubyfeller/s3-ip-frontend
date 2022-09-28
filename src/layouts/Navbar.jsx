import React from 'react';
import {AppBar, CssBaseline, Toolbar, Typography} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default class Navbar extends React.Component {
    render() {
        return (
            <div>
                <CssBaseline/>
                <AppBar position="relative">
                    <Toolbar>
                        <AssignmentIcon/>
                        <Typography variant="h6">
                            Assignments
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}