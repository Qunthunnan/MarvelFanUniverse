import { useState } from "react";

export function useList (props) {
    const [ listState, setListState ] = useState({
        items: props?.items,
        offset: props?.offset,
        maxCount: props?.maxCount,
        searchValue: props?.searchValue,
        order: props?.order,
        isRandomOffset: props?.isRandomOffset,
    });
    
    return {listState, setListState}
}
