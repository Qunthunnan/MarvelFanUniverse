import { CharactersListSC, DetailedWrapper, TextWrapper, AsideLink, ImgWrapper } from "./stylesComicsDetailed";
import { Link } from "react-router-dom";
import { ItemsList } from "../CharacterInfo/stylesCharacterInfo";
import { isFindThumbnail } from "../../utils/isFindThumbnail";
import { ListDataWrapper, LoadMoreBtn } from "../CharacterDetailed/stylesCharacterDetailed";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { InfoList } from "../InfoList/InfoList";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Helmet } from "react-helmet";
import '../style/detailed-transition.css';

export default function ComicsDetailed ({title, thumbnail, description, pageCount, prices, listData, maxCount, id }) {
    const [animation, setAnimation] = useState(false);
    const wrapperRef = useRef();

    useEffect(() => {
        setTimeout(setAnimation(true), 50);
    }, [])

    return (
        <>
            <Helmet>
                <title>{ title } on Marvel Fan Universe</title>
                <meta name="description" content={ description && description.length > 0 ? description : `Learn more about ${title} on the Marvel Fan Universe` } />
                <meta property="og:image" content={thumbnail}/>
            </Helmet>
            <CSSTransition
                nodeRef={wrapperRef}
                classNames={'detailed-fade'}
                timeout={300}
                in={ animation }>
            <DetailedWrapper style={ { opacity: animation ? null : 0 } }  ref={wrapperRef}>
                <ImgWrapper>
                    <Link to="/comics">To all comics</Link>
                    <img style={{ 
                    objectFit: isFindThumbnail(thumbnail.path) ? 'inherit' : 'cover',
                    objectPosition: isFindThumbnail(thumbnail.path) ? 'inherit' : 'left'
                    }} 
                    height={450} 
                    width={293} 
                    src={`${thumbnail.path}.${thumbnail.extension}`} 
                    alt={'comics ' + title} />
                </ImgWrapper>
                <TextWrapper>
                    <h2>{title}</h2>
                    <p>{ description && description.length > 0 ? description : <>The data source does not have detailed information about this comics. Try visiting <a target="_blank" rel="noreferrer" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>}</p>

                    {pageCount && pageCount > 0 ? <p>{pageCount} pages</p> : null}

                    <span>Printed edition: {prices[0] && prices[0].price > 0 ? `${prices[0].price} $` : 'NOT AVAILABLE'}</span>
                    <span>Digital edition: {prices[1] && prices[1].price > 0 ? `${prices[1].price} $` : 'NOT AVAILABLE'}</span>
                    <CharactersList charactersList={listData}
                                maxCount={maxCount}
                                id={id}
                                />
                </TextWrapper>
                <AsideLink>
                    <Link to="/comics">To all comics</Link>
                </AsideLink>
            </DetailedWrapper>
        </CSSTransition>
        </>
    )
}

function CharactersList ({charactersList, maxCount, id}) {
    const { process, 
            setProcess, 
            getCharactersByComicsId,
            searchCharactersByComicsId,
        } = useMarvelService();

    const { process: addProcess, 
            setProcess: setAddProcess, 
            getCharactersByComicsId: getAddCharacters,
            searchCharactersByComicsId: searchMore
     } = useMarvelService();

    if(charactersList?.length) {
        return (
            <CharactersListSC>
                <h2>Related characters:</h2>
                
                <InfoList ListSC= { ItemsList } 
                          ContentWrapperSC = { ListDataWrapper }
                          ItemChildren={ ListItemChildren }
                          LoadButtonSC={ LoadMoreBtn }
                          targetsCount= {{small: 20, big: 20}}
                          getItems = { (count, offset) => (getCharactersByComicsId(id, count, offset)) }
                          getMaxCount={ () => (new Promise((resolve) => (resolve(maxCount)))) }
                          getAddItems = { (count, offset) => (getAddCharacters(id, count, offset)) }
                          searchItems= { (searchValue, count, offset ) => (searchCharactersByComicsId(id, searchValue, count, offset )) }
                          searchMore= { (searchValue, count, offset) => (searchMore(id, searchValue, count, offset)) }
                          process= { process }
                          setProcess= { setProcess }
                          downloadProcess= { addProcess }
                          setDownloadProcess= { setAddProcess } 
                          listState= {[{
                                items: charactersList,
                                offset: 0,
                                maxCount: maxCount,
                          }]} />
            </CharactersListSC>
        )
    }
    return null
}

export function ListItemChildren ({item}) {
    return (
        <Link to={`/characters/${item.id}`}>{item.name}</Link>
    )
}