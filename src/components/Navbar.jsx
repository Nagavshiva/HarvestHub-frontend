import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Avatar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // State for managing the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to handle opening the dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to handle logging out
  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="static" sx={{ background: "#EEF7FF" }}>
        <Toolbar>
          {/* Logo (left side) */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7p0-WVj_YQPGPlBHpXxNdeuiQkEK9tfu8Wjmg8CbaliWLTpJzYp0EQnAvLMvtvLxL4iQ&usqp=CAU"
              alt="harvest hub"
              style={{ width: '35px', backgroundColor: 'none' }}
            />
            <Link to="" style={{textDecoration:'none'}}>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'darkgreen' }}>
              Harvest Hub
            </span>
            </Link>
          </Typography>

          {user ? (
            // If user is logged in, show dropdown with profile picture
            <div>
              <Avatar
                alt="Profile Picture"
                src={user.profilePicture} // Assuming you have a profile picture URL in your user object
                sx={{ cursor: 'pointer' }}
                onClick={handleMenuOpen}
              />
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  <Link to='../signIn'>

                  Logout
                  </Link>
                  
                  </MenuItem>
              </Menu>
            </div>
          ) : (
            // If user is not logged in, show login and register buttons
            <>
              <Link to="signIn">
                <Button variant="contained" color="success">
                  Login
                </Button>
              </Link>
              <Link to="signUp">
                <Button variant="contained" color="success" sx={{ marginLeft: 2 }}>
                  Register
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
