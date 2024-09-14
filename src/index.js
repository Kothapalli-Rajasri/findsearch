import React from 'react';
import ReactDOM from 'react-dom/client';  
import SearchBox from './search';         

const rootElement = document.getElementById('root');
const rootRef = ReactDOM.createRoot(rootElement);  
rootRef.render(<SearchBox />);
