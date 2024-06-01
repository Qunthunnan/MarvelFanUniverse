import { Component } from "react";
import { DetailedWrapper, TextWrapper } from "./stylesComicsDetailed";

export class ComicsDetailed extends Component {
    render () {
        const { name, description, image, pages, lang, price } = this.props;

        return (
            <DetailedWrapper>
                <img height={450} width={293} src={image} alt={'comics ' + name} />
                <TextWrapper>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>{pages} pages</p>
                    <p>Language: {lang}</p>
                    <span>{price ? price : 'NOT AVAILABLE'}$</span>
                </TextWrapper>
                <a href="#">Back to all</a>
            </DetailedWrapper>
        )
    }
}