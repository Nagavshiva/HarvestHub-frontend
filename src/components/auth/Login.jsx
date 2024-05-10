import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { loginUser } from "../../redux/auth/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(formData));
      // Check for successful login in the response
      if (response.payload && response.payload.user) {
        navigate("../products", { relative: "path" });
        console.log("Login successful");
      } else {
        console.error("Login failed:", response.error || response.data.error); // Access the error message from the response
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        borderRadius: 5,
        bgcolor: "background.paper",
        p: 4,
        marginTop: "1rem",
      }}
    >
      <div>
        <Typography component="h1" variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Email Address */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ bgcolor: "background.default" }}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                sx={{ bgcolor: "background.default" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {formData.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Submit Button with primary color and loading indication */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ marginTop: "1rem" }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Grid>

            {/* Error message */}
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}
          </Grid>
        </form>

        {/* Don't have an account link */}
        <Typography variant="body2" align="center" sx={{ display:'flex',justifyContent:'flex-end',marginTop:'1rem' }}>
          Dont have an account? <Link to="../signUp">Register</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Login;
