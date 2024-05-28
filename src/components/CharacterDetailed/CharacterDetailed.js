import { Component } from "react";
import styled from "styled-components";

export class CharacterDetailed extends Component {
    render () {
        const { name, description, image, margin } = this.props;

        const DetailedWrapper = styled.section`
            display: flex;
            column-gap: 53px;
            margin: ${({margin}) => ( margin ? margin : '')};
        `;

        const TextWrapper = styled.div`
            max-width: 550px;
            h2 {
                font-size: 22px;
                font-weight: 700;
                margin: 0;
            }
            p {
                line-height: 22px;
                margin: 26px 0 0 0;
                font-size: 18px;
                font-weight: 400;
            }
        `;
        return (
            <DetailedWrapper margin={margin}>
                <img height={293} width={293} src={image} alt={name} />
                <TextWrapper>
                    <h2>{name}</h2>
                    <p>{description}</p>
                </TextWrapper>
            </DetailedWrapper>
        )
    }
}