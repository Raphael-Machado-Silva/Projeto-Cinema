import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Para pegar o valor da URL
import MovieCard from "../components/MovieCard";
import { FaFilm, FaTv } from 'react-icons/fa'; // Ícones para os botões
import './MoviesGrid.css';

const searchMovieURL = import.meta.env.VITE_SEARCH;
const searchSeriesURL = "https://api.themoviedb.org/3/search/tv"; // Endpoint correto
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isMovies, setIsMovies] = useState(true); // Estado para alternar entre filmes e séries
  const query = searchParams.get("q");

  const getSearchedItems = async () => {
    const url = isMovies
      ? `${searchMovieURL}?api_key=${apiKey}&query=${query}&language=pt-BR`
      : `${searchSeriesURL}?api_key=${apiKey}&query=${query}&language=pt-BR`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      // Verifica se data.results existe antes de aplicar .filter
      if (data.results) {
        const validItems = data.results.filter(item => item.poster_path !== null);
        setMovies(validItems);
      } else {
        setMovies([]); // Se results não existir, zera os resultados
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setMovies([]); // Em caso de erro, zera os resultados
    }
  };

  useEffect(() => {
    getSearchedItems(); // Busca dados sempre que a query ou isMovies muda
  }, [query, isMovies]);

  return (
    <div className="container">
      <h2 className="title">Resultados para: 
        <span className="query-text"> {query}</span>
      </h2>

      {/* Botões para alternar entre Filmes e Séries */}
      <div className="toggle-buttons">
        <button 
          className={`toggle-button ${isMovies ? 'active' : ''}`}
          onClick={() => setIsMovies(true)}
        >
          <FaFilm style={{ marginRight: '8px' }} /> Filmes
        </button>
        <button 
          className={`toggle-button ${!isMovies ? 'active' : ''}`}
          onClick={() => setIsMovies(false)}
        >
          <FaTv style={{ marginRight: '8px' }} /> Séries
        </button>
      </div>

      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
      </div>
    </div>
  );
};

export default Search;
