import React from 'react';

const CategoryMenu = ({ onCategorySelect }) => {
  const categories = [
    { id: 28, name: 'Ação' },
    { id: 12, name: 'Aventura' },
    { id: 16, name: 'Animação' },
    { id: 35, name: 'Comédia' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Família' },
    { id: 14, name: 'Fantasia' },
    { id: 36, name: 'História' },
    { id: 27, name: 'Terror' },
    { id: 10402, name: 'Música' },
    { id: 9648, name: 'Mistério' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Ficção Científica' },
    { id: 10770, name: 'Filme para TV' },
    { id: 53, name: 'Suspense' },
    { id: 10752, name: 'Guerra' },
    { id: 37, name: 'Faroeste' },
    { id: 'top_rated', name: 'Top Rated' } // Adicionando "Top Rated"
  ];

  return (
    <div className="category-menu">
      <button onClick={() => onCategorySelect(null)}>Todos os Filmes</button>
      {categories.map((category) => (
        <button key={category.id} onClick={() => onCategorySelect(category.id)}>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
