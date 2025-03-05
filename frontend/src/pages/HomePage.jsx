import Home from '../components/HomeComponent/HomeComponent.jsx';
import NavBar from '../components/NavBar.jsx';

const HomePage = () => {
  return (
    <div className='h-100'>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Home />
      </div>
    </div>
  )
};

export default HomePage;