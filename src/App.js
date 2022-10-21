import './assets/App.css';
import {Route, Routes} from 'react-router-dom'
import {Assignments} from "./pages/Assignments";
import {Home} from "./pages/Home";
import {ProtectedRoute} from "./components/protected-route";
import {AssignmentEdit} from "./pages/AssignmentEdit";
import {AssignmentDetail} from "./pages/AssignmentDetail";
import {AssignmentDelete} from "./pages/AssignmentDelete";
import PageNotFound from "./PageNotFound";
import {AssignmentAdd} from "./pages/AssignmentAdd";
import {AssignmentAccept} from "./pages/AssignmentAccept";

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
            <Route path="/assignment/accept/:id" element={
                <ProtectedRoute component={AssignmentAccept} loading/>
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