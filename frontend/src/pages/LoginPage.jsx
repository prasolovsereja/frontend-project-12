import Login from '../components/LoginComponent.jsx';
import NavBar from '../components/NavBar.jsx';

const LoginPage = () => {
  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
