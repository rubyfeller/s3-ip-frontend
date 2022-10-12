import './assets/App.css';
import {Link, Route, Routes} from 'react-router-dom'
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
import {Navbar} from "./layouts/Navbar";
import {useAuth0} from "@auth0/auth0-react";
import {LoadError} from "./pages/LoadError";
import {Assignments} from "./pages/Assignments";
import {Home} from "./pages/Home";
import {ProtectedRoute} from "./components/protected-route";
import {AssignmentEdit} from "./pages/AssignmentEdit";
import {AssignmentDetail} from "./pages/AssignmentDetail";
import {AssignmentDelete} from "./pages/AssignmentDelete";
import PageNotFound from "./PageNotFound";
import {AssignmentAdd} from "./pages/AssignmentAdd";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/assignments" element={
                <ProtectedRoute component={Assignments} loading/>
            }
            />
            <Route path="/assignment/edit/:id" element={
                <ProtectedRoute component={AssignmentEdit} loading/>
            }
            />
            <Route path="/assignment/:id" element={
                <ProtectedRoute component={AssignmentDetail} loading/>
            }
            />
            <Route path="/assignment/delete/:id" element={
                <ProtectedRoute component={AssignmentDelete} loading/>
            }
            />
            <Route path="/addAssignment" element={
                <ProtectedRoute component={AssignmentAdd} loading/>
            }
            />
            <Route path="*" element={
                <ProtectedRoute component={PageNotFound} loading/>
            }
            />
        </Routes>
    )
}