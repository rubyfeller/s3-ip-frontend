import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";

export const useApi = (endpoint, options = {}) => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState({
        error: null,
        loading: true,
        data: null,
    });

    useEffect(() => {
        (async () => {
            try {
                const { audience, scope, ...axiosParams } = options;
                const accessToken = await getAccessTokenSilently();
                const res = await axios("http://localhost:8080" + endpoint, {
                    ...axiosParams,
                    headers: {
                        ...axiosParams.headers,
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setState({
                    ...state,
                    data: await res.data,
                    error: null,
                    loading: false,
                });
            } catch (error) {
                setState({
                    ...state,
                    error,
                    loading: false,
                });
            }
        })();
    }, []);

    return {
        ...state
    };
};