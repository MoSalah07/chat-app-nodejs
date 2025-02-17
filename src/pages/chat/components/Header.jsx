/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red, orange } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Typography } from "@mui/material";

function Header({ user }) {
  return (
    <header className="bg-red-500">
      <Card
        sx={{
          maxWidth: "100%",
          bgcolor: orange["500"],
          color: "primary.contrastText",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={user?.name}
          subheader={<Typography variant="caption">{user?.email}</Typography>}
        />
      </Card>
    </header>
  );
}

export default Header;
