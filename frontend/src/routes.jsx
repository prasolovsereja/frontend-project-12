import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound.jsx";
import Login from "./LoginPage.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";

const Home = () => <div>Главная Страница</div>;

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
