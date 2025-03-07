import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PrivateRoute from "./utils/PrivateRoute.jsx";


const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
