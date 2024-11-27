import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx';
import Movie from './pages/Movie.jsx'; // Componente de filme
import TVShow from './pages/TVShow.jsx'; // Componente de série
import Search from './pages/Search.jsx';
import Home from './pages/Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<Movie />} /> {/* Rota para filmes */}
          <Route path="tv/:id" element={<TVShow />} /> {/* Rota para séries */}
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
