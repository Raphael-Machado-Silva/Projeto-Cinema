import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Para pegar o valor da URL
import MovieCard from "../components/MovieCard";
import './MoviesGrid.css';

const searchMovieURL = import.meta.env.VITE_SEARCH; // URL para filmes
const searchSeriesURL = "https://api.themoviedb.org/3/search/tv"; // URL para séries (adicione ao .env se preferir)
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q"); // Query de busca
  const isMovies = searchParams.get("isMovies") === "true"; // Estado recebido via URL

  // Função para buscar filmes ou séries
  const getSearchedContent = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Erro ao buscar conteúdo");
      }
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Alterna entre as URLs para filmes ou séries
    const searchWithQueryURL = `${isMovies ? searchMovieURL : searchSeriesURL}?api_key=${apiKey}&query=${query}&language=pt-BR`;
    getSearchedContent(searchWithQueryURL);
  }, [query, isMovies]); // Atualiza sempre que a query ou o estado de "isMovies" mudar

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </div>
    </div>
  );
};

export default Search;
