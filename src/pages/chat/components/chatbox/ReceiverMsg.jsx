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
import { orange } from "@mui/material/colors";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import DeleteIcon from "@mui/icons-material/Delete";

function ReceiverMsg({
  msg,
  sender,
  handleDeleteMsg,
  _id,
  setReplyMsg,
  replyMsg,
  message,
  session,
}) {
  return (
    <List>
      <ListItem sx={{ flexDirection: "row-reverse" }}>
        <Box
          sx={{ display: "flex", width: "80%", flexDirection: "row-reverse" }}
        >
          <ListItemAvatar
            sx={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <Paper
            sx={{
              width: "100%",
              p: 1.5,
              bgcolor: orange[800],
              color: "primary.contrastText",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListItemText
              sx={{ m: 0 }}
              primary={sender.name}
              secondary={<Typography variant="caption">{msg}</Typography>}
            />
            <Box
              mt={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="caption">12.20 PM</Typography>

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
                    className="cursor-pointer text-white"
                    fontSize={"small"}
                  />
                </IconButton>
                {sender._id === session._id && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteMsg(_id)}
                  >
                    <DeleteIcon
                      className="cursor-pointer "
                      fontSize={"small"}
                    />
                  </IconButton>
                )}
              </Box>
            </Box>
            {/* Replay */}
            {replyMsg && (
              <ListItemText
                sx={{ bgcolor: orange[600], p: 1 }}
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

export default ReceiverMsg;
