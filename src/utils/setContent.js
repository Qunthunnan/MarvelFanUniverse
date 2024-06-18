import ErrorComponent from "../components/Error/Error";
import { Loader } from "../components/Loader/Loader";

export function setContent (process, Content, contentProps ) {
    switch(process) {
        case 'waiting': 
            return <Loader />
        case 'loading':
            return <Loader />
        case 'error':
            return <ErrorComponent />
        case 'view':
            return <Content {...contentProps}/>
        case 'unmount':
            return null
        default: 
            throw new Error(`unexpected process type (${process}) in setContent`);
    }
}