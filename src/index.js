import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage";

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import './index.css';

import { AppWrapper, App } from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router >
		<App />
	</Router>
);