import { Routes, Route } from "react-router-dom";
import NotFound from './NotFound.jsx';
import Login from './LoginPage.jsx';


const Home = () => <div>Главная Страница</div>

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
};

export default AppRouter;