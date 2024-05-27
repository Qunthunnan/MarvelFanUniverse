import { Button } from "./Button";
import styled from "styled-components";

const WideButton = styled(Button)`
    clip-path: polygon(6% 0, 100% 0, 100% 75%, 94% 100%, 25% 100%, 0 100%, 0 28%);
    width: 170px;
`;

export {WideButton};