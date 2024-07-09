/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
// Components
import ReplayMessage from "./ReplayMessage";

function Footer({ handleSendMsg, replyMsg, setReplyMsg }) {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg) {
      handleSendMsg(msg);
    }
    setMsg("");
  };

  const handleChangeChatType = (e) => {
    setMsg(e.target.value);
  };

  return (
    <Box sx={{ p: 1, display: "flex", position: "relative" }}>
      {replyMsg && (
        <ReplayMessage replyMsg={replyMsg} setReplyMsg={setReplyMsg} />
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button sx={{ minWidth: "auto", mr: 1 }}>
          <MoreVertIcon />
        </Button>
        <Button sx={{ minWidth: "auto", mr: 1 }}>
          <InsertEmoticonIcon />
        </Button>
      </Box>

      <Box
        sx={{ display: "flex", flex: 1 }}
        component={`form`}
        onSubmit={handleSubmit}
      >
        <TextField
          placeholder="Type Your message or hit"
          size="small"
          sx={{
            "& .MuiInputBase-input": {
              borderRadius: 0,
              borderRight: 0,
            },
          }}
          fullWidth
          onChange={handleChangeChatType}
          value={msg}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{
            borderRadius: 0,
            minWidth: "auto",
            height: "100",
            marginLeft: "3px",
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default Footer;
