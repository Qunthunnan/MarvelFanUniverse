import { ComicsItem } from "./stylesComicsCard";

export function ComicsCard ({item: {thumbnail, title, prices}}) {
   
    const priceItem = prices[0].price ? <span>{prices[0].price}$</span> : <span>NOT AVAILABLE</span>;
    return ( 
    <ComicsItem>
        <img height={346} width={225} src={`${thumbnail.path}.${thumbnail.extension}`} alt={'comics' + title}  />
        <h3>{title}</h3>
        {priceItem}
    </ComicsItem>   
    );
}