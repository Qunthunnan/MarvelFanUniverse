import { Component } from "react";
import { ComicsItem } from "./stylesComicsCard";

function ComicsCard ({image, name, price}) {
   
    const priceItem = price ? <span>{price}$</span> : <span>NOT AVAILABLE</span>;
    return ( 
    <ComicsItem>
        <img height={346} width={225} src={image} alt={'comics' + name}  />
        <h3>{name}</h3>
        {priceItem}
    </ComicsItem>   
    );
}