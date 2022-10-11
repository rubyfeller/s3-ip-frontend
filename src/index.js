import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './assets/index.css';
import App from './App';
import {store} from './features/assignments/store';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider, createTheme} from "@mui/material";
import {AssignmentAdd} from "./pages/AssignmentAdd";
import {Assignments} from "./pages/Assignments";
import {AssignmentDetail} from "./pages/AssignmentDetail";
import PageNotFound from "./PageNotFound";
import {AssignmentDelete} from "./pages/AssignmentDelete";
import {AssignmentEdit} from "./pages/AssignmentEdit";
import {Auth0Provider} from "@auth0/auth0-react";

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
        element: <AssignmentDelete/>
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
    <Auth0Provider
        domain="dev-me00f56a.us.auth0.com"
        clientId="sC0lHiMvgucAw3IoU6XKhplNhvaqno0G"
        redirectUri={window.location.origin}
    >
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
    </ThemeProvider>
    </Provider>
    </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
