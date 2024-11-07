import { useState, useEffect } from "react"
import MovieCard from '../components/MovieCard'
import './MoviesGrid.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {
  const [topMovies, setTopMovies] = useState([])

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setTopMovies(data.results)
  }

  useEffect(()=>{ // carregar filmes quando a pag for carregada
    // montando a URL para fzr isso

    const topRatedUrl = `${moviesURL}top_rated?api_key=${apiKey}&language=pt-BR`
    console.log(apiKey)
    getTopRatedMovies(topRatedUrl) // enviando a URL para função que pega os filmes

  }, [])

  return (
    <div className="container">
      <h2 className="title">Melhores filmes</h2>
      <div className="movie-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
      {topMovies.length > 0 && topMovies.map((movie) => <MovieCard movie={movie} key={movie.id}></MovieCard>)}
      </div>
    </div>
  )
}

export default Home
