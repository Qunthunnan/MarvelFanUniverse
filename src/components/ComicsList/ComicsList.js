import { Component } from "react";

import { ComicsCard } from "../ComicsCard/ComicsCard";
import { WideButton } from "../style/WideButton";
import { List } from "./stylesComicsList";

export class ComicsList extends Component {
    render() {
        const { comicses } = this.props;

        const comicsesListItems = comicses.map(({name, image, price}, i) => ( <ComicsCard key={i} name={ name } image={ image } price={price}></ComicsCard> ));
        return (
        <section>
            <List>
                {[...comicsesListItems]}
            </List>
            <WideButton margin={'45px auto 0'}>LOAD MORE</WideButton>
        </section>
        );
    }
}