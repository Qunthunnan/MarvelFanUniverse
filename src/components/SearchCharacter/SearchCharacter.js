import { Component } from "react";
import { Button } from "../style/Button";
import { CloseBtn  } from "../style/CloseBtn";
import {SearchWriper, InputWrapper, Label} from "./stylesSearchCharacter";

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