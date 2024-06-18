import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import './index.css';

import { App } from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
		<App />
);

