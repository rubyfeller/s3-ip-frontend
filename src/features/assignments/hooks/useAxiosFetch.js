import { useState, useEffect } from "react";
import axios from "axios";
import {addAssignments} from "../AssignmentSlice";
import {useDispatch} from "react-redux";

axios.defaults.baseURL = "http://localhost:8080/";

export const useAxiosFetch = (axiosParams) => {
    const [data, setData] = useState([{}]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const response = await axios.request(axiosParams);
            setData(response.data);
            dispatch(addAssignments(data));

        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, error, loading, fetchData };
};