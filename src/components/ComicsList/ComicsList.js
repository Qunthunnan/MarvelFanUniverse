import { Component } from "react";

import styled from "styled-components";

import { ComicsCard } from "../ComicsCard/ComicsCard";
import { WideButton } from "../style/WideButton";

export class ComicsList extends Component {
    render() {
        const { comicses } = this.props;
        const List = styled.ul`
            margin: 49px 0 0 0;
            padding: 0;
            display: grid;
			grid-template: auto auto / auto auto auto auto;
            grid-auto-rows: auto;
            row-gap: 55px;
            column-gap: 67px;
        `;

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