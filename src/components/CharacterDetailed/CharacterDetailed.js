import { Component } from "react";
import { TextWrapper, DetailedWrapper } from './stylesCharacterDetailed.js';

export class CharacterDetailed extends Component {
    render () {
        const { name, description, image } = this.props;

        return (
            <DetailedWrapper>
                <img height={293} width={293} src={image} alt={name} />
                <TextWrapper>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </TextWrapper>
                <a href="#">Back to all</a>
            </DetailedWrapper>
        )
    }
}