import { Component } from "react";
import styled from "styled-components";
import { Aside } from "../style/Aside";
import { Button } from "../style/Button";
import { CloseBtn  } from "../style/CloseBtn";
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
        const { onSwichSearch, mobileSearchShowed } = this.props;
        const {name, message, result} = this.state;

        console.log('rendered search', mobileSearchShowed);

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
            display: ${({result}) => ( (result === true || result === false) ? 'block' : 'none' )};
            font-size: 18px;
            font-weight: 700;
            color: ${({result}) => ( result  ? '#03710E' : vars.marvelRed )};
        `;

        return (
            <SearchWriper $mobileActive={ mobileSearchShowed }>
                <CloseBtn onClick={ onSwichSearch }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </CloseBtn>
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