/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile({ user }) {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user-session");
    navigate("/");
  };

  return (
    <Box
      sx={{
        background: "#eee",
        width: "25vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: "156px", height: "156px" }}
      />
      <Typography
        variant="h4"
        sx={{ textTransform: "uppercase", color: "primary.dark" }}
      >
        {user?.name}
      </Typography>
      <Typography variant="subtitle1">Mern Stack Developer</Typography>
      <Typography variant="body1">{user?.email}</Typography>
      <Button onClick={logOut} variant="contained" sx={{ mt: 2 }}>
        Logout
      </Button>
    </Box>
  );
}

export default Profile;
