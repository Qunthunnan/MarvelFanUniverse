import { setContent } from '../../utils/setContent.js';
import { useEffect, useState } from 'react';

export const EntityDetailed = ({id, processTools, Render}) => {
    
    const [data, setData] = useState();
    const [ process, setProcess, getData ] = processTools;

    useEffect(() => {
        getData(id)
        .then(result => { 
            setData(result);
        })
        .then(() => {
            setProcess('view');
        });
    }, []);

    return (
        <>
            { setContent(process, Render, data) }
        </>
    )
}