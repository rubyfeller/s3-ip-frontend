import React from 'react';
import {Link} from 'react-router-dom'
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const AssignmentCard = ({assignment: {id, title, description, userId}}) => {
    return (
        <Card key={"id"} sx={{minWidth: 275, mb: 2}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Assignment {id}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/assignment/${id}`} size="small" variant="outlined">More
                    information</Button>
                <Button size="small" variant="outlined">Edit assignment</Button>
                <Button component={Link} to={`/assignment/delete/${id}`} size="small" variant="contained" color="error">Delete</Button>
            </CardActions>
        </Card>
    );
}

export default AssignmentCard;