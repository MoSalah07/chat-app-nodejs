/* eslint-disable react/prop-types */
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import axios from "axios";

export default function ChatList({
  currentUser,
  onlineUsers,
  roomData,
  setRoomData,
  setAllMsg,
}) {
  const handleChatRoom = async (user) => {
    setRoomData({ ...roomData, room: "test", receiver: user });
    try {
      const {
        data: { data },
      } = await axios.get(`http://localhost:5000/message/${user._id}`);
      setAllMsg(data);
    } catch (err) {
      return err;
    }
  };

  return (
    <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
      {onlineUsers &&
        Array.isArray(onlineUsers) &&
        onlineUsers !== 0 &&
        onlineUsers
          .filter((item) => item._id !== currentUser._id)
          .map((online) => (
            <Box key={online._id}>
              <ListItem
                className=""
                alignItems="flex-start"
                onClick={() => handleChatRoom(online)}
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={online.name}
                  sx={{ textTransform: "capitalize" }}
                  secondary={
                    <Typography variant="caption">{online.email}</Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </Box>
          ))}
    </List>
  );
}
