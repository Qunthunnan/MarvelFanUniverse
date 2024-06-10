
import { useState } from "react";

export function useHttp(startLoading) {
    const [loading, setLoading] = useState(!!startLoading);
    const [error, setError] = useState(false);

    const getResource = async (url) => {
        setLoading(true);
        setError(false);
        try {
            const result = await fetch(url);
            const data = await result.json();
        
            setLoading(false);
            if(!result.ok) {
                setError(true);
                throw new Error(`${result.status}: ${result.statusText}`);
            } 

            return data;
        } catch (error) {
            setLoading(false);
            setError(true);
            throw error;
        }
    };

    return { loading, setLoading, error, setError, getResource }
}