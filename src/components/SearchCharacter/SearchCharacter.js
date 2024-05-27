import { Component } from "react";
import styled from "styled-components";
import { Aside } from "../style/Aside";
import { Button } from "../style/Button";
import { vars } from "../style/Vars";

export class SearchCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            message: '',
            result: null
        }
    }
    render() {
        const {name, message, result} = this.state;

        const SearchWriper = styled(Aside)`
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
        `;

        const InputWrapper = styled.div`
            display: flex;
            justify-content: space-between;
            column-gap: 24px;
        `;

        const Label = styled.label`
            display: ${({result}) => ( (result === true || result === false) ? 'block' : 'none' )};
            font-size: 18px;
            font-weight: 700;
            color: ${({result}) => ( result  ? '#03710E' : vars.marvelRed )};
        `;

        return (
            <SearchWriper>
                <h2>Or find a character by name:</h2>
                <form action="#">
                    <InputWrapper>
                        <input onChange={()=>{}} placeholder="Enter name" value={name} type="text" name="characterName" id="characterName" />
                        <Button type="submit">FIND</Button>
                    </InputWrapper>
                    <Label result={ result } htmlFor="characterName">{message}</Label>
                </form>
            </SearchWriper>
        );
    }
}