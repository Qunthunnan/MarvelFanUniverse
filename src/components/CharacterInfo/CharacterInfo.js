import { memo, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "../style/Button";
import { CloseBtn } from "../style/CloseBtn";
import { InfoWrapper, HeadInfo, SideHead, SkeletonSvg, ButtonWrap } from "./stylesCharacterInfo";
import { parseComicsId } from "../../utils/parseComicsId";
import { ItemsList } from "./stylesCharacterInfo";
import { Link } from "react-router-dom";
import './transitions.css';

export const CharacterInfo = memo(({ character, onCloseMobileCharacterInfo }) => {
    
    const content = character ? <ContentWithCharacter character={character}/> : <EmptyCharacter/>;

    return (
    <InfoWrapper $mobileActive={ character }>
        <CloseBtn onClick={ onCloseMobileCharacterInfo }>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
        </CloseBtn>
        {content}
    </InfoWrapper>
    )
});

const EmptyCharacter = () => {
    return (
        <>
            <h2>Please select a character to see information</h2>
            <SkeletonSvg width="375" height="190" viewBox="0 0 375 190" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#C4C4C4"/>
                <rect x="49" y="12" width="326" height="16" fill="#C4C4C4"/>
                <rect y="55" width="375" height="35" fill="#C4C4C4"/>
                <rect y="105" width="375" height="35" fill="#C4C4C4"/>
                <rect y="155" width="375" height="35" fill="#C4C4C4"/>
            </SkeletonSvg>
        </>
    );
}

const ContentWithCharacter = ({character: {name, thumbnail, description, id, comics:{items}}}) => {
    const comicsList = items.length ? 
        <ItemsList>{   items.map( (comics, i) => (
             <li key={i}>
                <Link to={`../comics/${ parseComicsId(comics.resourceURI) }`}>{comics.name}</Link>
            </li> ))}
        </ItemsList> 
    : <>
        <p>The data source does not have detailed information about comicses with this character.</p>
        <p>Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about this.</p>
    </> ;

    const descriptionBlock = description && description.length > 0 ? description : <>The data source does not have detailed information about this character. Try visiting <a target="_blank" href="https://www.marvel.com/">https://www.marvel.com/</a> to learn more about him.</>;
    const thumbnailPos = isFindThumbnail(thumbnail);
    const headRef = useRef();

    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        setAnimation(() => (!animation));
    }, [name])

  
    return (
        
        <CSSTransition 
        ref={ headRef }
        in={ animation }
        classNames={ 'char-info-fade' }
        timeout={ 100 }>
            <div ref={headRef}>
                <HeadInfo>
                    <img height={150} width={150} style={{objectFit: thumbnailPos ? 'cover' : 'contain'}} src={thumbnail.path + '.' + thumbnail.extension} alt={"character" + name}/>
                    <SideHead>
                        <h2>{name}</h2>
                        <ButtonWrap>
                            <Button as={'div'}><Link to={`../characters/${id}`}>HOMEPAGE</Link></Button>
                        </ButtonWrap>
                    </SideHead>
                </HeadInfo>
                <p>{ descriptionBlock }</p>
                <div>
                    <h3>Comics:</h3>
                    {comicsList}
                </div>
            </div>

    

        </CSSTransition>

    
    )

    function isFindThumbnail(thumbnail) {
        let findThumbNail = true;
        if(thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708")
            findThumbNail = false;

        return findThumbNail;
    }
}