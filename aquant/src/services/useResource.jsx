import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'


export const ResourceStatuses = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    FAILURE: 'failure',
};


export default function useResource(fetchFunction, functionArgs= [], shouldAutomaticExecute = false) {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(ResourceStatuses.IDLE);

    useEffect(() => {
        shouldAutomaticExecute && execute();
    }, []);

    async function execute() {
        setStatus(ResourceStatuses.LOADING);
        try {
            const result = await fetchFunction(...functionArgs);
            setResult(result);
            setStatus(ResourceStatuses.SUCCESS);
        } catch (error) {
            setError(error);
            setStatus(ResourceStatuses.FAILURE);
        }
    }

    function getResult() {
        return status === ResourceStatuses.SUCCESS ? result : error;
    }

    return {result, error, status, execute, getResult};
}