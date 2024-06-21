import { TextWrapper, DetailedWrapper } from './stylesCharacterDetailed';
import { ItemsList } from '../CharacterInfo/stylesCharacterInfo';
import { isFindThumbnail } from '../../utils/isFindThumbnail';
import { InfoList } from "../InfoList/InfoList";
import { useMarvelService } from "../../services/ApiService/ApiService"
import { Link } from 'react-router-dom';

export const CharacterDetailed = ({ name, description, thumbnail, listData, searchParams: {searchValue, inputValue, searchError, onInput, searchAction}, id}) => {

    return (
        <DetailedWrapper>
            <img height={293} width={293} style={ { objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'contain' }} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
            <TextWrapper>
                <h2>{name}</h2>
                <p>{ description && description.length > 0 ? description : <>The data source does not have detailed information about this character. Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>}</p>

                <ComicsList comicsList={listData} onInput={ onInput } inputValue={ inputValue } searchValue = { searchValue } searchAction={searchAction} searchError = { searchError } id={ id } />
            </TextWrapper>
            <Link to="/">Back to all</Link>
        </DetailedWrapper>
    )
}

function ComicsList ({comicsList, onInput, inputValue, searchError, searchValue, searchAction, id}) {
    const { process, 
            setProcess, 
            getComicses,
            searchComicsByCharacterId,
        } = useMarvelService();

    const { process: addProcess, 
        setProcess: setAddProcess, 
        getComicses: getAddComicses,
        searchComicsByCharacterId: searchMore
     } = useMarvelService();

    if(comicsList?.length) {
        return (
            <>
                <h3>Comics: </h3>
                <form onSubmit={searchAction}>
                    <input id='search' type="text" value={ inputValue } onChange={onInput} />
                    <label htmlFor="search">{ searchError ? 'Iccorect search value' : null}</label>
                </form>
                
                <InfoList ItemComponent={ListItem}
                          ListStyleComponent={ItemsList} 
                          targetsCount= {{small: 20, big: 20}}
                          searchValue= {searchValue}
                          getMaxCount={ () => {
                            return new Promise((resolve)=>{
                                return resolve(0);
                            })}}
                          getItems = { getComicses }
                          getAddItems = { getAddComicses }
                          searchItems= { (searchValue, count, offset ) => {
                            return searchComicsByCharacterId(id, searchValue, count, offset );
                          } }
                          searchMore= { (searchValue, count, offset) => {
                            return searchMore(id, searchValue, count, offset);
                          } }
                          process= { process }
                          setProcess= { setProcess }
                          downloadProcess= { addProcess }
                          setDownloadProcess= { setAddProcess } />
            </>

        )
    }
    return null
}

export function ListItem ({item}) {
    return (
        <li key={item.id}><Link to={`/comics/${item.id}`}>{item.title}</Link></li>
    )
}