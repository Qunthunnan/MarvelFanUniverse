import { Component, Fragment } from "react";
import styled from "styled-components";

import { vars } from "../style/Vars";

export class Directory extends Component {
    render() {
        const { active, list } = this.props; 

        const DirectorySpan = styled.a`
        font-size: 24px;
        font-weight: 700;
        color: ${ props => (props.active ? vars.marvelRed : '#000') };
        margin: 0 5px 0 0;
        text-decoration: none;
        &:last-child {
            margin: 0;
        }

        @media (max-width: 576px) {
            font-size: 18px;
            &:last-child {
                margin: 0 10px 0 0;
            }
        }
    `;

        const directories = list.map( (item, i) => {
        const slash = list[i + 1] ? <DirectorySpan key={i + 0.5}>/</DirectorySpan> : null;
        return (
            <Fragment key={i + 0.1}>
                <DirectorySpan href="#" key={i} active={ item === active ? 'true' : null }>{item}</DirectorySpan>
                {slash}
            </Fragment>
        ) });



        return (
             <nav>{directories}</nav>
        );
    }
}