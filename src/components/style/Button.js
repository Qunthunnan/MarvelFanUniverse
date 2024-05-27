import styled from "styled-components";
import { vars } from "./Vars";

const Button = styled.button`
    display: block;
    color: white;
    position: relative;
    border: none;
    padding: 0 3px;
    font-size: 14px;
    font-weight: 400;
    height: 38px;
    width: ${ ({width}) => (width ? width : '101px')  };
    margin: ${ ({margin}) => (margin ? margin : '0')  };
    background-color: ${ ({color}) => (color ? color : vars.marvelRed)   };
    clip-path: polygon(11% 0, 100% 0, 100% 75%, 89% 100%, 25% 100%, 0 100%, 0 28%);
`;

export {Button};