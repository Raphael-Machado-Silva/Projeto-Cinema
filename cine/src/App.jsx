import './App.css';
import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState('light');  // Estado para controlar o tema

  // Efeito para carregar o tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);  // Salva a preferência no localStorage
  };

  // Adiciona a classe correspondente ao tema no body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className='App'>
      <Navbar toggleTheme={toggleTheme} />  {/* Passa a função toggleTheme para o Navbar */}
      <Outlet />  {/* O Outlet vai renderizar os componentes das rotas */}
      <Footer></Footer>
    </div>
  );
}

export default App;
