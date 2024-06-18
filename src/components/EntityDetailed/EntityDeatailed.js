import { TextWrapper, DetailedWrapper } from './stylesCharacterDetailed.js';
import { Link, redirect } from 'react-router-dom';
import { isFindThumbnail } from '../../utils/isFindThumbnail.js';
import { useMarvelService } from '../../services/ApiService/ApiService.js';
import { setContent } from '../../utils/setContent.js';
import { useEffect, useState } from 'react';

export const EntityDetailed = ({id, processTools, Render}) => {
    
    const [data, setData] = useState();
    const { process, setProcess, getData } = processTools;

    useEffect(() => {
        getData(id)
        .then(result => { 
            setData(result)
        })
        .then(() => {
            setProcess('view')
        });
    }, []);

    return (
        <DetailedWrapper>
            {setContent(process, Render, data)}
        </DetailedWrapper>
    )
}