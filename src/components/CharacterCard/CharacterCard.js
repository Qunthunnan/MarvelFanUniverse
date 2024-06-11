import { CharacterItem, CardBg } from './stylesCharacterCard';

export function CharacterCard ({ character: { name, thumbnail }, onOpenCharacter, isActive }) {

    function cutName(name) {
        if(name.length >= 15) {
            return name.slice(0, 15) + '...';
        }
        return name;
    }

    function isFindThumbnail(thumbnail) {
        return !(thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" || thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708")
    }

    function onFocusClick (e) {
        if(e.key === 'Enter' || e.key === ' ') {
            onOpenCharacter();
        }
    }

    return(
        <CharacterItem onKeyDown={onFocusClick} tabIndex={0} onClick={ onOpenCharacter } title={name} $active={isActive}>
            <img height={200} width={200} style={{objectFit: isFindThumbnail(thumbnail) ? 'cover' : 'fill'}} src={thumbnail.path + '.' + thumbnail.extension} alt={`character ${name}`} />
            <CardBg>
                <h2>{cutName(name)}</h2>
            </CardBg>
        </CharacterItem>
    )
}