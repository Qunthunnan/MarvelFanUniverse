import { Component } from "react";
import styled from "styled-components";
import { vars } from "../style/Vars";

export class ComicsDetailed extends Component {
    render () {
        const { name, description, image, pages, lang, price, margin } = this.props;

        const DetailedWrapper = styled.section`
            display: flex;
            column-gap: 53px;
            margin: ${({margin}) => ( margin ? margin : '')};
            align-items: flex-start;
            a {
                color: #000;
                font-size: 18px;
                font-weight: 700;
                text-decoration: none;
                &:hover {
                    color: ${ vars.marvelRed }
                }
            }
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
            span {
                display: block;
                color: ${vars.marvelRed};
                font-size: 24px;
                font-weight: 700;
                margin: 26px 0 0 0;
            }
        `;
        return (
            <DetailedWrapper margin={margin}>
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