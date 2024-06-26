import { CharactersListSC, DetailedWrapper, TextWrapper, AsideLink, ImgWrapper } from "./stylesComicsDetailed";
import { Link } from "react-router-dom";
import { ItemsList } from "../CharacterInfo/stylesCharacterInfo";
import { isFindThumbnail } from "../../utils/isFindThumbnail";
import { ListDataWrapper, LoadMoreBtn } from "../CharacterDetailed/stylesCharacterDetailed";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { InfoList } from "../InfoList/InfoList";


export const ComicsDetailed = ({title, thumbnail, description, pageCount, prices, listData, maxCount, id }) => {
    return (
        <DetailedWrapper>
            <ImgWrapper>
                <Link to="/comics">Back to all</Link>
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
                <p>{ description && description.length > 0 ? description : <>The data source does not have detailed information about this comics. Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>}</p>

                {pageCount && pageCount > 0 ? <p>{pageCount} pages</p> : null}

                <span>Printed edition: {prices[0] && prices[0].price > 0 ? `${prices[0].price} $` : 'NOT AVAILABLE'}</span>
                <span>Digital edition: {prices[1] && prices[1].price > 0 ? `${prices[1].price} $` : 'NOT AVAILABLE'}</span>
                <CharactersList charactersList={listData}
                               maxCount={maxCount}
                               id={id}
                               />
            </TextWrapper>
            <AsideLink>
                <Link to="/comics">Back to all</Link>
            </AsideLink>
        </DetailedWrapper>
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
                          getAddItems = { (count, offset) => (getAddCharacters(id, count, offset)) }
                          searchItems= { (searchValue, count, offset ) => (searchCharactersByComicsId(id, searchValue, count, offset )) }
                          searchMore= { (searchValue, count, offset) => (searchMore(id, searchValue, count, offset)) }
                          process= { process }
                          setProcess= { setProcess }
                          downloadProcess= { addProcess }
                          setDownloadProcess= { setAddProcess } 
                          listContext= {[{
                            comicsDetailed: {
                                items: charactersList,
                                offset: 0,
                                maxCount: maxCount,
                            }
                          }, ()=>{}, 'comicsDetailed']}  />
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