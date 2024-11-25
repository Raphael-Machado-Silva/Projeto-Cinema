import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import './TVShow.css'; // Importando o CSS

const TVShow = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // Armazena a chave do trailer
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTVShow = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=de5dba7ba60e841f3213d70cc2583b55&language=pt-BR`
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar série: ${response.status}`);
        }

        const data = await response.json();
        setTvShow(data);

        // Obter o trailer da série
        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=de5dba7ba60e841f3213d70cc2583b55&language=pt-BR`
        );

        const trailerData = await trailerResponse.json();
        if (trailerData.results && trailerData.results.length > 0) {
          setTrailerKey(trailerData.results[0].key); // Pega o trailer
        }

      } catch (err) {
        console.error('Erro ao buscar série: ', err);
        setError(err.message);
      }
    };

    getTVShow();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!tvShow) {
    return <div>Carregando...</div>;
  }

  const formatCurrency = (value) => {
    if (value !== undefined && value !== null) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }
    return "Valor não disponível";
  };

  return (
    <div className="movie-page"> {/* Usando o estilo da página de filmes */}
      {/* Cabeçalho da série */}
      <div className="movie-header">
        <h1>{tvShow.name}</h1>
        <p className="release-year">{new Date(tvShow.first_air_date).getFullYear()}</p> {/* Ano de estreia */}
      </div>

      {/* Trailer da série */}
      {trailerKey && (
        <div className="movie-trailer">
          <h2 className="trailer-title">Trailer</h2>
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

      {/* Informações sobre a série */}
      <div className="movie-info">
        <div className="info">
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatCurrency(tvShow.budget)}</p>
        </div>

        <div className="info">
          <h3>
            <BsGraphUp /> Receita Recolhida:
          </h3>
          <p>{formatCurrency(tvShow.revenue)}</p>
        </div>

        <div className="info">
          <h3>
            <BsHourglassSplit /> Duração por Episódio:
          </h3>
          <p>{tvShow.episode_run_time[0]} min</p>
        </div>

        <div className="info description">
          <h3>
            <BsFillFileEarmarkTextFill /> Descrição:
          </h3>
          <p>{tvShow.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default TVShow;
