import { Fragment, useEffect, memo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { vars } from "../style/Vars";
import { DirectorySpan } from "./stylesDirectory";

export const Directory = memo( ({ list }) => {
    useEffect(()=>{
    }, []);
    const nodeRef = useRef();

    const directories = list
    .map( (item, i) => {
        const slash = list[i + 1] ? <DirectorySpan key={i}>/</DirectorySpan> : null;
            return (

                <Fragment key={i + 0.5}>
                    <DirectorySpan ref={nodeRef}>
                        <NavLink end style={({isActive}) => ({ transition: 'color 0.3s', color: isActive ? vars.marvelRed : '#000'})} to={item.directoryLink}> {item.directoryName}  </NavLink>
                    </DirectorySpan>
                    {slash}
                </Fragment>
            ) 
        });

    return ( <nav>{directories}</nav> );
});