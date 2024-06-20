import styled from "styled-components";
import { vars } from "../style/Vars";

const ComicsItem = styled.li`
    @media (min-width: 320px) {
        display: block;
        width: 140px;
        a {
            text-decoration: none;
        }
        img {
            width: 140px;
            height: 215px;
            object-fit: cover;
            display: block;
            box-shadow: 0px 3px 15px 5px rgba(0, 0, 0, 0.3);
        }
        h3 {
            margin: 10px 0 0 0;
            font-size: 14px;
            font-weight: 700;
            color: #000;
            text-decoration: none;
        }
        span {
            margin: 5px 0 0 0;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            color: ${ vars.marvelGray }
        }
    }

    @media (min-width: 576px) {
        width: 225px;
        img {
            height: 346px;
            width: 225px;
        }
    }
`;

export { ComicsItem };