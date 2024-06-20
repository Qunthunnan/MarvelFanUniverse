import { useEffect, memo } from 'react';
import { CharacterItem, CardBg } from './stylesCharacterCard';
import { isFindThumbnail } from '../../utils/isFindThumbnail';

export const CharacterCard = memo(({ item: { name, thumbnail }, onOpen, isActive }) => {

    useEffect(() => {
        console.log(`character card ${name} render`);
    });

    useEffect(() => {
        console.log(`character card ${name} mounted`);
        return () => {
            console.log(`character card ${name} unmounted`);
        }
    }, []);

    function cutName(name) {
        if(name.length >= 15) {
            return name.slice(0, 15) + '...';
        }
        return name;
    }

    function onFocusClick (e) {
        if(e.key === 'Enter' || e.key === ' ') {
            onOpen();
        }
    }

    return(
        <CharacterItem onKeyDown={onFocusClick} tabIndex={0} onClick={ onOpen } title={name} $active={isActive}>
            <img height={200} width={200} style={{objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'fill'}} src={thumbnail.path + '.' + thumbnail.extension} alt={`character ${name}`} />
            <CardBg>
                <h2>{cutName(name)}</h2>
            </CardBg>
        </CharacterItem>
    )
});