
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const redirectParams = new URLSearchParams(window.location.search);
const redirectedPath = redirectParams.get('p');
if (redirectedPath) {
  const nextParams = new URLSearchParams(window.location.search);
  nextParams.delete('p');
  const query = nextParams.toString();
  const nextUrl = `${redirectedPath}${query ? `?${query}` : ''}${window.location.hash}`;
  window.history.replaceState(null, '', nextUrl);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
