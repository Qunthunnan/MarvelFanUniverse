import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ComicsListPage } from "../../pages/ComicsListPage";
import { ComicsBanerPage } from "../../pages/ComicsBanerPage";
import { HeaderPage } from "../../pages/HeaderPage";
import { MainPage } from "../../pages/MainPage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { CharacterDetailed } from "../CharacterDetailed/CharacterDetailed";
import { ComicsDetailed } from "../ComicsDetailed/ComicsDetailed";
import { SingleEntityPage } from "../../pages/SinglePage";
import { AppContentWrapper } from "./stylesApp";
import { ListProvider } from "../../hooks/useList";


export function App () {
	const location = useLocation();

	return (
			<ListProvider >
				<Routes location={ location }>
						<Route path="/" element= { <HeaderPage /> }>
									<Route index element={  <AppContentWrapper><MainPage /></AppContentWrapper>  } />
									<Route path="characters" element={ <AppContentWrapper><MainPage /></AppContentWrapper>  } />

									<Route path="comics" element= { <AppContentWrapper><ComicsBanerPage/></AppContentWrapper> } >
										<Route index element= { <ComicsListPage /> } />
									</Route>

									<Route path="comics/:id" element= {<AppContentWrapper><ComicsBanerPage/></AppContentWrapper>  } > 
										<Route index element= { <SingleEntityPage  type={'comics'} Component={ ComicsDetailed }/> } />
									</Route>
									
									<Route path="characters/:id" element= { <AppContentWrapper><ComicsBanerPage/></AppContentWrapper> } >
										<Route index element= { <SingleEntityPage type={'character'} Component={ CharacterDetailed }/> } />
									</Route>

									<Route path="*" element= { <NotFoundPage/> }/>
						</Route>
				</Routes>
			</ListProvider>

	);
}