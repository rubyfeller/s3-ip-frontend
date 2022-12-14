import React from 'react';
import {Link} from 'react-router-dom'
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {format, parseISO} from "date-fns";

export const AssignmentCard = ({
                                   assignment: {
                                       id,
                                       title,
                                       description,
                                       creator,
                                       executor,
                                       executionDateTime,
                                       executionPrice
                                   }
                               }) => {
    const role = localStorage.getItem("role");
    return (
        <Card data-testid={`assignmentcard-${id}`} sx={{minWidth: 275, mb: 2}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Assignment {id}, by {creator}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                {executor &&
                    <Typography variant="body2">
                        Assignment will be executed
                        by: {executor} on {format(parseISO(executionDateTime), 'dd-MM-yyyy hh:mm')} for {executionPrice} EU
                    </Typography>
                }
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/assignment/${id}`} size="small" variant="outlined">More
                    information</Button>
                {role === 'entrepreneur' &&
                    <Button component={Link} to={`/assignment/accept/${id}`} size="small"
                            variant="outlined">Accept</Button>
                }
                <Button component={Link} to={`/assignment/edit/${id}`} size="small" variant="outlined">Edit</Button>
                <Button component={Link} to={`/assignment/delete/${id}`} size="small" variant="contained"
                        color="error">Delete</Button>
            </CardActions>
        </Card>
    );
}