import { useState } from "react";
import { H1 } from "../components/style/H1";
import { Container } from "../components/style/Container";
import { Directory } from "../components/Directory/Directory"
import { Header } from "../components/Directory/stylesDirectory"
import { Outlet, Link } from "react-router-dom";

export default function HeaderPage () {
    const [directories] = useState([ {
        directoryName: 'Characters',
        directoryLink: '/',
    }, 
    {
        directoryName: 'Comics',
        directoryLink: '/comics'
    } ]);

    return (
        <>
            <Container>
                <Header>
                    <H1><Link to="/"><span>Marvel</span> Fan Universe</Link></H1>
                    <Directory list={ directories }/>
                </Header>
            </Container>
            <Outlet/>
        </>
    )
}