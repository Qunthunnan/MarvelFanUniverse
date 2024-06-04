import { Component } from "react";
import Error from './../Error/Error';

export class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
        this.setState({ error: true });
    }

    render() {
        if(this.state.error) {
            return(
                <>
                    <Error></Error>
                    <p>A system error has occurred, please try again later</p>
                </>)
        }
        return this.props.children;
    }
}