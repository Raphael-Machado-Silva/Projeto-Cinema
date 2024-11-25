import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
  // Verifica se é um filme ou uma série
  const isMovie = movie.title !== undefined;
  const title = isMovie ? movie.title : movie.name;  // Título (name para séries, title para filmes)
  const posterPath = movie.poster_path;
  const voteAverage = movie.vote_average;
  const overview = movie.overview;
  const id = movie.id;
  const linkType = isMovie ? "movie" : "tv";  // Define o tipo de link (movie ou tv)

  return (
    <div className="movie-card">
      <img src={imageUrl + posterPath} alt={title} />
      <div className="hover-info">
        <h3>{title}</h3>
        <p className="rating">
          <FaStar /> {voteAverage}
        </p>
        <p className="description">
          {overview
            ? overview.length > 150
              ? overview.substring(0, 150) + "..."
              : overview
            : "Descrição indisponível."}
        </p>
        {showLink && <Link to={`/${linkType}/${id}`}>Detalhes</Link>}
      </div>
    </div>
  );
};

export default MovieCard;
