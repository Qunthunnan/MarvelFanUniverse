import { createContext, useState, useContext } from "react";

const ListContext = createContext();

const [ listState, setListState ] = useState({
    items: [],
    offset: 0,
    searchValue: '',
    order: '',
    isRandomOffset: false
});

function ListProvider ({children}) {
    return (
        <ListContext.Provider value={{ listState, setListState }}>
            {children}
        </ListContext.Provider>
    )
}

export const useList = () => useContext(ListContext);