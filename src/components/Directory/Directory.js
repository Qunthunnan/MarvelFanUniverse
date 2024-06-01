import { Component, Fragment } from "react";
import { DirectorySpan } from "./stylesDirectory";

export class Directory extends Component {
    render() {
        const { active, list } = this.props; 

        const directories = list.map( (item, i) => {
        const slash = list[i + 1] ? <DirectorySpan key={i + 0.5}>/</DirectorySpan> : null;
        return (
            <Fragment key={i + 0.1}>
                <DirectorySpan href="#" key={i} $active={ item === active ? true : null }>{item}</DirectorySpan>
                {slash}
            </Fragment>
        ) });



        return (
             <nav>{directories}</nav>
        );
    }
}