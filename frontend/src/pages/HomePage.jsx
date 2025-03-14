import { useSelector } from 'react-redux';
import Home from '../components/HomeComponent/HomeComponent.jsx';
import NavBar from '../components/NavBar.jsx';
import Modal from '../components/Modal/Modal.jsx';

const HomePage = () => {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <>
    <div className='h-100'>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Home />
      </div>
    </div>
    {isOpen && <Modal />}
    </>
  )
};

export default HomePage;