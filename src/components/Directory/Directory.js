import { Fragment, useCallback, useEffect, memo, useMemo } from "react";
import { DirectorySpan } from "./stylesDirectory";
import uniqid from "uniqid";

export const Directory = memo( ({ active, list }) => {

    useEffect(()=>{
        console.log(`Directory render, active${active}, list:`);
        console.log(`${list}`);
    });

    useEffect(()=>{
        console.log('Directory did mount');
    }, []);

    const directories = list
    .map( (item, i) => {
        const slash = list[i + 1] ? <DirectorySpan key={uniqid()}>/</DirectorySpan> : null;
            return (
                <Fragment key={uniqid()}>
                    <DirectorySpan href="#" $active={ item === active ? true : null }>{item}</DirectorySpan>
                    {slash}
                </Fragment>
            ) 
        });

    return ( <nav>{directories}</nav> );
});