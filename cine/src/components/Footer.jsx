// src/components/Footer.jsx
import './Footer.css'; // Se você quiser adicionar um estilo personalizado
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 PopcornPlay. Todos os direitos reservados ©</p>
        <p>Desenvolvido por Raphael Machado </p>
        <a href="https://github.com/Raphael-Machado-Silva" target='_blank'><FaGithub style={{ marginLeft: '8px' }} /></a>
      </div>
    </footer>
  );
};

export default Footer;
