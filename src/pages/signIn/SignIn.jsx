import "./signIn.css"; 
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App'; 
import { Link } from "react-router-dom";

function SignIn() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate(); 
  const { handleLogin } = useContext(AuthContext); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 

    const { username, password } = formData; 

    if (!username || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
    }

    try {
      const response = await fetch(`https://minigoodreads-api.onrender.com/users?username=${encodeURIComponent(username)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const usersFound = await response.json();

      if (usersFound.length > 0) {
        const user = usersFound[0]; 
        if (user.password === password) {
          handleLogin(user);
          navigate("/myBooks");
        } else {
          setError("Invalid email or password.");
        }
      } else {
        setError("Invalid email or password.");
      }

    } catch (err) {
      console.error("Login error:", err); 
      setError("An error occurred during login. Please try again."); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="signinForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
          placeholder="Enter your username"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter your password"
          required 
          autoComplete="current-password" 
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="signup-prompt">
        Don't have an account? <Link to="/signup">Sign Up</Link> 
      </p>
      </form>
      
    </div>
  );
}

export default SignIn;