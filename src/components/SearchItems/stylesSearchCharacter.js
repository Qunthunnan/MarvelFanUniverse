import styled from "styled-components";
import { Aside } from "../style/Aside";
import { vars } from "../style/Vars";

const SearchWriper = styled(Aside)`
@media (min-width: 320px) {
    display: ${ ({$mobileActive}) => ( $mobileActive ? 'block' : 'none')};
    position: relative;
    order: 1;
    h2 {
        font-size: 18px;
        font-weight: 700;
        margin: 0 0 16px 0;
    }
    input {
        border: none;
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        padding: 0px 10px;
        height: 38px;
        box-shadow: 0px 4px 5px 1px rgba(0, 0, 0, 0.1);
        &::placeholder {
            color: #00000080;
        }
    }
}

@media (min-width: 768px) {
    display: block;
    order: 2;
}
`;

const InputWrapper = styled.div`
display: flex;
justify-content: space-between;
column-gap: 24px;
`;

const Label = styled.label`
margin: 10px 0 0 0;
font-size: 18px;
font-weight: 700;
color: ${vars.marvelRed};
`;

export {SearchWriper, InputWrapper, Label}; 