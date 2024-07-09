/* eslint-disable react/prop-types */
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import DeleteIcon from "@mui/icons-material/Delete";

function SinderMsg({
  msg,
  sender,
  replyMsg,
  handleDeleteMsg,
  _id,
  setReplyMsg,
  message,
  session,
}) {
  return (
    <List>
      <ListItem className="" alignItems="flex-start">
        <Box sx={{ display: "flex", width: "80%" }}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <Paper
            sx={{
              width: "100%",
              p: 1.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText
              sx={{ m: 0 }}
              primary={sender.name}
              secondary={<Typography variant="body2">{msg}</Typography>}
            />
            <Box>
              <Typography variant="caption">12.20 PM</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <IconButton size="small" onClick={() => setReplyMsg(message)}>
                <ReplyAllIcon
                  className="cursor-pointer text-gray-400"
                  fontSize={"small"}
                />
              </IconButton>
              {sender._id === session._id && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteMsg(_id)}
                >
                  <DeleteIcon className="cursor-pointer " fontSize={"small"} />
                </IconButton>
              )}
            </Box>
            {replyMsg && (
              <ListItemText
                sx={{ bgcolor: "#eee", p: 1 }}
                primary={replyMsg.sender.name}
                secondary={
                  <Typography variant="caption">{replyMsg.msg}</Typography>
                }
              />
            )}
          </Paper>
        </Box>
      </ListItem>
    </List>
  );
}

export default SinderMsg;
