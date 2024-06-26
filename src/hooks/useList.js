import { createContext, useState, useContext } from "react";

const ListContext = createContext();

export function ListProvider ({children}) {
    const [ listState, setListState ] = useState({});

    return (
        <ListContext.Provider value={{ listState, setListState }}>
            {children}
        </ListContext.Provider>
    )
}

export const useList = () => useContext(ListContext);