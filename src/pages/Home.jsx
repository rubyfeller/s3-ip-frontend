import {AssignmentList} from '../features/assignments';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Navbar} from "../layouts/Navbar";
import {Container} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";

export const Home = () => {

    const {isAuthenticated, getAccessTokenSilently, user, isLoading} = useAuth0();


    useEffect(() => {
        if (isAuthenticated) {
            const getToken = async () => {
                const token = await getAccessTokenSilently();
                const role = user["/roles"][0];
                localStorage.setItem("role", role);
                localStorage.setItem("token", token);
            }
            getToken()
                .catch(console.error);
        }
    }, [getAccessTokenSilently, isAuthenticated, user]);

    if (!isLoading) {
        return (
            <>
                <Navbar/>
                <main>
                    <Container maxWidth="sm">
                        <Typography sx={{mt: 2}} variant="h3" align="center" color="textPrimary" gutterBottom>
                            Assignments
                        </Typography>
                        <Button component={Link} to="/addAssignment" variant="contained">Add assignment</Button>
                        <h1>List of assignments</h1>
                        <AssignmentList/>
                        <Button component={Link} to="/assignments" variant="contained" sx={{mb: 1}}>View all
                            assignments</Button>
                    </Container>
                </main>
            </>
        );
    }
    else {
        return(
            <p>Loading...</p>
        )
    }
}