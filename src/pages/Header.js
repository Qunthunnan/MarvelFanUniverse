import { useState } from "react";
import { H1 } from "../components/style/H1";
import { Container } from "../components/style/Container";
import { Directory } from "../components/Directory/Directory"
import { Header } from "../components/Directory/stylesDirectory"

export const HeaderPage = () => {
    const [directories, setDirectories] = useState([ {
        directoryName: 'Characters',
        directoryLink: '/',
    }, 
    {
        directoryName: 'Comics',
        directoryLink: '/comics'
    } ]);

    return (
        <Container>
            <Header>
                <H1><span>Marvel</span> Fan Universe</H1>
                <Directory list={ directories }/>
            </Header>
        </Container>
    )
}