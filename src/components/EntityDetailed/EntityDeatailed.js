import { setContent } from '../../utils/setContent';
import { Fragment, useEffect, useState } from 'react';
import { useSearchItems } from '../../hooks/useSearchItems';

export const EntityDetailed = ({id, processTools, Render, handleError}) => {
    
    const [data, setData] = useState();
    const [ process, setProcess, [getData, getDataList] ] = processTools;
    const {name, error, onInput , search} = useSearchItems({ onSearch });
    const [searchValue, setSearchValue] = useState();

    function onSearch (searchValue) {
        setSearchValue(searchValue);
    }

    useEffect(() => {
        try {
            const dataObj = {};
            Object.assign(dataObj, data);           
            dataObj.searchParams.searchValue = searchValue;
            setData(dataObj);
        } catch (error) { }
    }, [searchValue]);

    useEffect(() => {
        try {
            const dataObj = {};
            Object.assign(dataObj, data);           
            dataObj.searchParams.inputValue = name;
            setData(dataObj);
        } catch (error) { }
    }, [name]);

    useEffect(() => {
        setProcess('loading');
        loadData();
    }, [id]);

    function loadData () {
        let resultData = {}
        getData(id)
        .then(result => { 
            resultData = result;
            return getDataList(id);
        })
        .then(result => {
            resultData = {
                ...resultData,
                listData: result.data,
                maxCount: result.count,
                searchParams: {
                    searchValue: searchValue,
                    inputValue: '',
                    searchError: error,
                    onInput,
                    searchAction: search
                },
                id: id
            }
            setData(resultData);
        })
        .then(() => {
            setProcess('view');
        })
        .catch((error) => {
            handleError(error);
        })
    }

    return (
        <Fragment key={id}>
            { data || process === 'error' ? setContent(process, Render, data) : setContent('loading', Render, data) }
        </Fragment>
    )
}