import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"/*pegar o valor da url*/
import MovieCard from "../components/MovieCard"
import './MoviesGrid.css'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {

  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState([])
  const query = searchParams.get("q")


  const getSearchedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovies(data.results)
  }

  useEffect(()=>{ // carregar filmes quando a pag for carregada
    // montando a URL para fzr isso

    const searchWhithQueryURL = `${searchURL}?api_key=${apiKey}&query=${query}&language=pt-BR`
    
    getSearchedMovies(searchWhithQueryURL) // enviando a URL para função que pega os filmes

  }, [query])


  return (
    <div className="container">
      <h2 className="title">Resultados para: 
        <span className="query-text"> {query}</span>
      </h2>

      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && movies.map((movie) => <MovieCard movie={movie} key={movie.id}></MovieCard>)}
      </div>
    </div>
  )
}

export default Search
