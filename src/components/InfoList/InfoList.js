import { useEffect, useRef, useState, memo } from "react";
import { Section } from "../CharactersList/stylesCharacterList";
import { getRandNum } from "../../utils/randomValues";
import { vars } from "../style/Vars";
import { setContent } from "../../utils/setContent";
import { onFocusClick } from "../../utils/onFocusClick";
import styled from "styled-components";

export const InfoList = ({ 
    ItemSC = styled.li``,
    ItemChildren, 
    ListSC = styled.ul``,
    LoadButtonSC = styled.button``,
    ContentWrapperSC = styled.div``,
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
    setDownloadProcess,
    dataOnMount }) => {
        
    const [items, setItems] = useState();
    
    let offset = useRef(0);
    let maxCount = useRef();
    const itemsRendered = items ? items.length : 0;
    let searchCount = useRef();

    useEffect(() => {
        if( !(dataOnMount?.maxCount || dataOnMount?.maxCount >= 0) ) {
            getMaxCount()
            .then(result => { 
                maxCount.current = result;
            })
            .then(loadItems)
        } else
            loadItems();

        
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
        if( (dataOnMount?.items) && (dataOnMount?.offset || dataOnMount?.offset >= 0) && (dataOnMount?.maxCount || dataOnMount?.maxCount >= 0) ) {
            offset.current = dataOnMount.offset;
            maxCount.current = dataOnMount.maxCount;
            setItems(dataOnMount.items);
            setProcess('view');

            if(maxCount.current <= dataOnMount.items.length ) 
                setDownloadProcess('unmount');
            else
                setDownloadProcess('view');
        } else {
            const count = getTargetCount();
            offset.current = getRandomItemsOffset();
    
           getItems(count, offset.current)
            .then(({data}) => {
                setItems(data);
                return data.length;
            })
            .then((itemsCount) => {
                setProcess('view');

                if(maxCount.current <= itemsCount ) 
                    setDownloadProcess('unmount');
                else
                    setDownloadProcess('view');
            });
        }
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
            .then(({data}) => { addItems(data) })
            .then(() => {setDownloadProcess('unmount')});

            return undefined;
        }

        if(offset.current + (count * 2) > maxCount.current) {
            const diff = (maxCount.current) - (offset.current + count);
            let part1 = [];

            getAddItems((diff + 1), offset.current + count)
            .then(({data}) => {
                part1 = data;
                offset.current = 0;
                return getAddItems((count - diff), offset.current);
            })
            .then(({data}) => {
                offset.current -= diff;
                addItemsFromParts(part1, data);
            })
            .then(() => { setDownloadProcess('view') });
        }
        else {
            offset.current += count;

            getAddItems(count, offset.current)
            .then(({data}) => { addItems(data) })
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
        <ContentWrapperSC>
            <ListSC>
                {setContent(process, View, {
                    items: items,
                    onOpenItem: onOpenItem,
                    onCloseItemMobile: onCloseItemMobile,
                    activeItem: activeItem,
                    ItemSC: ItemSC,
                    ItemChildren: ItemChildren
                })}
            </ListSC>
            { setContent(downloadProcess, LoadButtonSC, {children: 'Load more', onClick: searchValue && searchValue !== '' ? onLoadMoreSearchResults : onLoadMore}) }
        </ContentWrapperSC>
    );
}



const View = memo(({items, onOpenItem, onCloseItemMobile, activeItem, ItemSC, ItemChildren}) => {
    if(items.length === 0) {
        return (<p style={{color: vars.marvelRed, fontSize: '24px'}}>Data not found</p>)
    }
    return(
        <>
            { items.map((item, i) => (
                 <ItemSC 
                    tabindex= {0}
                    isActive={(activeItem && activeItem.id === item.id) ? true : false} 
                    onCloseItemMobile={ onCloseItemMobile } 
                    onKeyPress = { (e) => {onFocusClick(e, () => {onOpenItem(item)})} }
                    onClick={ onOpenItem ? () => { onOpenItem( item ) } : null }
                    key={i} 
                    >
                        <ItemChildren item={item}/> 
                    </ItemSC>
            )) } 
        </>
        )
});