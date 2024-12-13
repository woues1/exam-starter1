import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Signup = () => {
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const name = useField("text");  
  const email = useField("email");
  const password = useField("password");
  const address = useField("text");
  const phoneNumber = useField("text");
  const profilePicture = useField("text");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({
        email: email.value,
        password: password.value,
        name: name.value,
        address: address.value,
        phoneNumber: phoneNumber.value,
        profilePicture: profilePicture.value,
      });
      if (!error) {
        console.log("success");
        authenticate();
        navigate("/");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error); 
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>Address:</label>
        <input {...address} />
        <label>Phone number:</label>
        <input {...phoneNumber} />
        <label>Profile picture:</label>
        <input {...profilePicture} />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
