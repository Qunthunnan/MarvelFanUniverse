import { Component } from "react";

import styled from "styled-components";

import { ComicsCard } from "../ComicsCard/ComicsCard";
import { WideButton } from "../style/WideButton";

export class ComicsList extends Component {
    render() {
        const { comicses } = this.props;
        const List = styled.ul`
            margin: 49px 0 0 0;
            display: grid;
            grid-auto-rows: auto;


            @media (min-width: 320px) {
                padding: 0;
                
			    grid-template: auto auto / auto auto;
                row-gap: 30px;
                justify-content: space-around;
            }

            @media (min-width: 576px) {
                row-gap: 40px;
                justify-content: space-between;
            }

            @media (min-width: 786px) {
                grid-template: auto auto / auto auto auto;
            }


            @media (min-width: 992px) {
                row-gap: 55px;
            }

            @media (min-width: 1200px) {
			    grid-template: auto auto / auto auto auto auto;
    
            }

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