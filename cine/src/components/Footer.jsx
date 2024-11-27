import './Footer.css'; // Se você quiser adicionar um estilo personalizado
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 PopcornPlay. Todos os direitos reservados ©</p>
        <p>Desenvolvido por Raphael Machado </p>
        <div className='footer_icons' style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a href="https://github.com/Raphael-Machado-Silva" target='_blank' rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/raphael-machado-silva-74457a291/" target='_blank' rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
