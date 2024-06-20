import { TextWrapper, DetailedWrapper } from './stylesCharacterDetailed';
import { ItemsList } from '../CharacterInfo/stylesCharacterInfo';
import { isFindThumbnail } from '../../utils/isFindThumbnail';
import { InfoList } from "../InfoList/InfoList";
import { Link } from 'react-router-dom';

export const CharacterDetailed = ({ name, description, thumbnail, listData, searchParams: {searchValue, searchError, onInput, searchAction} }) => {

    return (
        <DetailedWrapper>
            <img height={293} width={293} style={ { objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'contain' }} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
            <TextWrapper>
                <h2>{name}</h2>
                <p>{ description && description.length > 0 ? description : <>The data source does not have detailed information about this character. Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>}</p>
                <ComicsList comicsList={listData} onInput={ onInput } value={ searchValue } searchAction={searchAction} searchError = { searchError } />
            </TextWrapper>
            <Link to="/">Back to all</Link>
        </DetailedWrapper>
    )
}

// function ComicsList ({comicsList, onInput, value, searchError, searchAction}) {
    

//     if(comicsList?.length) {
//         return (
//             <>
//                 <h3>Comics: </h3>
//                 <form action={searchAction}>
//                     <input id='search' type="text" value={ value } onChange={onInput} />
//                     <label htmlFor="search">{ searchError ? 'Iccorect search value' : null}</label>
//                 </form>
                
//                 <InfoList ItemComponent={ListItem}
//                           ListStyleComponent={ItemsList} 
//                           targetsCount= {{small: 20, big: 20}}
//                           searchValue= {value}
//                           getItems = {}
//                           getAddItems = {}
//                           searchItems= {}
//                           searchMore= {}
//                           process= {}
//                           setProcess= {}
//                           downloadProcess= {}
//                           setDownloadProcess= {} />

//                 <ItemsList>{
//                     comicsList.map(comics => ( <li>
//                         <Link to={`../comics/${comics.id}`}>{comics.title}</Link> 
//                         </li> ))
//                 }</ItemsList>
//             </>

//         )
//     }
//     return null
// }

export function ListItem (item) {
    return (
        <li>{item.name ? item.name : item.title}</li>
    )
}