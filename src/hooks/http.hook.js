
import { useState } from "react";

export function useHttp(startLoading) {
    const [loading, setLoading] = useState(!!startLoading);
    const [error, setError] = useState(false);

    const [process, setProcess] = useState('waiting');

    const getResource = async (url) => {
        setLoading(true);
        setError(false);

        setProcess('loading');
        try {
            const result = await fetch(url);
            const data = await result.json();
        
            setLoading(false);
            if(!result.ok) {
                setError(true);

                setProcess('error');

                throw new Error(`${result.status}: ${result.statusText}`);
            } 

            return data;
        } catch (error) {
            setProcess('error');

            setLoading(false);
            setError(true);

            throw error;
        }
    };

    return { loading, setLoading, process, setProcess, error, setError, getResource }
}