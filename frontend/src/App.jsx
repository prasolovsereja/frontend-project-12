
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routes';
import './App.css';

function App() {

  return (
    <>
      <AppRouter />
      <ToastContainer position='top-right' autoClose={5000} />
    </>
    
  );
};
export default App
