import { useEffect, useRef, useState, memo } from "react";
import { Loader } from "../Loader/Loader";
import { Section, WideButtonBottom } from "../CharactersList/stylesCharacterList";
import Error from "../Error/Error";
import { getRandNum } from "../../services/randomValues/randomValues";
import { vars } from "../style/Vars";


export const InfoList = memo(({ ItemComponent, ListStyleComponent, maxCount, targetsCount: { small, big }, onOpenItem, onCloseItemMobile, activeItem, searchValue, getItems, getAddItems, searchItems, searchMore, loading, loadingMore, error, loadingMoreError }) => {
        
    const [items, setItems] = useState(null);
    const [itemsLimitReached, setItemsLimitReached] = useState(false);
    
    let offset = useRef(0);
    const itemsRendered = items ? items.length : 0;
    let searchCount = useRef();

    const listItems = items && !(error || loading) ? <View 
    onOpenItem={onOpenItem} 
    onCloseItemMobile = {onCloseItemMobile} 
    activeItem = { activeItem } 
    ItemComponent = { ItemComponent }
    items = { items }/> : null;

    const errorImage = error ? <><Error/><p>A system error has occurred, please try again later</p></>  : null;
    const loader = loading ? <Loader/> : null;
    const LoadMoreLoading = loadingMore ? <Loader/> : null;
    const LoadMoreError = loadingMoreError ? <><Error/><p>A system error has occurred, please try again later</p></> : null;
    const LoadMoreButtons = !(loadingMore || loadingMoreError || itemsLimitReached || itemsRendered === 0) ? <WideButtonBottom onClick={ searchValue && searchValue !== '' ? onLoadMoreSearchResults : onLoadMore}>LOAD MORE</WideButtonBottom> : null;

    useEffect(() => {
        loadItems();
        console.log('itemsList mounted');
    }, []);

    useEffect(() => {
        if (searchValue) {
            searchItem();
            console.log('itemsList searching');
        }
        if (searchValue === '') {
            loadItems();
        }
    }, [ searchValue ])

    console.log(`renderItemsList, itemsRendered: ${itemsRendered}, offset: ${offset.current}`);
    
    const loadItems = () => {
        const count = getTargetCount();
        offset.current = getRandomItemsOffset();

       getItems(count, offset.current)
        .then(setItems);
    }

    const searchItem = () => {
        const count = getTargetCount();
        offset.current = 0;

       searchItems(searchValue, count, offset.current)
        .then(result => {
            searchCount.current = result.count; 
            if(searchCount.current <= count)
                setItemsLimitReached(true);
            else
                setItemsLimitReached(false);
            
            setItems(result.data);
        });
    }
    
    const getTargetCount = () => {
        return document.documentElement.clientWidth >= 992 ? big : small;
    }

    const getRandomItemsOffset = () => {
        return getRandNum(1, (maxCount - 1) - (getTargetCount() * 5));
    }

    function onLoadMore () {
        const count = getTargetCount();

        if(itemsRendered + count >= maxCount) {
            setItemsLimitReached(true);
            getAddItems(count, (offset.current + count))
            .then(addItems)

            return undefined;
        }

        if(offset.current + (count * 2) > maxCount) {
            const diff = (maxCount) - (offset.current + count);
            let part1 = [];

            getAddItems((diff + 1), offset.current + count)
            .then(data => {
                part1 = data;
                offset.current = 0;
                return getAddItems((count - diff), offset.current);
            })
            .then(data => {
                offset.current -= diff;
                addItemsFromParts(part1, data);
            });
        }
        else {
            offset.current += count;

            getAddItems(count, offset.current)
            .then(addItems)
        }
    }

    function onLoadMoreSearchResults() {
        const count = getTargetCount();

        if((itemsRendered + count) >= searchCount.current) {
            setItemsLimitReached(true);
            searchMore(searchValue, count, (offset.current + count))
            .then(result => {addItems(result.data)});

            return undefined;
        }

        offset.current += count;

        searchMore(searchValue, count, offset.current)
        .then(result => {addItems(result.data)});
       
    }

    const addItems = (addItems) => {
        setItems(()=> ([...items, ...addItems]));
    }

    const addItemsFromParts = (part1, part2) => {
        setItems(()=>([...items, ...part1, ...part2]));
    }

    return (
        <Section>
            <ListStyleComponent>
                {errorImage}
                {loader}
                {listItems}
            </ListStyleComponent>
            {LoadMoreLoading}
            {LoadMoreError}
            {LoadMoreButtons}
        </Section>
    );
});



const View = memo(({items, onOpenItem, onCloseItemMobile, activeItem, ItemComponent}) => {
    if(items.length === 0) {
        return (<p style={{color: vars.marvelRed, fontSize: '24px'}}>Data not found</p>)
    }
    return(
        <> { items.map((item, i) => ( 
        <ItemComponent 
            isActive={(activeItem && activeItem.id === item.id) ? true : false} 
            onCloseItemMobile={ onCloseItemMobile } 
            onOpen={ () => { onOpenItem( item ) } }
            key={i} 
            item={ item }/> )) } </>
    )
});