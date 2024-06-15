import React from "react";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ComicsListPage } from "../../pages/ComicsListPage";
import { ComicsBanerPage } from "../../pages/ComicsBanerPage";
import { HeaderPage } from "../../pages/Header";
import { MainPage } from "../../pages/MainPage";
import { CharacterDetailedPage } from "../../pages/CharacterDetailedPage";
import { ComicsDetailedPage } from "../../pages/ComicsDetailedPage";


export function App () {
	return (
		<Router>
			<Route path="/">
				<HeaderPage/>
			</Route>
			<Route path={["/characters/:character", "/comics"]}>
				<ComicsBanerPage/>
			</Route>
			<Switch>
				<Route exact path={["/", "/characters"]}>
					<MainPage/>
				</Route>
				<Route exact path="/characters/:character">
					<CharacterDetailedPage/>
				</Route>
				<Route exact path="/comics">
					<ComicsListPage/>
				</Route>
				<Route exact path="/comics/:comics">
					<ComicsDetailedPage/>
				</Route>
			</Switch>
		</Router>
	);
}