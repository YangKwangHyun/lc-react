import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import AppClass from "./components/AppClass";
import {createRoot} from 'react-dom/client';
import Root from "./components/Root";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Root />
        {/*<AppClass/>*/}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
