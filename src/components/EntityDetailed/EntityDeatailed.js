import { setContent } from '../../utils/setContent';
import { useEffect, useState } from 'react';
import { useSearchItems } from '../../hooks/useSearchItems';

export const EntityDetailed = ({id, processTools, Render}) => {
    
    const [data, setData] = useState();
    const [ process, setProcess, [getData, getDataList] ] = processTools;
    const {name, error, onInput , search} = useSearchItems(onSearch);
    const [searchValue, setSearchValue] = useState();

    function onSearch (searchValue) {
        setSearchValue(searchValue);
    }

    useEffect(() => {
        let resultData = {}
        getData(id)
        .then(result => { 
            resultData = result;
            return getDataList(id);
        })
        .then(result => {
            resultData = {
                ...resultData,
                listData: result,
                searchParams: {
                    searchValue: name,
                    searchError: error,
                    onInput,
                    searchAction: search
                }
            }
            setData(resultData);
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