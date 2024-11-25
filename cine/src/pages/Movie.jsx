import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import './Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // Armazena a chave do trailer

  // Função para obter as informações do filme
  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setMovie(data);
  };

  // Função para obter o trailer
  const getTrailer = async (movieId) => {
    const res = await fetch(`${moviesURL}${movieId}/videos?api_key=${apiKey}&language=pt-BR`);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      setTrailerKey(data.results[0].key); // Pega o trailer
    }
  };

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?api_key=${apiKey}&language=pt-BR`;
    getMovie(movieURL); // Carrega as informações do filme
    getTrailer(id); // Carrega o trailer
  }, [id]);

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="movie-page">
      {movie && (
        <>
          {/* Título do filme e ano ao lado */}
          <div className="movie-header">
            <h1>{movie.title}</h1> {/* Título do filme */}
            <p className="release-year">{new Date(movie.release_date).getFullYear()}</p> {/* Ano de lançamento */}
          </div>

          {/* Exibe o trailer como conteúdo principal */}
          {trailerKey && (
            <div className="movie-trailer">
              <h2 className="trailer-title">Trailer</h2> {/* Centraliza o título "Trailer" */}
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Informações sobre o filme */}
          <div className="movie-info">
            <div className="info">
              <h3>
                <BsWallet2 /> Orçamento:
              </h3>
              <p>{formatCurrency(movie.budget)}</p>
            </div>

            <div className="info">
              <h3>
                <BsGraphUp /> Receita Recolhida:
              </h3>
              <p>{formatCurrency(movie.revenue)}</p>
            </div>

            <div className="info">
              <h3>
                <BsHourglassSplit /> Duração:
              </h3>
              <p>{movie.runtime} min</p>
            </div>

            <div className="info description">
              <h3>
                <BsFillFileEarmarkTextFill /> Descrição:
              </h3>
              <p>{movie.overview}</p> {/* Descrição do filme */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
