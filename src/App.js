import './assets/App.css';
import {Link} from 'react-router-dom'
import {AssignmentList} from "./features/assignments";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
    Typography,
    AppBar,
    CssBaseline,
    Toolbar,
    Container
} from "@mui/material";
import Button from "@mui/material/Button";

function App() {
    return (
        <>
            <CssBaseline/>
            <AppBar position="relative">
                <Toolbar>
                    <AssignmentIcon/>
                    <Typography variant="h6">
                        Assignments
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <Container maxWidth="sm">
                        <Typography sx={{mt: 2}} variant="h3" align="center" color="textPrimary" gutterBottom>
                            Assignments
                        </Typography>
                        <Button component={Link} to="/addAssignment" variant="contained">Add assignment</Button>
                        <h1>List of assignments</h1>
                        <AssignmentList/>
                        <Button component={Link} to="/assignments" variant="contained" sx={{mb: 1}}>View all assignments</Button>
                    </Container>
                </div>
            </main>
        </>
    );
}

export default App;
