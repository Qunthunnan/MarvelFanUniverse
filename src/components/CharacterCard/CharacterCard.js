import { useEffect, memo } from 'react';
import { CharacterItem, CardBg } from './stylesCharacterCard';
import { isFindThumbnail } from '../../utils/isFindThumbnail';

export const CharacterCard = memo(({ item: { name, thumbnail } }) => {

    function cutName(name) {
        if(name.length >= 15) {
            return name.slice(0, 15) + '...';
        }
        return name;
    }

    return(
        <>
            <img title={name} height={200} width={200} style={{objectFit: isFindThumbnail(thumbnail.path) ? 'cover' : 'fill'}} src={thumbnail.path + '.' + thumbnail.extension} alt={`character ${name}`} />
            <CardBg>
                <h2>{cutName(name)}</h2>
            </CardBg>
        </>
    )
});