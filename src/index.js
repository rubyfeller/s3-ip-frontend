import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './assets/index.css';
import {App} from './App';
import {store} from './features/assignments/store';
import {Provider} from 'react-redux';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider, createTheme} from "@mui/material";
import {Auth0Provider} from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
        primary: {
            main: "#063970"
        }
    }
})

root.render(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Auth0Provider
                        domain={domain}
                        clientId={clientId}
                        audience={audience}
                        redirectUri={window.location.origin}
                    >
                    <App/>
                    </Auth0Provider>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
