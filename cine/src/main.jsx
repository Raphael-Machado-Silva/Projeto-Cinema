import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import App from './App.jsx'
import Movie from './pages/Movie.jsx'
import Search from './pages/Search.jsx'
import Home from './pages/Home.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App></App>}>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="movie/:id" element={<Movie></Movie>}></Route>
            <Route path="search" element={<Search></Search>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
