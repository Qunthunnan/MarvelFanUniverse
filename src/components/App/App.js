import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ComicsListPage } from "../../pages/ComicsListPage";
import { ComicsBanerPage } from "../../pages/ComicsBanerPage";
import { HeaderPage } from "../../pages/HeaderPage";
import { MainPage } from "../../pages/MainPage";
import { ErrorPage } from "../../pages/ErrorPage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { CharacterDetailed } from "../CharacterDetailed/CharacterDetailed";
import { ComicsDetailed } from "../ComicsDetailed/ComicsDetailed";
import { SingleEntityPage } from "../../pages/SinglePage";

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
					<Route path="comics/:id" element= { <ComicsBanerPage/> } > 
						<Route index element= { <SingleEntityPage  type={'comics'} Component={ ComicsDetailed }/> } />
					</Route>
					<Route path="characters/:id" element= { <ComicsBanerPage/> } >
						<Route index element= { <SingleEntityPage type={'character'} Component={ CharacterDetailed }/> } />
					</Route>

					<Route path="*" element= { <NotFoundPage/> }/>
				</Route>
			</Routes>
		</Router>
		
	);
}