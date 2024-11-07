import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='App'>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
