import React, { Suspense, lazy } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

import { PageProvider } from "../../hooks/usePagesContext";

import { AppContentWrapper } from "./stylesApp";
import { Loader } from "../Loader/Loader";

const ComicsListPage = lazy(() => import("../../pages/ComicsListPage"));
const ComicsBanerPage = lazy(() => import("../../pages/ComicsBanerPage"));
const HeaderPage = lazy(() => import("../../pages/HeaderPage"));
const MainPage = lazy(() => import("../../pages/MainPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const CharacterDetailed = lazy(() => import("../CharacterDetailed/CharacterDetailed"));
const ComicsDetailed = lazy(() => import("../ComicsDetailed/ComicsDetailed"));
const SingleEntityPage = lazy(() => import("../../pages/SinglePage"));
const ErrorPage = lazy(()=> import("../../pages/ErrorPage"))


const router = createBrowserRouter(createRoutesFromElements(
		<Route errorElement={ <AppContentWrapper><ErrorPage /></AppContentWrapper> } path="/" element= { <HeaderPage /> }>
			<Route index element={  <AppContentWrapper><MainPage /></AppContentWrapper>  } />
			<Route path="characters" element={ <AppContentWrapper><MainPage /></AppContentWrapper>  } />

			<Route path="comics" 
			element= { <AppContentWrapper><ComicsBanerPage/></AppContentWrapper> } >
				<Route index element= {<ComicsListPage /> } />
			</Route>

			<Route errorElement={ <AppContentWrapper><ErrorPage /></AppContentWrapper> } 
			path="comics/:id" 
			element= {<AppContentWrapper><ComicsBanerPage/></AppContentWrapper>  } > 
				<Route index element= { <SingleEntityPage  type={'comics'} Component={ ComicsDetailed }/> } />
			</Route>
			
			<Route errorElement={ <AppContentWrapper><ErrorPage /></AppContentWrapper> } path="characters/:id" element= { <AppContentWrapper><ComicsBanerPage/></AppContentWrapper> } >
				<Route index element= { <SingleEntityPage type={'character'} Component={ CharacterDetailed }/> } />
			</Route >

			<Route path="*" element= { <AppContentWrapper><NotFoundPage/></AppContentWrapper> }/>
		</Route>
));


export function App () {
	return (
		<PageProvider>
			<Suspense fallback={<Loader/>}>
				<RouterProvider router={router}/>
			</Suspense>
		</PageProvider>
	);
}