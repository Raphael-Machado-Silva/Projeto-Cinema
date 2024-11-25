import React, { useState } from 'react';

const CategoryMenu = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState('');

  // Função para mudar a categoria e aplicar o estilo ativo
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId); // Atualiza a categoria ativa
    onCategorySelect(categoryId);   // Chama a função do componente pai para carregar filmes
  };

  return (
    <div className="category-menu">
      <button
        className={activeCategory === '' ? 'active' : ''}
        onClick={() => handleCategorySelect('')}
      >
        Todos os Filmes
      </button>
      <button
        className={activeCategory === 'top_rated' ? 'active' : ''}
        onClick={() => handleCategorySelect('top_rated')}
      >
        Top Rated
      </button>
    </div>
  );
};

export default CategoryMenu;
