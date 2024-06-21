import { useEffect, useRef, useState, memo } from "react";
import { Section, WideButtonBottom } from "../CharactersList/stylesCharacterList";
import { getRandNum } from "../../utils/randomValues";
import { vars } from "../style/Vars";
import { setContent } from "../../utils/setContent";


export const InfoList = ({ 
    ItemComponent, 
    ListStyleComponent,
    targetsCount: { small, big }, 
    onOpenItem, 
    onCloseItemMobile, 
    activeItem, 
    searchValue, 
    getMaxCount,
    getItems, 
    getAddItems, 
    searchItems, 
    searchMore, 
    process,
    setProcess,
    downloadProcess,
    setDownloadProcess }) => {
        
    const [items, setItems] = useState();
    
    let offset = useRef(0);
    let maxCount = useRef();
    const itemsRendered = items ? items.length : 0;
    let searchCount = useRef();

    useEffect(() => {
        getMaxCount()
        .then(result => { 
            maxCount.current = result 
        })
        .then(loadItems)
        console.log('itemsList mounted');
    }, []);

    useEffect(() => {
        if (searchValue && maxCount.current >= 0) {
            searchItem();
            console.log('itemsList searching');
        }
        if (searchValue === ''  && maxCount.current >= 0) {
            loadItems();
        }
    }, [ searchValue ])

    console.log(`renderItemsList, itemsRendered: ${itemsRendered}, offset: ${offset.current}`);
    
    const loadItems = () => {
        const count = getTargetCount();
        offset.current = getRandomItemsOffset();

       getItems(count, offset.current)
        .then(result => {
            setItems(result);
        })
        .then(() => {
            setProcess('view');
            setDownloadProcess('view');
        });
    }

    const searchItem = () => {
        const count = getTargetCount();
        offset.current = 0;

       searchItems(searchValue, count, offset.current)
       .then(result => {
            searchCount.current = result.count; 
            setItems(result.data);
        })
       .then(()=> {
            setProcess('view');
            if(searchCount.current <= count) {
                setDownloadProcess('unmount');
            } else {
                setDownloadProcess('view');
            }
       });
    }
    
    const getTargetCount = () => {
        return document.documentElement.clientWidth >= 992 ? big : small;
    }

    const getRandomItemsOffset = () => {
        if(maxCount.current === 0)
            return 0
        return getRandNum(1, (maxCount.current - 1) - (getTargetCount() * 5));
    }

    function onLoadMore () {
        const count = getTargetCount();

        if(itemsRendered + count >= maxCount.current) {
            getAddItems(count, (offset.current + count))
            .then((result) => { addItems(result) })
            .then(() => {setDownloadProcess('unmount')});

            return undefined;
        }

        if(offset.current + (count * 2) > maxCount.current) {
            const diff = (maxCount.current) - (offset.current + count);
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
            })
            .then(() => { setDownloadProcess('view') });
        }
        else {
            offset.current += count;

            getAddItems(count, offset.current)
            .then(result => { addItems(result) })
            .then(() => { setDownloadProcess('view')});
        }
    }

    function onLoadMoreSearchResults() {
        const count = getTargetCount();

        if((itemsRendered + count) >= searchCount.current) {
            searchMore(searchValue, count, (offset.current + count))
            .then(result => { addItems(result.data) })
            .then(() => { setDownloadProcess('unmount')});

            return undefined;
        }

        offset.current += count;

        searchMore(searchValue, count, offset.current)
        .then(result => { addItems(result.data) })
        .then(() => { setDownloadProcess('view') });
    }

    const addItems = (addItems) => {
        setItems(() => ([...items, ...addItems]));
    }

    const addItemsFromParts = (part1, part2) => {
        setItems(() => ([...items, ...part1, ...part2]));
    }

    return (
        <Section>
            <ListStyleComponent>
                {setContent(process, View, {
                    items: items,
                    onOpenItem: onOpenItem,
                    onCloseItemMobile: onCloseItemMobile,
                    activeItem: activeItem,
                    ItemComponent: ItemComponent
                })}
            </ListStyleComponent>
            { setContent(downloadProcess, WideButtonBottom, {children: 'Load more', onClick: searchValue && searchValue !== '' ? onLoadMoreSearchResults : onLoadMore}) }
        </Section>
    );
}



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