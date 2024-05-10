import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { registerUser } from "../../redux/auth/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
    location: "",
    showPassword: false,
  });

  // State variables for error messages
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error messages when the user starts typing
    if (name === "username") {
      setUsernameError("");
    } else if (name === "password") {
      setPasswordError("");
    }
  };

  const handleShowPassword = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Check if username length is greater than 4
    if (username.length <4) {
      setUsernameError("Username must be longer than 4 characters.");
      return;
    } else {
      setUsernameError("");
    }

    // Check if password length is greater than 8
    if (password.length < 8) {
      setPasswordError("Password must be longer than 8 characters.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await dispatch(registerUser(formData));
      // Check for successful registration in the response 
      if (response.payload && response.payload.user) {
        navigate("../products");
      } else {
        console.error(
          "Registration failed:",
          response.error || response.data.error
        );
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ borderRadius: 5, bgcolor: "background.paper", p: 4, marginTop: "1rem" }}
    >
      <div>
        <Typography component="h1" variant="h5" align="center" sx={{marginBottom: "1rem"}}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Username */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!usernameError} // Show error if it exists
                helperText={usernameError} // Display the error message
              />
            </Grid>

            {/* Email Address */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={error === "Email already exists"}
                helperText={error === "Email already exists" ? "Email already exists" : null}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                name="password"
                type={formData.showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!passwordError} // Show error if it exists
                helperText={passwordError} // Display the error message
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* User Type  */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  variant="outlined"
                  required
                  label="User Type"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <MenuItem value="consumer">Consumer</MenuItem>
                  <MenuItem value="artisan">Artisan</MenuItem>
                  <MenuItem value="farmer">Farmer</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Location  */}
            {formData.userType === "artisan" || formData.userType === "farmer" ? (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>
            ) : null}

            {/* Submit Button with primary color and loading indication */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography variant="body2" align="center" sx={{display:'flex',justifyContent:'flex-end',marginTop:'1rem'}}>
          Already have an account? <Link to="../signIn">Login</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Register;
