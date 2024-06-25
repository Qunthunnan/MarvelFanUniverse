import { TextWrapper, AsideLink, ImgWrapper, DetailedWrapper, ListDataWrapper, LoadMoreBtn, SearchForm } from './stylesCharacterDetailed';
import { ItemsList } from '../CharacterInfo/stylesCharacterInfo';
import { isFindThumbnail } from '../../utils/isFindThumbnail';
import { InfoList } from "../InfoList/InfoList";
import { useMarvelService } from "../../services/ApiService/ApiService";
import { Link } from 'react-router-dom';
import SearchIcon from '../SearchIcon/SearchIcon.js';
import { SortDetailedWrapper } from '../SortList/stylesSortList.js';
import { SortList } from '../SortList/SortList.js';
import { useState } from 'react';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary.js';

export const CharacterDetailed = ({ name, description, thumbnail, listData, maxCount, searchParams: {searchValue, inputValue, searchError, onInput, searchAction}, id}) => {
    
    return (
        <ErrorBoundary>
            <DetailedWrapper>
                <ImgWrapper>
                    <Link to="/">Back to all</Link>
                    <img height={293} width={293} style={ { objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'contain' }} src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
                </ ImgWrapper>

                <TextWrapper>
                    <h2>{name}</h2>
                    <p>{ description && description.length > 0 ? description : <>The data source does not have detailed information about this character. Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>}</p>

                    <ComicsList comicsList={listData} name={name} maxCount={maxCount} onInput={ onInput } inputValue={ inputValue } searchValue = { searchValue } searchAction={searchAction} searchError = { searchError } id={ id } />
                </TextWrapper>
                <AsideLink>
                    <Link to="/">Back to all</Link>
                </AsideLink>
            </DetailedWrapper>
        </ErrorBoundary>
    )
}

function ComicsList ({comicsList, name, maxCount, onInput, inputValue, searchError, searchValue, searchAction, id}) {
    const { process, 
            setProcess, 
            getComicsByCharacterId,
            searchComicsByCharacterId,
        } = useMarvelService();

    const { process: addProcess, 
        setProcess: setAddProcess, 
        getComicsByCharacterId: getAddComicses,
        searchComicsByCharacterId: searchMore
     } = useMarvelService();

    const [randomOffset, setRandomOffset] = useState(true);
    const [comicsOrder, setcomicsOrder] = useState('-modified');

    const switchRandomOffset = () => {
		console.log(randomOffset, comicsOrder);
		setRandomOffset((prevOffset) => (
			!prevOffset
		));
	}

	const offRandomOffset = () => {
		console.log(randomOffset, comicsOrder);

		setRandomOffset(false);
	}

    const orders = [
        {
			name: 'New',
			value: '-onsaleDate',
			action: offRandomOffset
		},
		{
			name: 'Random',
			value: '-onsaleDate',
			action: switchRandomOffset
		},
		{
			name: 'By title A↓',
			value: 'title',
			action: offRandomOffset
		},
		{
			name: 'By title Z↓',
			value: '-title',
			action: offRandomOffset
		},
		{
			name: 'Old',
			value: 'onsaleDate',
			action: offRandomOffset,
		}
	]

    if(comicsList?.length) {
        return (
            <>
                <h3>Comics: </h3>
                { comicsList.length < maxCount ? ( 
                    <SearchForm onSubmit={searchAction}>
                        <div>
                            <input id='search' type="text" placeholder={`Search comics with ${name}`} value={ inputValue } onChange={onInput} />
                            <SearchIcon/>
                        </div>
                        <label htmlFor="search">{searchError ? 'Iccorect search value' : null}</label>
                    </SearchForm>) : null
                }
                
                <SortDetailedWrapper>
					<SortList orders={ orders } activeOrder={comicsOrder} setOrder={setcomicsOrder}/>
			    </SortDetailedWrapper>

                <InfoList ListSC= { ItemsList } 
                          ContentWrapperSC = { ListDataWrapper }
                          ItemChildren={ ListItemChildren }
                          LoadButtonSC={ LoadMoreBtn }
                          targetsCount= {{small: 20, big: 20}}
                          searchValue= {searchValue}
                          getItems = { (count, offset, order) => (getComicsByCharacterId(id, count, offset, order)) }
                          getAddItems = { (count, offset) => (getAddComicses(id, count, offset)) }
                          searchItems= { (searchValue, count, offset, order ) => (searchComicsByCharacterId(id, searchValue, count, offset, order )) }
                          searchMore= { (searchValue, count, offset, order) => (searchMore(id, searchValue, count, offset, order)) }
                          process= { process }
                          setProcess= { setProcess }
                          downloadProcess= { addProcess }
                          setDownloadProcess= { setAddProcess } 
                          dataOnMount= {{
                            items: comicsList,
                            offset: 0,
                            maxCount: maxCount
                          }} 
                          isRandomOffset={ randomOffset }
                          order={ comicsOrder }
                          />
            </>

        )
    }
    return null
}

export function ListItemChildren ({item}) {
    return (
        <Link to={`/comics/${item.id}`}>{item.title}</Link>
    )
}