import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ComicsListPage } from "../../pages/ComicsListPage";
import { ComicsBanerPage } from "../../pages/ComicsBanerPage";
import { HeaderPage } from "../../pages/HeaderPage";
import { MainPage } from "../../pages/MainPage";
import { ErrorPage } from "../../pages/ErrorPage";
import { ComicsDetailedPage } from "../../pages/ComicsDetailedPage";
import { CharacterDetailedPage } from "../../pages/CharacterDetailedPage";
import { NotFoundPage } from "../../pages/NotFoundPage";

export function App () {
	return (
		<Router errorElement={<ErrorPage/>}>
			<Routes>
				<Route path="/" element= { <HeaderPage /> }>
					<Route index element={ <MainPage /> } />
					<Route path="characters" element={ <MainPage /> } />

					<Route path="comics" element= { <ComicsBanerPage/> } >
						<Route index element= { <ComicsListPage /> } />
					</Route>
					<Route path="comics/:comics" element= { <ComicsBanerPage/> } > 
						<Route index element= { <ComicsDetailedPage/> } />
					</Route>
					<Route path="characters/:character" element= { <ComicsBanerPage/> } >
						<Route index element= { <CharacterDetailedPage/> } />
					</Route>

					<Route path="*" element= { <NotFoundPage/> }/>
				</Route>

			</Routes>
		</Router>
	);
}