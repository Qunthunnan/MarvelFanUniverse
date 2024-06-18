import { Link } from "react-router-dom";
import { isFindThumbnail } from "../../utils/isFindThumbnail";
import { ComicsItem } from "./stylesComicsCard";

export function ComicsCard ({item: {thumbnail, id, title, prices}}) {
    let [printedPrice, digitalPrice] = prices;
    const isNoPrice = !(printedPrice?.price || digitalPrice?.price);
    printedPrice = printedPrice?.price ? `PE: ${printedPrice?.price} $ ` : '';
    digitalPrice = digitalPrice?.price ? `DE: ${digitalPrice?.price} $` : '';

    const priceItem = (
        <span>{isNoPrice ? 'NOT AVAILABLE' : `${printedPrice} ${digitalPrice}` }</span>
    )

    return ( 
    <ComicsItem>
        <Link to={`${id}`}>
            <img height={346} width={225} style={{ 
                objectFit: isFindThumbnail(thumbnail.path) ? 'inherit' : 'cover',
                objectPosition: isFindThumbnail(thumbnail.path) ? 'inherit' : 'left'
            }} src={`${thumbnail.path}.${thumbnail.extension}`} alt={'comics' + title}  />
            <h3>{title}</h3>
            {priceItem}
        </Link>
    </ComicsItem>
    );
}