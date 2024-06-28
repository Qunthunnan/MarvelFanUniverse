import { useEffect, useRef, useState, memo, createRef } from "react";
import { Section } from "../CharactersList/stylesCharacterList";
import { getRandNum } from "../../utils/randomValues";
import { vars } from "../style/Vars";
import { setContent } from "../../utils/setContent";
import { onFocusClick } from "../../utils/onFocusClick";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useList } from "../../hooks/useList";
import './transitions.css';

export const InfoList = ({ 
    ItemSC = styled.li``,
    ItemChildren, 
    ListSC = styled.ul``,
    LoadButtonSC = styled.button``,
    ContentWrapperSC = styled.div``,
    targetsCount: { small, big }, 
    onOpenItem, 
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
    tabIndexOnLi,
    isRandomOffset,
    order,
    listContext }) => {
    const [items, setItems] = useState();

    const [listState, setListState, type] = listContext ? listContext : [];

    const {[type]: currentListState } = listState;
    
    let offset = useRef();
    let maxCount = useRef();
    const itemsRendered = items ? items.length : 0;
    let searchCount = useRef();
    const dataOnMountMounted = useRef(false);
    const prevOrder = useRef(order);
    const prevIsRandomOffset = useRef(isRandomOffset);
    const itemsLoaded = useRef(false);
    const searchRef = useRef(searchValue);

    const scrollPosition = useRef();

    useEffect(() => {
        if( !(currentListState?.maxCount || currentListState?.maxCount >= 0) ) {
            getMaxCount()
            .then(result => { 
                maxCount.current = result;
            })
            .then(loadItems)
        } else
            loadItems();
        
        console.log('itemsList mounted');

        document.addEventListener('scroll', onScrolling);

        return () => {
            document.removeEventListener('scroll', onScrolling);

            if ( listState ) {

                setListState((prevState) => {
                    const newState = {}
                    Object.assign(newState, prevState);
                    newState[type] = {
                        items: prevState[type]?.items,
                        offset: offset.current,
                        maxCount: maxCount.current,
                        searchCount: searchCount.current,
                        searchValue: searchRef.current,
                        order: order,
                        isRandomOffset: isRandomOffset,
                        scrollY: scrollPosition.current
                    }

                    return newState;
                });
                    
            }
        }
    }, []);

    useEffect(() => {
        if ( listState ) {
            if(itemsLoaded.current === false && items?.length > 0) {
                window.scrollTo({top: currentListState?.scrollY, behavior: 'instant'});
                itemsLoaded.current = true;
            }

            if(items?.length > 0) {
                setListState((prevState) => {
                    const newState = {}
                    Object.assign(newState, prevState);
                    newState[type] = {
                        items: items,
                        offset: offset.current,
                        maxCount: maxCount.current,
                        searchCount: searchCount.current,
                        searchValue: searchRef.current,
                        order: order,
                        isRandomOffset: isRandomOffset,
                        scrollY: scrollPosition.current
                    }
                    return newState;
                });
            }
        }
    }, [items])

    useEffect(() => {
        if (searchValue && maxCount.current >= 0 && itemsLoaded.current) {
            searchItem();
            console.log('itemsList searching');
        }
        if (searchValue === '' && maxCount.current >= 0) {
            loadItems();
        }
        searchRef.current = searchValue;
    }, [ searchValue ]);

    useEffect(() => {
        if(prevOrder.current !== order || prevIsRandomOffset.current !== isRandomOffset) {
            prevOrder.current = order;
            prevIsRandomOffset.current = isRandomOffset;
            if(maxCount.current >= 0) {
                if(searchValue) {
                    searchItem();
                } else {
                    loadItems();
                }
            }
        }
    }, [order, isRandomOffset]);

    console.log(`renderItemsList, itemsRendered: ${itemsRendered}, offset: ${offset.current}`);

    const onScrolling = (e) => {
        scrollPosition.current = window.scrollY;
    }
    
    const loadItems = () => {
        if( (currentListState?.items && currentListState?.items.length > 0 || currentListState?.renderZero) && (currentListState?.offset || currentListState?.offset >= 0) && (currentListState?.maxCount || currentListState?.maxCount >= 0) && !dataOnMountMounted.current ) {
            offset.current = currentListState.offset;
            maxCount.current = currentListState.maxCount;
            searchValue = currentListState.searchValue;
            searchCount.current = currentListState.searchCount;
            setItems(currentListState.items);
            setProcess('view');
            dataOnMountMounted.current = true;

            if(searchCount.current) {
                if(searchCount.current <= currentListState.items.length )
                    setDownloadProcess('unmount')
                else
                    setDownloadProcess('view');
            } else if(maxCount.current <= currentListState.items.length ) 
                        setDownloadProcess('unmount');
                    else
                        setDownloadProcess('view');

        } else {
            const count = getTargetCount();
            offset.current = isRandomOffset ? getRandomItemsOffset() : 0;
    
           getItems(count, offset.current, order)
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

       searchItems(searchValue, count, offset.current, order)
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
        return getRandNum(1, (maxCount.current || currentListState.maxCount - 1) - (getTargetCount() * 5));
    }

    function onLoadMore () {
        const count = getTargetCount();

        if(itemsRendered + count >= maxCount.current) {
            getAddItems(count, (offset.current + count), order)
            .then(({data}) => { addItems(data) })
            .then(() => {setDownloadProcess('unmount')});

            return undefined;
        }

        if(offset.current + (count * 2) > maxCount.current) {
            const diff = (maxCount.current) - (offset.current + count);
            let part1 = [];

            getAddItems((diff + 1), offset.current + count, order)
            .then(({data}) => {
                part1 = data;
                offset.current = 0;
                return getAddItems((count - diff), offset.current, order);
            })
            .then(({data}) => {
                offset.current -= diff;
                addItemsFromParts(part1, data);
            })
            .then(() => { setDownloadProcess('view') });
        }
        else {
            offset.current += count;

            getAddItems(count, offset.current, order)
            .then(({data}) => { addItems(data) })
            .then(() => { setDownloadProcess('view')});
        }
    }

    function onLoadMoreSearchResults() {
        const count = getTargetCount();

        if((itemsRendered + count) >= searchCount.current) {
            searchMore(searchValue, count, (offset.current + count), order)
            .then(result => { addItems(result.data) })
            .then(() => { setDownloadProcess('unmount')});

            return undefined;
        }

        offset.current += count;

        searchMore(searchValue, count, offset.current, order)
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
                    activeItem: activeItem,
                    ItemSC: ItemSC,
                    ItemChildren: ItemChildren,
                    tabIndexOnLi: tabIndexOnLi
                })}
            </ListSC>
            { setContent(downloadProcess, LoadButtonSC, {children: 'Load more', onClick: searchValue && searchValue !== '' ? onLoadMoreSearchResults : onLoadMore}) }
        </ContentWrapperSC>
    );
}




const View = memo(({items, onOpenItem, activeItem, ItemSC, ItemChildren, tabIndexOnLi}) => {
    if(items.length === 0) {
        return (<p style={{color: vars.marvelRed, fontSize: '24px'}}>Data not found</p>)
    }
    return(
        <TransitionGroup component={null}>
            { items.map((item, i) => {
                const ref = createRef(null);
                return (
                <CSSTransition
                    key={i} 
                    nodeRef={ref}
                    timeout={500}
                    classNames={'add-item'}
                >
                    <ItemSC
                        ref={ref} 
                        tabIndex= { tabIndexOnLi ? 0 : 'none'}
                        $isActive={(activeItem && activeItem.id === item.id) ? true : false} 
                        onKeyPress = { (e) => {onFocusClick(e, () => {onOpenItem(item)})} }
                        onClick={ onOpenItem ? () => { onOpenItem( item ) } : null }
                        >
                            <ItemChildren item={item}/> 
                    </ItemSC>
                </CSSTransition>
                )
            }) } 
        </TransitionGroup>    
        )
});