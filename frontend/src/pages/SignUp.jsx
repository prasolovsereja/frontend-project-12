import NavBar from '../components/NavBar.jsx';
import SignUp from '../components/SignUp/SignUpComponent.jsx';

const SignUpPage = () => (
  <div className="h-100">
    <div className="d-flex flex-column h-100">
      <NavBar />
      <SignUp />
    </div>
  </div>
);

export default SignUpPage;
