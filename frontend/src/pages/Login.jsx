import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");

  const { login, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email: email.value, password: password.value });
      
      if (!error) {
        console.log("success");
        authenticate();
        navigate("/");
      }else{
        console.log("error");
      }

    } catch (error) {
      console.log(error);
    };
  }


  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
      <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button>Sign up</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Login;
