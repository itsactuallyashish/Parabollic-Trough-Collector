import logo from './logo.svg';
import './App.css';
import Mymap from './components/Mymap';
import 'leaflet/dist/leaflet.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App ">
      <Navbar/>
      <Mymap/>
      <Footer/>
    </div>
  );
}

export default App;
