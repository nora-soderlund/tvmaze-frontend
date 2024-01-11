import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './components/routes/IndexPage';
import ShowPage from './components/routes/shows/ShowPage';
import Page from './components/page/Page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Page>
        <Routes>
          <Route path="/" element={<IndexPage/>}/>

          <Route path="/shows/:showId" element={<ShowPage/>}/>
        </Routes>
      </Page>
    </BrowserRouter>
  </React.StrictMode>
);
