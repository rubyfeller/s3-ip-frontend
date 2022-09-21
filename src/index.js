import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider, createTheme} from "@mui/material";
import { AssignmentAdd } from "./components/AssignmentAdd";
import { Assignments } from "./components/Assignments";
import { AssignmentDetail } from "./components/AssignmentDetail";
import PageNotFound from "./PageNotFound";
import AssignmentDeleteContainer from "./containers/AssignmentDeleteContainer";

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
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
