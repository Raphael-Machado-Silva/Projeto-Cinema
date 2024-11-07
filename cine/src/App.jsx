import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='App'>
      <Navbar></Navbar>
      <h2>CineStream</h2>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
