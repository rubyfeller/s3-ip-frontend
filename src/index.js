import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './assets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider, createTheme} from "@mui/material";
import {AssignmentAdd} from "./pages/AssignmentAdd";
import {Assignments} from "./pages/Assignments";
import {AssignmentDetail} from "./pages/AssignmentDetail";
import PageNotFound from "./PageNotFound";
import {AssignmentDeleteContainer} from "./features/assignments";
import {AssignmentEdit} from "./pages/AssignmentEdit";

const router = createBrowserRouter([
    {
        path: "/",
        element: App()
    },
    {
        path: "/assignments",
        element: <Assignments/>,
    },
    {
        path: "/assignment/edit/:id",
        element: <AssignmentEdit/>,
    },
    {
        path: "/assignment/:id",
        element: <AssignmentDetail/>
    },
    {
        path: "/assignment/delete/:id",
        element: <AssignmentDeleteContainer/>
    },
    {
        path: "/addAssignment",
        element: <AssignmentAdd/>,
    },
    {
        path: "*",
        element: <PageNotFound/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
        primary: {
            main: "#063970"
        }
    }
})

root.render(
    <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
