import styled from "styled-components";
import { vars } from "./Vars";

const Button = styled.a`
    cursor: pointer;
    display: block;
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 3px;
    font-size: 14px;
    font-weight: 400;
    height: 38px;
    width: ${ ({width}) => (width ? width : '101px')  };
    margin: ${ ({margin}) => (margin ? margin : '0')  };
    background-color: ${ ({color}) => (color ? color : vars.marvelRed)   };
    transition: 0.3s background-color box-shadow;
    position: relative;
    a {
        color: inherit;
        text-decoration: inherit;
    }
    clip-path: polygon(11% 0, 100% 0, 100% 75%, 89% 100%, 25% 100%, 0 100%, 0 28%);
    &:focus {
        outline-width: 4px;
        outline-offset: 3px;
        outline-color: #000;
        outline-style: solid;
    }
    &:active {
        background-color: ${vars.marvelGray};
    }
`;


export {Button};